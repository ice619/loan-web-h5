<template>
  <div class="border">
    <el-dialog title="添加" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="increaseButtonForm" :rules="rules" ref="increaseButtonForm" label-width="130px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="APP名称:" prop="appName">
              <el-select v-model="increaseButtonForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="用户类型:" prop="customerLevel">
              <el-select v-model="increaseButtonForm.customerLevel" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('userType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="流量占比(%):" prop="percent">
              <el-input v-model.number="increaseButtonForm.percent" clearable placeholder="请输入0-100的数字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态：">
              <el-radio-group v-model="increaseButtonForm.status" style="width: 250px;">
                <el-radio v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="save">提交</el-button>
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
    'increaseButton': Object
  },
  data () {
    return {
      increaseButtonForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        customerLevel: [
          {required: true, message: '请选择用户类型', trigger: 'blur'}
        ],
        percent: [
          {required: true, message: '请填写流量占比', trigger: 'blur'},
          {type: 'number', min: 1, max: 100, message: '百分比数值范围0-100', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.increaseButtonForm = clone(this.increaseButton)
    },
    closeDialog () {
      this.$refs['increaseButtonForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['increaseButtonForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.put('/increase-button-config', this.increaseButtonForm)
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
