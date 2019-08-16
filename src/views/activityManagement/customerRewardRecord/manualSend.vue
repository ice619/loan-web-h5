<template>
  <div class="border">
    <el-dialog title="发送" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="75%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
        <span style="display: block;text-align: center;margin-top: -50px;margin-bottom: 20px;color: red;">提示：如果希望即时收到红包，发送/生效时间需在系统现在时间减1小时</span>
        <el-row>
          <el-col :span="10">
            <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'change' }]">
              <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 300px">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="物料类型" prop="materialType" :rules="[{ required: true, message: '请选择物料类型', trigger: 'change' }]">
              <el-select v-model="entryForm.materialType" clearable placeholder="请选择物料类型" style="width: 300px">
                <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="来源(默认)" prop="title">
              <el-input v-model="entryForm.title" placeholder="默认语言" clearable style="width: 300px"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="物料编码" prop="materialCode" :rules="[{ required: true, message: '请选择奖励物料', trigger: 'change' }]">
              <el-select v-model="entryForm.materialCode" clearable placeholder="请选择奖励物料" style="width: 300px">
                <el-option v-for="item in materialConfig[this.entryForm.materialType]" :key="item.materialCode" :label="item.materialCode" :value="item.materialCode"/>
              </el-select>
              <span class="tip-info" style="left: 0;color:gray">备注：{{materialRemark}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="来源(切换)" prop="translateTitle">
              <el-input v-model="entryForm.translateTitle" placeholder="切换语言" clearable style="width: 300px"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发送时间" prop="sendTime" :rules="[{ required: true, message: '请选择发送时间', trigger: 'blur' }]">
              <el-date-picker v-model="entryForm.sendTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 300px"/>
              <span class="tip-info">五分钟之内即时发送</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="发送用户" prop="sendPhones" :rules="[{ required: true, message: '请输入发送用户', trigger: 'blur' }]">
              <el-input type="textarea" v-model="entryForm.sendPhones" rows="8" style="width: 300px"/>
              <span class="tip-info">多个手机号换行分隔</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="生效时间" prop="validStartTime" :rules="[{ required: entryForm.materialType === 'DK', message: '请选择生效时间', trigger: 'blur' }]">
              <el-date-picker v-model="entryForm.validStartTime" type="datetime" placeholder="选择生效时间" value-format="yyyy-MM-dd HH:mm:ss"
                              :disabled="entryForm.materialType !== 'DK'"
                              style="width: 300px"/>
            </el-form-item>
            <el-form-item label="失效时间" prop="validEndTime">
              <el-input v-model="entryForm.validEndTime" readonly :disabled="entryForm.materialType !== 'DK'" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="entryForm.remark" rows="2" style="width: 300px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <el-col :span="30">
            <el-form-item>
              <el-button type="primary" :disabled="sendBtnDisabled" @click="save">确认发送</el-button>
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
    'ifshow': Boolean
  },
  data () {
    return {
      entryFormInitForm: {
        appName: 21,
        materialType: null,
        materialCode: null,
        title: null,
        translateTitle: null,
        sendPhones: null,
        phoneList: [],
        sendTime: this.formatDate(new Date()),
        validStartTime: null,
        validEndTime: null,
        remark: null
      },
      entryForm: {},
      materialRemark: '',
      materialConfig: {},
      sendBtnDisabled: false,
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.entryForm = clone(this.entryFormInitForm)
    },
    closeDialog () {
      this.$refs['entryForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    loadMaterialConfig () {
      this.materialConfig = {}
      this.$http.get(`/material-config/list/${this.entryForm.appName}`).then(res => {
        if (res && res.code === '200') {
          res.data.forEach(config => {
            if (!this.materialConfig[config.materialType]) {
              this.materialConfig[config.materialType] = []
            }
            this.materialConfig[config.materialType].push(config)
          })
          this.$forceUpdate()
        }
      }).catch(e => {
        this.$message.error('load app material config error')
        console.info(e)
      })
    },
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        this.sendBtnDisabled = true
        if (valid) {
          if (this.entryForm.materialType === 'DK') {
            // 时间校验
            let sendTime = this.entryForm.sendTime
            let validStartTime = this.entryForm.validStartTime
            if (sendTime > validStartTime) {
              this.$message.warning('发送时间不能大于生效时间!')
              this.sendBtnDisabled = false
              return
            }
          }

          this.entryForm.phoneList = this.entryForm.sendPhones.split('\n')
          try {
            const res = await this.$http.post('/customer-reward-record/manual-send-reward', this.entryForm)
            if (res.code === '200') {
              this.$message.success('发送成功')
              this.closeDialog()
            } else {
              this.$message.error(res.message)
            }
          } catch (err) {
            console.error(err)
          }
        }
        this.sendBtnDisabled = false
      })
    })
  },
  watch: {
    'entryForm.appName': function (newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.entryForm.materialCode = null
        this.materialRemark = ''
        this.loadMaterialConfig()
      }
    },
    'entryForm.materialType': function (newValue, oldValue) {
      if (oldValue && oldValue !== newValue) {
        this.entryForm.materialCode = null
        this.materialRemark = ''
      }
    },
    'entryForm.validStartTime': function () {
      if (this.entryForm.materialType === 'DK' && this.entryForm.materialCode) {
        let materialConfigElement = this.materialConfig[this.entryForm.materialType]
        if (materialConfigElement && materialConfigElement.length > 0) {
          let materialConfig = materialConfigElement.find(material => material.materialCode === this.entryForm.materialCode)
          if (materialConfig) {
            let validDays = materialConfig.validDays
            this.entryForm.validEndTime = this.dateAddDays(this.parserDate(this.entryForm.validStartTime), validDays)
          }
        }
      }
    },
    'entryForm.materialCode': function () {
      this.materialRemark = ''
      if (this.entryForm.materialCode && this.entryForm.materialType) {
        let materialConfigElement = this.materialConfig[this.entryForm.materialType]
        if (materialConfigElement && materialConfigElement.length > 0) {
          let materialConfig = materialConfigElement.find(material => material.materialCode === this.entryForm.materialCode)
          if (materialConfig) {
            this.entryForm.materialRemark = materialConfig.remark
            if (materialConfig.remark) {
              this.materialRemark = (materialConfig.remark ? materialConfig.remark.substring(0, 20) : '') + (materialConfig.remark.length > 20 ? '...' : '')
            }
            if (this.entryForm.materialType === 'DK' && this.entryForm.validStartTime) {
              let validDays = materialConfig.validDays
              this.entryForm.validEndTime = this.dateAddDays(this.parserDate(this.entryForm.validStartTime), validDays)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tip-info{
    position: absolute;
    margin-top: -10px;
    font-size: 10px;
    color: red;
    right: 0;
  }
</style>
