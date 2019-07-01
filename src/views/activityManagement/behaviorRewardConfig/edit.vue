<template>
  <div class="border">
    <el-dialog title="新增物料" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="40%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'blur' }]">
              <el-select v-model="entryForm.appName" clearable placeholder="请选择App名称" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="物料类型" prop="materialType" :rules="[{ required: true, message: '请选择物料类型', trigger: 'blur' }]">
              <el-select v-model="entryForm.materialType" clearable placeholder="请选择物料类型" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="奖励物料" prop="materialType" :rules="[{ required: true, message: '请选择奖励物料', trigger: 'blur' }]">
              <el-select v-model="entryForm.materialCode" clearable placeholder="请选择奖励物料" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="物料备注" prop="materialRemark">
              <el-input type="textarea" v-model="entryForm.materialRemark" rows="4" readonly style="width: 350px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="状态：">
              <el-radio-group v-model="entryForm.status" style="width: 250px;">
                <el-radio v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <el-col :span="30">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">提交</el-button>
              <el-button @click="closeDialog">取消</el-button>
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
      entryFormInitForm: {
        appName: 21,
        materialType: null,
        materialCode: null,
        materialRemark: null,
        status: 1
      },
      entryForm: {},
      rules: {}
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
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/material-config', this.entryForm)
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
  .tip-info{
    margin-top: -20px;
    font-size: 10px;
    color: gray;
    width 350px;
  }
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .avatar-uploader {
    position: absolute;
    top: 0px;
    right: -123px;
  }
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
