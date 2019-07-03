<template>
  <div class="border">
    <el-dialog title="发送" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="75%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
        <el-row>
          <el-col :span="10">
            <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'blur' }]">
              <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 300px">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="物料类型" prop="materialType" :rules="[{ required: true, message: '请选择物料类型', trigger: 'blur' }]">
              <el-select v-model="entryForm.materialType" clearable placeholder="请选择物料类型" style="width: 300px">
                <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="来源(默认)" prop="title" :rules="[{ required: true, message: '请输入来源', trigger: 'blur' }]">
              <el-input v-model="entryForm.title" placeholder="默认语言" clearable style="width: 300px"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="物料编码" prop="materialType" :rules="[{ required: true, message: '请选择奖励物料', trigger: 'blur' }]">
              <el-select v-model="entryForm.materialCode" clearable placeholder="请选择奖励物料" style="width: 300px">
                <el-option v-for="item in materialConfigArray" :key="item.materialCode" :label="item.materialCode" :value="item.materialCode"/>
              </el-select>
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
            <el-form-item label="发送时间" prop="sendTime" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
              <el-date-picker v-model="entryForm.sendTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 300px"/>
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
            <el-form-item label="生效时间" prop="validStartTime" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
              <el-date-picker v-model="entryForm.validStartTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="生效时间" prop="validEndTime" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
              <el-date-picker v-model="entryForm.validEndTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="物料备注" prop="remark">
              <el-input type="textarea" v-model="entryForm.remark" rows="2" style="width: 300px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <el-col :span="30">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">确认发送</el-button>
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
        sendTime: null,
        validStartTime: null,
        validEndTime: null,
        remark: null
      },
      entryForm: {},
      materialConfigArray: [],
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
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          this.entryForm.phoneList = this.entryForm.sendPhones.split('\n')
          try {
            const res = await this.$http.post('/customer-reward-record/manual-send-reward', this.entryForm)
            if (res.code === '200') {
              this.$message.success('保存成功!')
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
    'entryForm.materialType': function () {
      if (this.entryForm.materialType) {
        this.$http.get(`/material-config/list/${this.entryForm.appName}/${this.entryForm.materialType}`).then(res => {
          if (res && res.code === '200') {
            this.materialConfigArray = res.data
          }
        }).catch(e => {
          this.$message.error('load app material config error')
          console.info(e)
        })
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
