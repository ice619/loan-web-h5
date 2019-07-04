<template>
  <div class="border">
    <el-dialog title="注册量更新页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="registerPageForm" :rules="rules" ref="registerPageForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="人脸质量分:" prop="registerLimit" label-width="150px">
              <el-input type="number" v-model="registerPageForm.faceQualityValue"  placeholder="0~100分值,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="置信度级别:" prop="warningRate" label-width="150px">
              <el-input type="number" v-model="registerPageForm.faceConfidenceLevel" placeholder="1e-3~1e-6,级别越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态:" prop="state" label-width="150px">
              <el-radio-group v-model="registerPageForm.state">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
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
        state: 1
      },
      registerPageForm: {},
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
    async initFrom () {
      this.registerPageForm = clone(this.faceObj)
    },
    openDialog () {
      this.initFrom()
    },
    closeDialog () {
      this.$refs['registerPageForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    updateTipPage: debounce(300, function () {
      this.$refs['registerPageForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/face-level/face-update', this.registerPageForm)
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
