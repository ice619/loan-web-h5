<template>
  <div class="border" style="width: 100%">
    <el-form :inline="true" :model="bannerForm" :rules="rules" ref="bannerForm" label-width="100px"
             class="demo-form-inline">
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <span>配置受众</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="应用名称">
            <el-select v-model="bannerForm.appName" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生效终端">
            <el-select v-model="bannerForm.terminal" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户标签">
            <el-select v-model="bannerForm.userTags" clearable multiple placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生效版本">
            <el-select style="width: 110px;" v-model="bannerForm.versionLowerLimit" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions(`versions_${bannerForm.appName}`)" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
            <el-select style="width: 110px;" v-model="bannerForm.versionUpperLimit" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions(`versions_${bannerForm.appName}`)" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-radio-group v-model="bannerForm.status">
              <el-radio :label="true">有效</el-radio>
              <el-radio :label="false">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效时间" prop="startTime">
            <el-date-picker v-model="bannerForm.startTime" type="datetime" placeholder="选择开始时间"
                            value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime">
            <el-date-picker v-model="bannerForm.endTime" type="datetime" placeholder="选择开始时间"
                            value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <hr style="height:1px;border:none;border-top:1px solid #555555;" />
        </el-col>
      </el-row>
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <span style="margin-right: 10px">配置banner</span><el-button class="el-icon-plus" @click="addBannerDetailsTableRows" style="color: white;background-color: #009688;"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="所属页面" prop="position" required>
            <el-select v-model="bannerForm.position" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('bannerPositions')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="显示位置" prop="displayPosition" required>
            <el-select v-model="bannerForm.displayPosition" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('displayPositions')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-col :span="24">
          <el-table :data="bannerDetails" border style="width: 100%">
            <el-table-column prop="title" header-align="center" align="left" label="标题">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="activityCode" header-align="center" align="left" label="活动编号" min-width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.activityCode" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="activityUrl" header-align="center" align="left" label="活动链接">
              <template slot-scope="scope">
                <el-input v-model="scope.row.activityUrl" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="imageUrl" header-align="center" align="left" label="图片">
              <template slot-scope="scope">
                <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-change="handleFilesChange">
                  <el-popover placement="right" width="200" trigger="hover" :content="scope.row.imageUrl ? null : '图片未上传'">
                    <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar">
                    <el-button @click="orientateRowIndex(scope.$index)" slot="reference" :class="scope.row.imageUrl ? 'el-icon-edit' : 'el-icon-plus'">{{scope.row.imageUrl ? '更换图片' : '选择图片'}}</el-button>
                  </el-popover>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="25">
              <template slot-scope="scope">
                <i class="el-icon-sort drag-handler"></i>
                <i class="el-icon-delete drag-handler" @click="deleteRow(scope.$index, bannerDetails)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-col :span="40">
          <el-form-item>
            <el-button style="color: white;background-color: #009688;" @click="saveBanner">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import debounce from 'throttle-debounce/debounce'
import {clone} from '@/utils/common'
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      bannerForm: {
        appName: 6,
        terminal: '',
        userTags: [],
        versionUpperLimit: '',
        versionLowerLimit: '',
        position: '',
        displayPosition: '',
        startTime: null,
        endTime: null,
        status: true
      },
      bannerDetailDesc: {
        title: '标题',
        activityCode: '活动编号',
        activityUrl: '活动链接',
        imageUrl: '图片链接'
      },
      bannerDetail: {
        title: null,
        activityCode: null,
        activityUrl: null,
        imageUrl: null,
        sort: 0
      },
      bannerDetails: [],
      rules: {},
      actionUrl: `${process.env.API_ROOT}/management/upload-image-file`
    }
  },
  created () {
    this.initBanner()
  },
  methods: {
    addBannerDetailsTableRows () {
      this.bannerDetails.push(clone(this.bannerDetail))
    },
    handleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.bannerDetails[this.detailRowIndex].imageUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    saveBanner: debounce(300, function () {
      this.$refs['bannerForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认修改吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (!this.checkBanner()) {
          return
        }
        if (!this.checkBannerDetails()) {
          return
        }
        if (valid) {
          try {
            this.setBannerDetailsSort()
            this.bannerForm.bannerDetails = this.bannerDetails
            const res = await this.$http.post('/management/banner', this.bannerForm)
            if (res.code === '200') {
              this.$message.success('修改成功!')
              this.back()
            } else {
              this.$message.error(res.message)
            }
          } catch (err) {
            console.error(err)
          }
        }
      })
    }),
    initBanner () {
      this.$http.get(`/management/banner/${this.$route.params.bannerId}`).then(res => {
        if (res.code === '200') {
          this.bannerForm = this.copyToForm(res.data)
          this.bannerDetails = res.data.bannerDetailsDTOS
          this.setSort()
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    copyToForm (data) {
      let form = {
        appName: data.appName,
        terminal: data.terminal,
        versionUpperLimit: data.versionUpperLimit,
        versionLowerLimit: data.versionLowerLimit,
        position: data.position,
        displayPosition: data.displayPosition,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
        userTags: []
      }
      data.userTag.split(',').forEach(s => {
        form.userTags.push(parseInt(s))
      })
      return form
    },
    setSort () {
      let that = this
      this.$nextTick(() => {
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          onEnd: evt => {
            let targetList = clone(that.bannerDetails)
            let targetRow = targetList.splice(evt.oldIndex, 1)[0]
            targetList.splice(evt.newIndex, 0, targetRow)
            that.bannerDetails = []
            that.$nextTick(function () {
              that.bannerDetails = targetList
            })
          }
        })
      })
    },
    orientateRowIndex (rowIndex) {
      this.detailRowIndex = rowIndex
    },
    checkBanner () {
      if (this.bannerForm.versionLowerLimit > this.bannerForm.versionUpperLimit) {
        this.$message.error('开始版本要小于结束版本')
        return false
      }
      if (this.bannerForm.startTime > this.bannerForm.endTime) {
        this.$message.error('开始时间要小于结束时间')
        return false
      }
      return true
    },
    checkBannerDetails () {
      for (let i in this.bannerDetails) {
        const bannerDetail = this.bannerDetails[i]
        for (let p in bannerDetail) {
          const val = bannerDetail[p]
          if (!val && p !== 'id' && p !== 'sort') {
            this.$message.error(`${this.bannerDetailDesc[p]}不能为空`)
            return false
          }
        }
      }
      return true
    },
    setBannerDetailsSort () {
      for (let i in this.bannerDetails) {
        let bannerDetail = this.bannerDetails[i]
        bannerDetail.sort = i + 1
      }
    },
    back () {
      this.$router.push({name: 'banner'})
    }
  }
}
</script>

<style lang="stylus">
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
