<template>
  <div class="border" style="width: 100%">
    <el-form :inline="true" :model="bannerForm" :rules="rules" ref="bannerForm" label-width="100px"
             class="demo-form-inline">
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
         <!-- <span>配置受众</span>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="APP名称">
            <el-select v-model="bannerForm.appName" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户标签">
            <el-select v-model="bannerForm.userTags" clearable multiple placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('userTag')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">
          <el-form-item label="生效终端">
            <el-select v-model="bannerForm.terminal" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="生效版本号" prop="startAppVersion">
            <el-input v-model="bannerForm.startAppVersion" clearable placeholder="请输入开始版本号"></el-input>
          </el-form-item>
          <el-form-item prop="endAppVersion">
            <el-input v-model="bannerForm.endAppVersion" clearable placeholder="请输入结束版本号"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="6">
            <el-form-item label="banner位置" prop="position">
              <el-select v-model="bannerForm.position" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('position')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item label="生效时间" prop="startTime">
            <el-date-picker v-model="bannerForm.startTime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime">
            <el-date-picker v-model="bannerForm.endTime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
      </el-row>
     <!-- <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <hr style="height:1px;border:none;border-top:1px solid #555555;" />
        </el-col>
      </el-row>-->
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <span style="margin-right: 10px">新增</span><el-button class="el-icon-plus" @click="addBannerDetailsTableRows" style="color: white;background-color: #009688;"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <!--<el-col :span="6">
          <el-form-item label="显示位置" prop="displayPosition">
            <el-select v-model="bannerForm.displayPosition" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions('displayPositions')" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-col :span="24">
          <el-table :data="bannerDetails" border style="width: 100%">
            <el-table-column prop="title" header-align="center" align="left" label="默认语言">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="translateTitle" header-align="center" align="left" label="活动标题(其他语言)">
              <template slot-scope="scope">
                <el-input v-model="scope.row.translateTitle" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="activityUrl" header-align="center" align="left" label="活动链接">
              <template slot-scope="scope">
                <el-input v-model="scope.row.activityUrl" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="imageUrl" header-align="center" align="left" label="图片">
              <template slot-scope="scope">
                <el-upload class="avatar-uploader" :action="activityUrl" :headers = "headers" :show-file-list="false" :on-change="handleFilesChange">
                  <el-popover placement="right" width="200" trigger="hover" :content="scope.row.imageUrl ? null : '图片未上传'">
                    <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar">
                    <el-button @click="orientateRowIndex(scope.$index)" slot="reference" :class="scope.row.imageUrl ? 'el-icon-edit' : 'el-icon-plus'">{{scope.row.imageUrl ? '更换图片' : '选择图片'}}</el-button>
                  </el-popover>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="25">
              <template slot-scope="scope">
                <el-button class="el-icon-sort-up" type="text" :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row)"></el-button>
                <el-button class="el-icon-sort-down" type="text" :disabled="scope.$index===(bannerDetails.length-1)" @click="moveDown(scope.$index,scope.row)"></el-button>
                <i class="el-icon-delete drag-handler" @click="deleteRow(scope.$index, bannerDetails)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="40">
          <el-form-item label="状态">
            <el-radio-group v-model="bannerForm.status">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-col :span="40">
          <el-form-item>
            <el-button style="color: white;background-color: #009688;" @click="saveBanner">提交</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import debounce from 'throttle-debounce/debounce'
import {clone} from '@/utils/common'
import {getToken, getLanguage} from '@/utils/VueCookies'
export default {
  data () {
    const versionReg = /^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/
    const checkStartAppVersion = (rule, value, callback) => {
      if (value == null) {
        return
      }
      if (!value.match(versionReg)) {
        callback(new Error('请输入正确的版本号'))
      } else {
        callback()
      }
    }
    const checkEndAppVersion = (rule, value, callback) => {
      if (value == null) {
        return
      }
      if (!value.match(versionReg)) {
        callback(new Error('请输入正确的版本号'))
      } else {
        callback()
      }
    }
    return {
      bannerForm: {},
      bannerDetailDesc: {
        title: '标题',
        activityUrl: '活动链接',
        imageUrl: '图片链接'
      },
      bannerDetail: {
        title: null,
        activityUrl: null,
        imageUrl: null,
        sort: 0,
        userTags: [{'value': 1, 'label': '全部用户'}]
      },
      bannerDetails: [],
      rules: {
        startAppVersion: [
          {validator: checkStartAppVersion, trigger: 'blur'}
        ],
        checkEndAppVersion: [
          {validator: checkEndAppVersion, trigger: 'blur'}
        ]
      },
      activityUrl: `${process.env.API_ROOT}/upload-image-file`,
      headers: {
        'xxl_sso_sessionid': getToken(),
        'language': getLanguage()
      }
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
    // 向上移动
    moveUp (index, row) {
      let that = this
      let upDate = that.bannerDetails[index - 1]
      that.bannerDetails.splice(index - 1, 1)
      that.bannerDetails.splice(index, 0, upDate)
    },
    // 向下移动
    moveDown (index, row) {
      let that = this
      let downDate = that.bannerDetails[index + 1]
      that.bannerDetails.splice(index + 1, 1)
      that.bannerDetails.splice(index, 0, downDate)
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
            const res = await this.$http.post('/banner', this.bannerForm)
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
      this.$http.get(`/banner/${this.$route.params.bannerId}`).then(res => {
        if (res.code === '200') {
          this.bannerForm = this.copyToForm(res.data)
          this.bannerDetails = res.data.bannerDetailsDTOS
          console.info(this.bannerForm.status)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    copyToForm (data) {
      let form = {
        id: data.id,
        appName: data.appName,
        terminal: data.terminal,
        startVersion: data.startVersion,
        endVersion: data.endVersion,
        position: data.position,
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
    orientateRowIndex (rowIndex) {
      this.detailRowIndex = rowIndex
    },
    checkBanner () {
      if (this.bannerForm.startVersion > this.bannerForm.endVersion) {
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
      if (!this.bannerDetails || this.bannerDetails.length === 0) {
        this.$message.error(`bannerDetails信息未填写`)
        return false
      }
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
        bannerDetail.sort = parseInt(i) + 1
      }
    },
    back () {
      this.$router.push({name: 'banner'})
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
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
