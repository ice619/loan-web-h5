<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增APP更新配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appVersionForm" :rules="rules" ref="appVersionForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP名称">
              <el-select v-model="appVersionForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP类型">
              <el-select v-model="appVersionForm.appType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('clientType')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="渠道">
              <el-input v-model="appVersionForm.remark" style="width: 300px;" placeholder="请输入更新渠道"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="版本号">
              <el-select v-model="appVersionForm.versionNumber" clearable placeholder="请输入本次更新版本号">
                <el-option v-for="item in $formatter.getSelectionOptions(`versions_${appVersionForm.appName}`)" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="下载地址">
              <el-input v-model="appVersionForm.downloadUrl" style="width: 500px;" placeholder="请输入下载地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="强更版本">
              <el-input v-model="appVersionForm.isForcedUpdate" style="width: 300px;" placeholder="请输入需要强制更新的版本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="非强更版本">
              <el-input v-model="appVersionForm.versionUpdate" style="width: 300px;" placeholder="请输入需要更新的版本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="40">
            <el-form-item label="是否弹窗">
              <el-select style="width: 110px;" v-model="appVersionForm.isPopup" clearable placeholder="请选择" @change="showPopupChange">
                <el-option v-for="item in $formatter.getSelectionOptions('appIsPopup')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="40">
            <el-form-item label="开始时间">
              <el-date-picker v-model="appVersionForm.beginTime" type="datetime" placeholder="请输入弹框开始时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="结束时间">
              <el-date-picker v-model="appVersionForm.endTime" type="datetime" placeholder="请输入弹框结束时间"
                              value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="更新标题">
              <el-input v-model="appVersionForm.changeTitle" style="width: 300px;" placeholder="请输入弹框标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="更新描述">
              <el-input type="textarea" cols="50" rows="5" v-model="appVersionForm.changeCopy" placeholder="请输入弹窗内显示的更新内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="状态">
              <el-select style="width: 110px;" v-model="appVersionForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveAppVersion">提交</el-button>
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
        appName: 6,
        appType: '',
        remark: 'official',
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
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`
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
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (this.appVersionForm.beginTime > this.appVersionForm.endTime) {
          this.$message.error('开始时间要小于结束时间')
          return
        }
        if (valid) {
          try {
            this.appVersionForm.appVersionDetails = this.appVersionDetails
            const res = await this.$http.post('/app-version', this.appVersionForm)
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
    // ,showPopupChange (selVal) {
    //   // 2:否,1:是
    //   if (selVal === 1) {
    //     this.showPopupFlag = true
    //   } else {
    //     this.showPopupFlag = false
    //   }
    // }
  }
}
</script>

<style>

</style>
