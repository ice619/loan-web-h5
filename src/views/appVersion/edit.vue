<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增APP更新配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appVersionForm" :rules="rules" ref="appVersionForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="appVersionForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终端类型" prop="appType">
              <el-select v-model="appVersionForm.appType" clearable placeholder="请选择">
                <el-option v-for="item in clientTypes" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="渠道" prop="market">
              <el-input v-model="appVersionForm.market" clearable placeholder="请输入更新渠道"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本号" prop="versionNumber">
              <el-input v-model="appVersionForm.versionNumber" clearable placeholder="请输入本次更新版本号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="下载地址" prop="downloadUrl" >
              <el-input v-model="appVersionForm.downloadUrl" style="width: 675px;" clearable placeholder="请输入下载地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="强更版本" prop="isForcedUpdate">
              <el-input v-model="appVersionForm.isForcedUpdate" clearable placeholder="采用;分割，非必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="非强更弹窗" prop="isPopup">
              <el-select v-model="appVersionForm.isPopup" clearable placeholder="请选择是否需要弹窗">
                <el-option v-for="item in isPopups" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker v-model="appVersionForm.beginTime" type="datetime" placeholder="请输入开始时间"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker v-model="appVersionForm.endTime" type="datetime" placeholder="请输入结束时间"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="更新标题" prop="changeTitleLocal">
              <el-input v-model="appVersionForm.changeTitleLocal" style="width: 675px;" clearable placeholder="请输入弹框标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新标题(英)">
              <el-input v-model="appVersionForm.changeTitleEn" style="width: 675px;" clearable placeholder="请输入弹框标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="更新描述" prop="changeCopyLocal">
              <el-input style="width: 675px;" type="textarea" cols="76" v-model="appVersionForm.changeCopyLocal" clearable placeholder="请输入弹窗内显示的更新内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新描述(英)">
              <el-input style="width: 675px;" type="textarea" cols="76" v-model="appVersionForm.changeCopyEn" clearable placeholder="请输入弹窗内显示的更新内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="appVersionForm.state">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
              </el-radio-group>
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
    'ifshow': Boolean,
    'appVersionWindow': Object
  },
  data () {
    return {
      appVersionInitForm: {
        appName: 21,
        appType: null,
        market: 'official',
        versionNumber: '',
        downloadUrl: '',
        isForcedUpdate: '',
        isPopup: null,
        beginTime: null,
        endTime: null,
        changeTitleLocal: '',
        changeTitleEn: '',
        changeCopyLocal: '',
        changeCopyEn: '',
        state: 1
      },
      appVersionForm: {},
      sort: 1,
      rules: {
        appName: [
          {required: true, message: '请选择应用类型', trigger: 'blur'}
        ],
        appType: [
          {required: true, message: '请选择终端类型', trigger: 'blur'}
        ],
        market: [
          {required: true, message: '请输入渠道', trigger: 'blur'}
        ],
        versionNumber: [
          {required: true, message: '请输入本次更新版本号', trigger: 'blur'}
        ],
        downloadUrl: [
          {required: true, message: '请输入下载地址', trigger: 'blur'}
        ],
        isPopup: [
          {required: true, message: '请选择是否需要弹窗', trigger: 'blur'}
        ],
        beginTime: [
          {required: true, message: '请输入开始时间', trigger: 'blur'}
        ],
        endTime: [
          {required: true, message: '请输入结束时间', trigger: 'blur'}
        ],
        changeTitleLocal: [
          {required: true, message: '请输入弹框标题', trigger: 'blur'}
        ],
        changeCopyLocal: [
          {required: true, message: '请输入弹窗内显示的更新内容', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      clientTypes: [{value: 1, label: 'Android'}, {value: 2, label: 'IOS'}],
      isPopups: [{value: '1', label: '是'}, {value: '0', label: '否'}]
    }
  },
  methods: {
    async initFrom () {
      try {
        const res = await this.$http.get('/app-version/expands/' + this.appVersionWindow.appVersionId)
        if (res.code === '200' && res.data && res.data.length > 0) {
          this.appVersionForm = clone(this.appVersionWindow)
          this.appVersionForm.appType = parseInt(this.appVersionForm.appType)
          let data = res.data
          data.forEach(r => {
            if (r.language === 'id') {
              this.appVersionForm.changeTitleLocal = r.expand1
              this.appVersionForm.changeCopyLocal = r.expand2
            } else {
              this.appVersionForm.changeTitleEn = r.expand1
              this.appVersionForm.changeCopyEn = r.expand2
            }
          })
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    openDialog () {
      this.initFrom()
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
            const res = await this.$http.post('/app-version', this.appVersionForm)
            if (res.code === '200') {
              this.$message.success('编辑成功!')
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
