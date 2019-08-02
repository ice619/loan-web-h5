<template>
  <div class="border">
    <el-dialog title="添加" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="40%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
      <el-row type="flex" justify="left">
        <el-col :span="30">
          <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'change' }]">
            <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="30">
          <el-form-item label="马甲包名称" prop="waistcoat" :rules="[{ required: true, message: '请输入马甲包名称', trigger: 'change' }]">
            <el-input v-model="entryForm.waistcoat" placeholder="马甲包名称" maxlength="50" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="30">
          <el-form-item label="下载链接" prop="downUrl">
            <el-input type="textarea" v-model="entryForm.downUrl" maxlength="300" rows="4" style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="left">
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
        waistcoat: null,
        downUrl: null,
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
            const res = await this.$http.post('/app-down-url', this.entryForm)
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
