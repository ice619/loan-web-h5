<template>
  <div class="border">
    <el-dialog title="修改行为奖励配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="40%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'change' }]">
              <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="奖励行为" prop="customerState" :rules="[{ required: true, message: '请选择奖励行为', trigger: 'change' }]">
              <el-select v-model="entryForm.customerState" placeholder="请选择奖励行为" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('customerState')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="物料类型" prop="materialType" :rules="[{ required: true, message: '请选择物料类型', trigger: 'change' }]">
              <el-select v-model="entryForm.materialType" placeholder="请选择物料类型" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="奖励物料" prop="materialType" :rules="[{ required: true, message: '请选择奖励物料', trigger: 'change' }]">
              <el-select v-model="entryForm.materialCode" clearable placeholder="请选择奖励物料" style="width: 350px">
                <el-option v-for="item in materialConfig[this.entryForm.materialType]" :key="item.materialCode" :label="item.materialCode" :value="item.materialCode"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="6">
            <el-form-item label="系统类型" prop="osVersion" :rules="[{ required: true, message: '请选择系统类型', trigger: 'blur' }]">
              <el-select v-model="entryForm.osVersion" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('osVersion')" :key="item.value"
                           :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="12">
            <el-form-item label="生效版本号" prop="startAppVersion">
              <el-input v-model="entryForm.startAppVersion" clearable placeholder="请输入开始版本号"
                        style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="endAppVersion">
              <el-input v-model="entryForm.endAppVersion" clearable placeholder="请输入结束版本号"
                        style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="物料备注" prop="materialRemark">
              <el-input type="textarea" v-model="entryForm.materialRemark" rows="4" style="width: 350px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="状态：">
              <el-radio-group v-model="entryForm.status" style="width: 250px;">
                <el-radio v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <el-col :span="30">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">提交</el-button>
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
    'entry': Object
  },
  data () {
    return {
      entryForm: {
        appName: 21,
        materialType: null,
        materialCode: ''
      },
      materialConfig: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.entryForm = clone(this.entry)
      this.loadMaterialConfig()
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
        }
      }).catch(e => {
        this.$message.error('load app material config error')
        console.info(e)
      })
    },
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.put('/behavior-reward-config', this.entryForm)
            if (res.code === '200') {
              this.$message.success('修改成功!')
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
  },
  watch: {
    'entryForm.materialType': function (newValue, oldValue) {
      if (oldValue && oldValue !== newValue) {
        this.entryForm.materialCode = null
      }
    },
    'entryForm.materialCode': function () {
      if (this.entryForm.materialCode && this.entryForm.materialType) {
        let materialConfigElement = this.materialConfig[this.entryForm.materialType]
        if (materialConfigElement && materialConfigElement.length > 0) {
          let materialConfig = materialConfigElement.find(material => material.materialCode === this.entryForm.materialCode)
          if (materialConfig) {
            this.entryForm.materialRemark = materialConfig.remark
          }
        }
      }
    }
  }
}
</script>
