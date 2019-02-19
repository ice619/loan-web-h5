<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增banner配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="80%">
      <el-form :inline="true" :model="bannerForm" :rules="rules" ref="bannerForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="bannerForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效终端">
              <el-select v-model="bannerForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户标签">
              <el-select v-model="bannerForm.userTag" clearable placeholder="请选择">
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
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-select style="width: 110px;" v-model="bannerForm.versionUpperLimit" clearable placeholder="请选择">
              <el-option v-for="item in $formatter.getSelectionOptions(`versions_${bannerForm.appName}`)" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="banner位置">
              <el-select v-model="bannerForm.position" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('bannerPositions')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示位置">
              <el-select v-model="bannerForm.displayPosition" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('displayPositions')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker v-model="bannerForm.startTime" type="datetime" placeholder="选择开始时间"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker v-model="bannerForm.endTime" type="datetime" placeholder="选择结束时间"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="bannerForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="8">
                <el-form-item label="标题">
                  <el-input v-model="bannerForm.title" style="width: 176px;" placeholder="标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="排序值">
                  <el-input-number v-model="bannerForm.sort" style="width: 176px;" :min="1" :max="99" label="排序值"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="活动编号">
                  <el-input v-model="bannerForm.activityCode" style="width: 176px;" placeholder="活动编号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="活动链接">
                  <el-input v-model="bannerForm.activityUrl" style="width: 176px;" placeholder="活动链接"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="图片">
                  <el-upload :action="actionUrl" :show-file-list="false" :on-change="handleFilesChange">
                    <i class="el-icon-plus"></i>
                    <el-input style="display: none" type="hidden" v-model="bannerForm.imageUrl"></el-input>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="addBannerDetailsTableRows">添加</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table :data="bannerDetails" v-model="bannerDetails" height="250" border style="width: 100%">
            <el-table-column type="index" header-align="center" align="left" width="50"></el-table-column>
            <el-table-column prop="title" header-align="center" align="left" label="标题" width="150"></el-table-column>
            <el-table-column prop="sort" header-align="center" align="left" label="排序值"  width="80"></el-table-column>
            <el-table-column prop="activityCode" header-align="center" align="left" label="活动编号" width="150"></el-table-column>
            <el-table-column prop="activityUrl" header-align="center" align="left" label="活动链接" width="150"></el-table-column>
            <el-table-column prop="imageUrl" label="图片地址" width="750"></el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, bannerDetails)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveBanner">提交</el-button>
              <el-button @click="closeDialog">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import debounce from 'throttle-debounce/debounce'
import {clone} from '@/utils/common'

export default {
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      bannerDetails: [],
      bannerFormInitForm: {
        appName: 6,
        terminal: '',
        userTag: '',
        versionUpperLimit: '',
        versionLowerLimit: '',
        position: '',
        displayPosition: '',
        startTime: null,
        endTime: null,
        status: true
      },
      sort: 1,
      bannerForm: {},
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`
    }
  },
  methods: {
    addBannerDetailsTableRows () {
      if (this.bannerForm.title == null) {
        this.$message.error('标题不能为空')
        return
      }

      if (this.bannerForm.sort == null) {
        this.$message.error('排序值不能为空')
        return
      }

      if (this.bannerForm.activityCode == null) {
        this.$message.error('活动编号不能为空')
        return
      }

      if (this.bannerForm.activityUrl == null) {
        this.$message.error('活动链接不能为空')
        return
      }

      if (this.bannerForm.imageUrl == null) {
        this.$message.error('图片不能为空')
        return
      }

      this.bannerDetails.push({
        title: this.bannerForm.title,
        sort: this.bannerForm.sort,
        activityCode: this.bannerForm.activityCode,
        activityUrl: this.bannerForm.activityUrl,
        imageUrl: this.bannerForm.imageUrl
      })
      this.bannerForm.imageUrl = ''
    },
    openDialog () {
      this.bannerForm = clone(this.bannerFormInitForm)
    },
    closeDialog () {
      this.$refs['bannerForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    handleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }

      if (file.status === 'ready') {
        return
      }

      if (file.status === 'success' && file.response.code === '200') {
        this.bannerForm.imageUrl = file.response.data
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
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
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (this.bannerForm.versionLowerLimit > this.bannerForm.versionUpperLimit) {
          this.$message.error('开始版本要小于结束版本')
          return
        }

        if (this.bannerForm.startTime > this.bannerForm.endTime) {
          this.$message.error('开始时间要小于结束时间')
          return
        }

        if (valid) {
          try {
            this.bannerForm.bannerDetails = this.bannerDetails
            const res = await this.$http.post('/management/banner', this.bannerForm)
            if (res.code === '200') {
              this.$message.success('新增成功!')
              this.closeDialog()
            } else {
              this.$message.error(res.message)
            }
          } catch (err) {
            console.error(err)
          }
        }
      })
    })
  }
}
</script>

<style>

</style>
