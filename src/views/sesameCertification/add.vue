<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="sesameCertificationSwitchForm" :rules="rules" ref="sesameCertificationSwitchForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称">
              <el-select v-model="sesameCertificationSwitchForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布渠道">
              <el-input v-model="sesameCertificationSwitchForm.channel" clearable placeholder="发布渠道"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="sesameCertificationSwitchForm.state" clearable placeholder="请选择">
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
      sesameCertificationSwitchInitForm: {
        appName: '',
        channel: '',
        status: ''
      },
      sesameCertificationSwitchForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.sesameCertificationSwitchForm = clone(this.sesameCertificationSwitchInitForm)
    },
    closeDialog () {
      this.$refs['sesameCertificationSwitchForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['sesameCertificationSwitchForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/sesameCertificationSwitch', this.sesameCertificationSwitchForm)
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
