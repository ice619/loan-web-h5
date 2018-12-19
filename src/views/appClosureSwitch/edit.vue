<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑Android截流配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appClosureSwitchForm" :rules="rules" ref="appClosureSwitchForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="appClosureSwitchForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="渠道" prop="channel">
              <el-input v-model="appClosureSwitchForm.channel" style="width: 217px;" clearable placeholder="请输入渠道"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="40">
            <el-form-item label="版本号" prop="appVersion">
              <el-select v-model="appClosureSwitchForm.appVersion" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`versions_${appClosureSwitchForm.appName}`)" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="40">
            <el-form-item label="版本号" prop="appVersion">
              <el-input v-model="appClosureSwitchForm.appVersion" style="width: 217px;" clearable placeholder="请输入版本号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="状态" prop="state">
              <el-select style="width: 217px;" v-model="appClosureSwitchForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input type="textarea" cols="40" rows="5" v-model="appClosureSwitchForm.remark" maxlength="200" clearable placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveAppClosureSwitch">提交</el-button>
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
    'appClosureSwitchWindow': Object
  },
  data () {
    return {
      appClosureSwitchDetails: [],
      appClosureSwitchForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        channel: [
          {required: true, message: '请输入渠道', trigger: 'blur'}
        ],
        appVersion: [
          {required: true, message: '请输入版本号', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.appClosureSwitchForm = clone(this.appClosureSwitchWindow)
    },
    closeDialog () {
      this.$refs['appClosureSwitchForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    saveAppClosureSwitch: debounce(300, function () {
      this.$refs['appClosureSwitchForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.appClosureSwitchForm.appClosureSwitchDetails = this.appClosureSwitchDetails
            const res = await this.$http.post('/management/app-closure-switch', this.appClosureSwitchForm)
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
