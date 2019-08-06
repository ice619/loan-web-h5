<template>
  <div class="border">
    <el-dialog title="face级别配置修改" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="faceLevelConfigForm" :rules="rules" ref="faceLevelConfigForm" label-width="150px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="人脸识别阈值" prop="faceQualityValue">
              <el-input v-model.number="faceLevelConfigForm.faceQualityValue" clearable placeholder="仅限输入正数,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="人脸对比级别" prop="faceConfidenceLevel">
              <el-select v-model="faceLevelConfigForm.faceConfidenceLevel" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('faceLevel')" :key="item.value"
                           :label="item.label"
                           :value="item.label"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="证件号识别阈值" prop="idCardConfidence">
              <el-input v-model.number="faceLevelConfigForm.idCardConfidence" clearable placeholder="仅限输入正数,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="出生日期识别阈值" prop="birthdayConfidence">
              <el-input v-model.number="faceLevelConfigForm.birthdayConfidence" clearable placeholder="仅限输入正数,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="姓名识别阈值" prop="nameConfidence">
              <el-input v-model.number="faceLevelConfigForm.nameConfidence" clearable placeholder="仅限输入正数,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="状态:" prop="state" label-width="150px">
              <el-radio-group v-model="faceLevelConfigForm.state">
                <el-radio :label="1">待启用</el-radio>
                <el-radio :label="2">启用</el-radio>
                <el-radio :label="3">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="updateTipPage">提交</el-button>
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
    'faceObj': Object
  },
  data () {
    return {
      configDetails: [],
      tipPageInitForm: {
        state: null
      },
      faceLevelConfigForm: {},
      rules: {
        faceQualityValue: [
          {required: true, message: '请输入人脸识别阀值', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请输入正确的数值', trigger: 'blur'}
        ],
        faceConfidenceLevel: [
          {required: true, message: '请选择人脸对比级别', trigger: 'blur'}
        ],
        idCardConfidence: [
          {required: true, message: '请输入证件号识别阀值', trigger: 'blur'},
          {type: 'number', min: 0, message: '请输入正确的数值', trigger: 'blur'}
        ],
        birthdayConfidence: [
          {required: true, message: '请输入出生日期识别阀值', trigger: 'blur'},
          {type: 'number', min: 0, message: '请输入正确的数值', trigger: 'blur'}
        ],
        nameConfidence: [
          {required: true, message: '请输入姓名识别阀值', trigger: 'blur'},
          {type: 'number', min: 0, message: '请输入正确的数值', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async initFrom () {
      this.faceLevelConfigForm = clone(this.faceObj)
      this.faceLevelConfigForm.faceQualityValue = Number(this.faceLevelConfigForm.faceQualityValue)
      this.faceLevelConfigForm.idCardConfidence = Number(this.faceLevelConfigForm.idCardConfidence)
      this.faceLevelConfigForm.birthdayConfidence = Number(this.faceLevelConfigForm.birthdayConfidence)
      this.faceLevelConfigForm.nameConfidence = Number(this.faceLevelConfigForm.nameConfidence)
    },
    openDialog () {
      this.initFrom()
    },
    closeDialog () {
      this.$refs['faceLevelConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    updateTipPage: debounce(300, function () {
      this.$refs['faceLevelConfigForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/face-level/face-update', this.faceLevelConfigForm)
            if (res.code === '200') {
              this.$message.success('修改成功!')
              this.closeDialog()
            } else {
              if (res.code === '1014') {
                this.$message.error('有效记录已存在')
              } else {
                this.$message.error(res.message)
              }
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
<style lang="stylus" scoped="scoped">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
