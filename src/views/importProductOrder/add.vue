<template>
  <div class="border">
    <el-dialog title="新增" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="100px" class="demo-form-inline" style="padding-left: 40px">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="APP平台:" prop="appName" :rules="[{ required: true, message: '请选择APP平台', trigger: 'change' }]" align="left">
              <el-select v-model="entryForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="上传保单:" align="left">
              <el-upload
                class="upload-demo"
                :action="actionUrl"
                accept=".xlsx"
                :show-file-list="false"
                :on-success="successHandler"
                :multiple="false">
                <el-button style="color: white;background-color: #009688;" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="margin-top: -20px">
          <el-col :span="30">
            <el-form-item label="保单地址:" prop="fileStorageAddress" :rules="[{ required: true, message: '请先上传保单', trigger: 'blur' }]" >
              <el-input v-model="entryForm.fileStorageAddress" readonly style="width: 400px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="padding-top: 20px;padding-left: 50px">
          <el-col :span="30">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveForm">提交</el-button>
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
  data: function () {
    return {
      actionUrl: `${process.env.API_ROOT}/management/import-product-order/file-upload`,
      entryFormInitForm: {
        appName: 7,
        fileStorageAddress: ''
      },
      entryForm: {},
      rules: {},
      dialogVisible: false,
      displayFlag: true
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
    successHandler (response, file, fileList) {
      if (response.code !== '200') {
        this.$message.error('上传失败！' + response.message)
        return null
      } else {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
        this.entryForm.fileStorageAddress = response.data
      }
    },
    saveForm: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/import-product-order/save', this.entryForm)
            if (res.code === '200') {
              this.$message.success('新增成功!')
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
  .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 330px;
    height: 500px;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
</style>
