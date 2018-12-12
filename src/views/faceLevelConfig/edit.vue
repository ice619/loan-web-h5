<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="faceLevelConfigForm" :rules="rules" ref="faceLevelConfigForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称">
              <el-select v-model="faceLevelConfigForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人脸识别阀值">
              <el-input v-model="faceLevelConfigForm.faceRecognitionLevel" clearable placeholder="人脸识别阀值"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证正面识别阀值">
              <el-input v-model="faceLevelConfigForm.positiveIdCardLevel" clearable placeholder="身份证正面识别阀值"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证反面识别阀值">
              <el-input v-model="faceLevelConfigForm.oppositeIdCardLevel" clearable placeholder="身份证反面识别阀值"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份综合验证阀值">
              <el-input v-model="faceLevelConfigForm.identifyResultLevel" clearable placeholder="身份综合验证阀值"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="faceLevelConfigForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`state`)" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="faceLevelConfigForm.remark" clearable placeholder="备注" style="width: 675px;"/>
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
    'ifshow': Boolean,
    'faceLevelConfigWindow': Object
  },
  data () {
    return {
      faceLevelConfigForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.faceLevelConfigForm = clone(this.faceLevelConfigWindow)
    },
    closeDialog () {
      this.$refs['faceLevelConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['faceLevelConfigForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/face-level/save-or-update', this.faceLevelConfigForm)
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
