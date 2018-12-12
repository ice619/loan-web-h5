<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="ruleForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布渠道" prop="channel">
              <el-input v-model="ruleForm.channel" clearable placeholder="发布渠道"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-select v-model="ruleForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`state`)" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="save">提交</el-button>
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
      ruleForm: {
        appName: '',
        channel: '',
        status: ''
      },
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        channel: [
          {required: true, message: '请输入发布渠道', trigger: 'blur'},
          {max: 100, message: '最长 100 个字符', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.ruleForm = clone(this.ruleForm)
    },
    closeDialog () {
      this.$refs['ruleForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/sesame-certification-switch', this.ruleForm)
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
  }
}
</script>

<style>

</style>
