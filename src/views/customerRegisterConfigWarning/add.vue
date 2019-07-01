<template>
  <div class="border">
    <el-dialog title="注册量新增页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="registerPageForm" :rules="rules" ref="registerPageForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="APP平台:" prop="appName">
              <el-select v-model="registerPageForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="单日注册上限:" prop="registerLimit">
              <el-input type="text" v-model="registerPageForm.registerLimit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="预警率值:" prop="warningRate">
              <el-input type="text" v-model="registerPageForm.warningRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="接收手机号:" prop="receivedPhone">
              <el-input type="text" v-model="registerPageForm.receivedPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态:" prop="currentState">
              <el-radio-group v-model="registerPageForm.currentState">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveTipPage">提交</el-button>
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
      configTime: [],
      tipPageInitForm: {
        appName: 21,
        registerLimit: '',
        currentState: 1,
        warningRate: '',
        receivedPhone: ''
      },
      registerPageForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP平台', trigger: 'blur'}
        ],
        registerLimit: [
          {required: true, message: '请设置单日注册上限阈值', trigger: 'blur'}
        ],
        currentState: [
          {required: true, message: '请设置状态值', trigger: 'blur'}
        ],
        warningRate: [
          {required: true, message: '请设置预警率值', trigger: 'blur'},
          { min: 1, max: 100, message: '百分比范围在1-100的数字', trigger: 'blur' }
        ],
        receivedPhone: [
          {required: true, message: '请设置手机号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.registerPageForm = clone(this.tipPageInitForm)
    },
    closeDialog () {
      this.$refs['registerPageForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveTipPage: debounce(300, function () {
      this.$refs['registerPageForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/register-config/register-config-save', this.registerPageForm)
            if (res.code === '200' && res.data.success === true) {
              this.$message.success('新增成功!')
              this.closeDialog()
            } else {
              if (res.data.message) {
                this.$message.error(res.data.message)
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
<style lang="stylus">
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
