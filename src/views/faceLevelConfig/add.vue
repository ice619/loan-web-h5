<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="faceLevelConfigForm" :rules="rules" ref="faceLevelConfigForm" label-width="150px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="人脸质量分" prop="faceQualityValue">
              <el-input v-model.number="faceLevelConfigForm.faceQualityValue" clearable placeholder="0~100分值,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人脸对比置信度级别" prop="faceConfidenceLevel">
              <el-input v-model.number="faceLevelConfigForm.faceConfidenceLevel" clearable placeholder="1e-3~1e-6,级别越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" prop="state">
              <el-radio-group v-model="faceLevelConfigForm.state">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">提交</el-button>
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
      faceLevelConfigInitForm: {
        appName: 21,
        faceQualityValue: null,
        faceConfidenceLevel: null,
        state: 2
      },
      faceLevelConfigForm: {},
      rules: {
        faceQualityValue: [
          {required: true, message: '请输入人脸识别阀值', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请输入正确的数值', trigger: 'blur'}
        ],
        faceConfidenceLevel: [
          {required: true, message: '请输入身份证正面识别阀值', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.faceLevelConfigForm = clone(this.faceLevelConfigInitForm)
    },
    closeDialog () {
      this.$refs['faceLevelConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['faceLevelConfigForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/face-level/face-save', this.faceLevelConfigForm)
            if (res.code === '200') {
              this.$message.success('保存成功!')
              this.closeDialog()
            } else {
              // if(res.code === '1014'){
              //   this.$message.error('有效数据已存在')
              // }else {
              //
              // }
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
