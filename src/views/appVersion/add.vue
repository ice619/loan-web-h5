<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增APP更新配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appVersionForm" :rules="rules" ref="appVersionForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="appVersionForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP类型" prop="appType">
              <el-select v-model="appVersionForm.appType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('clientType')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="渠道" prop="remark">
              <el-input v-model="appVersionForm.remark" style="width: 217px;" clearable placeholder="请输入更新渠道"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="40">
            <el-form-item label="版本号" prop="versionNumber">
              <el-select v-model="appVersionForm.versionNumber" clearable placeholder="请输入本次更新版本号">
                <el-option v-for="item in $formatter.getSelectionOptions(`versions_${appVersionForm.appName}`)" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="40">
            <el-form-item label="版本号" prop="versionNumber">
              <el-input v-model="appVersionForm.versionNumber" style="width: 217px;" clearable placeholder="请输入本次更新版本号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="下载地址" prop="downloadUrl">
              <el-input v-model="appVersionForm.downloadUrl" style="width: 400px;" clearable placeholder="请输入下载地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="强更版本" prop="isForcedUpdate">
              <el-input v-model="appVersionForm.isForcedUpdate" style="width: 217px;" clearable placeholder="请输入需要强制更新的版本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="非强更版本" prop="versionUpdate">
              <el-input v-model="appVersionForm.versionUpdate" style="width: 217px;" clearable placeholder="请输入需要更新的版本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker v-model="appVersionForm.beginTime" type="datetime" placeholder="请输入弹框开始时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker v-model="appVersionForm.endTime" type="datetime" placeholder="请输入弹框结束时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="更新标题" prop="changeTitle">
              <el-input v-model="appVersionForm.changeTitle" style="width: 400px;" clearable placeholder="请输入弹框标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="更新描述" prop="changeCopy">
              <el-input type="textarea" cols="50" rows="5" v-model="appVersionForm.changeCopy" clearable placeholder="请输入弹窗内显示的更新内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="状态" prop="state">
              <el-select style="width: 217px;" v-model="appVersionForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveAppVersion">提交</el-button>
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
      appVersionDetails: [],
      appVersionInitForm: {
        appName: '',
        appType: '',
        remark: '',
        versionNumber: '',
        downloadUrl: '',
        isForcedUpdate: '',
        versionUpdate: '',
        isPopup: '1',
        beginTime: null,
        endTime: null,
        changeTitle: '',
        changeCopy: '',
        state: 1
      },
      appVersionForm: {},
      sort: 1,
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        appType: [
          {required: true, message: '请选择APP类型', trigger: 'blur'}
        ],
        remark: [
          {required: true, message: '请输入渠道', trigger: 'blur'}
        ],
        versionNumber: [
          {required: true, message: '请输入本次更新版本号', trigger: 'blur'}
        ],
        downloadUrl: [
          {required: true, message: '请输入下载地址', trigger: 'blur'}
        ],
        isForcedUpdate: [
          {required: true, message: '请输入需要强制更新的版本', trigger: 'blur'}
        ],
        versionUpdate: [
          {required: true, message: '请输入需要更新的版本', trigger: 'blur'}
        ],
        beginTime: [
          {required: true, message: '请输入弹框开始时间', trigger: 'blur'}
        ],
        endTime: [
          {required: true, message: '请输入弹框结束时间', trigger: 'blur'}
        ],
        changeTitle: [
          {required: true, message: '请输入弹框标题', trigger: 'blur'}
        ],
        changeCopy: [
          {required: true, message: '请输入弹窗内显示的更新内容', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.appVersionForm = clone(this.appVersionInitForm)
    },
    closeDialog () {
      this.$refs['appVersionForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    saveAppVersion: debounce(300, function () {
      this.$refs['appVersionForm'].validate(async (valid) => {
        if (this.appVersionForm.beginTime > this.appVersionForm.endTime) {
          this.$message.error('开始时间要小于结束时间')
          return
        }
        if (valid) {
          try {
            this.appVersionForm.appVersionDetails = this.appVersionDetails
            const res = await this.$http.post('/management/app-version', this.appVersionForm)
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
