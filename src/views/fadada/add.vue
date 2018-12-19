<template>
  <div class="border">
    <el-dialog title="新增合同上传" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="100px" class="demo-form-inline" style="padding-left: 40px">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="APP平台:" align="left">
              <el-select v-model="entryForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="法大大版本号:" text-align="left">
              <el-input v-model="entryForm.fddVersion" clearable placeholder="法大大版本号" style="width: 217px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="合同模板编号:" align="left">
              <el-input v-model="entryForm.templateNo" clearable placeholder="不填写时，自动生成" style="width: 217px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="上传合同:" align="left">
              <el-upload
                class="upload-demo"
                :action="actionUrl"
                accept="application/pdf"
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
            <el-form-item label=" ">
              <el-input v-model="entryForm.templateUrl" readonly style="width: 400px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="备注:">
              <el-input v-model="entryForm.remark" type="textarea" style="width: 400px;" :rows="3" />
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
      actionUrl: `${process.env.API_ROOT}/management/fadada/file-upload`,
      entryFormInitForm: {
        appName: '',
        fddVersion: '',
        templateNo: '',
        templateUrl: '',
        remark: ''
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
        console.log(response.data.url)
        this.entryForm.templateUrl = response.data.url
      }
    },
    saveForm: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/fadada/save', this.entryForm)
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

<style lang="stylus">
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
  .el-form-item__label {
    text-align: left;
  }
</style>
