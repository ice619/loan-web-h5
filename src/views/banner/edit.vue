<template>
  <div class="border" style="width: 100%">
    <el-dialog title="修改banner配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="bannerForm" :rules="rules" ref="bannerForm" label-width="100px"
               class="demo-form-inline">
        <el-input style="display: none" type="hidden" v-model="bannerForm.id"></el-input>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="bannerForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效终端">
              <el-select v-model="bannerForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.terminals" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户标签">
              <el-select v-model="bannerForm.userTag" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.userTags" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生效版本">
              <el-select style="width: 110px;" v-model="bannerForm.judge" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.judges" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-select style="width: 110px;" v-model="bannerForm.version" clearable placeholder="请选择">
              <el-option v-for="item in globalConfig.versions" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="banner位置">
              <el-select v-model="bannerForm.position" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.position" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示位置">
              <el-select v-model="bannerForm.displayPosition" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.displayPosition" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker v-model="bannerForm.startTime" type="datetime" placeholder="选择开始时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker v-model="bannerForm.endTime" type="datetime" placeholder="选择结束时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
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
                  <el-input v-model="bannerForm.sort" style="width: 176px;" min="1" max="99" placeholder="排序值"></el-input>
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
                  <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false"
                             :on-change="handleFilesChange">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <el-input style="display: none" type="hidden" v-model="bannerForm.imageUrl"></el-input>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="addBannerDetailsTableRows">添加</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table :data="bannerDetails" v-model="bannerDetails" height="250" border style="width: 1000px">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="title" label="标题" width="150"></el-table-column>
            <el-table-column prop="sort" label="排序值" width="150"></el-table-column>
            <el-table-column prop="activityCode" label="活动编号" width="150"></el-table-column>
            <el-table-column prop="activityUrl" label="活动地址" width="150"></el-table-column>
            <el-table-column prop="imageUrl" label="图片地址" width="750"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
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
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="状态">
              <el-switch style="margin: 10px;" v-model="bannerForm.status" :active-value="true"
                         :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveBanner">确定</el-button>
              <el-button @click="closeDialog">取消</el-button>
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
    'ifshow': Boolean,
    'bannerWindow': Object
  },
  data () {
    return {
      bannerDetails: [],
      bannerFormInitForm: {
        appName: 6,
        terminal: 1,
        userTag: 1,
        showFrequency: 1,
        title: 1,
        priority: 1,
        judge: 1,
        displayPosition: '',
        version: '',
        startTime: null,
        endTime: null,
        position: '',
        imageUrl: '',
        status: true
      },
      bannerForm: {},
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`
    }
  },
  methods: {
    addBannerDetailsTableRows () {
      this.bannerDetails.push({
        title: this.bannerForm.title,
        sort: this.bannerForm.sort,
        activityCode: this.bannerForm.activityCode,
        activityUrl: this.bannerForm.activityUrl,
        imageUrl: this.bannerForm.imageUrl
      })
    },
    openDialog () {
      this.bannerForm = clone(this.bannerWindow)
      this.initBannerDetails()
    },
    closeDialog () {
      this.$refs['bannerForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    handleFilesChange (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'success') {
        this.bannerForm.imageUrl = file.response.data
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
        this.bannerForm.startTime = new Date(this.bannerForm.startTime).getTime()
        this.bannerForm.endTime = new Date(this.bannerForm.endTime).getTime()
        this.bannerForm.bannerDetails = this.bannerDetails
        if (valid) {
          try {
            const res = await this.$http.post('/config/banner', this.bannerForm)
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
    }),
    async initBannerDetails () {
      try {
        const res = await this.$http.get('/config/banner/' + this.bannerForm.id)
        if (res.code === '200') {
          this.bannerDetails = res.data.bannerDetailsDTOS
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>

</style>
