<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑IOS开关配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appVersionAuditForm" :rules="rules" ref="appVersionAuditForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP名称">
              <el-select v-model="appVersionAuditForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="版本号">
              <el-select v-model="appVersionAuditForm.appVersion" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`versions_${appVersionAuditForm.appName}`)" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="IOS标识">
              <el-input v-model="appVersionAuditForm.marketName" style="width: 176px;" placeholder="IOS标识"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="是否审核">
              <el-select style="width: 110px;" v-model="appVersionAuditForm.isAudit" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('isAudit')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input type="textarea" cols="40" rows="5" v-model="appVersionAuditForm.remark" maxlength="200" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveAppVersionAudit">提交</el-button>
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
    'appVersionAuditWindow': Object
  },
  data () {
    return {
      appVersionAuditDetails: [],
      appVersionAuditForm: {},
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`
    }
  },
  methods: {
    openDialog () {
      this.appVersionAuditForm = clone(this.appVersionAuditWindow)
      try {
        this.appVersionAuditForm.appVersion = parseInt(this.appVersionAuditForm.appVersion)
      } catch (e) {
      }
    },
    closeDialog () {
      this.$refs['appVersionAuditForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    saveAppVersionAudit: debounce(300, function () {
      this.$refs['appVersionAuditForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            this.appVersionAuditForm.appVersionAuditDetails = this.appVersionAuditDetails
            const res = await this.$http.post('/app-version-audit', this.appVersionAuditForm)
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
