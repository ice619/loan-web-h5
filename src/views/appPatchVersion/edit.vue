<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="appPatchVersionForm" :rules="rules" ref="appPatchVersionForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称">
              <el-select v-model="appPatchVersionForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本代号">
              <el-input v-model="appPatchVersionForm.versionCode" clearable placeholder="版本代号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="版本名字">
              <el-input v-model="appPatchVersionForm.versionName" clearable placeholder="版本名字"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布渠道">
              <el-input v-model="appPatchVersionForm.channel" clearable placeholder="发布渠道"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效时间">
              <el-date-picker v-model="appPatchVersionForm.validateFrom" type="datetime" placeholder="选择生效时间" value-format="yyyy-MM-dd hh:mm:ss"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台类型">
              <el-select v-model="appPatchVersionForm.clientType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('clientType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="基线版本">
              <el-input v-model="appPatchVersionForm.baseVersion" clearable placeholder="基线版本"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补丁版本">
              <el-input v-model="appPatchVersionForm.patchVersion" clearable placeholder="补丁版本"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补丁说明">
              <el-input v-model="appPatchVersionForm.remark" clearable placeholder="补丁说明" style="width: 675px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="appPatchVersionForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`state`)" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补丁地址">
              <el-upload
                class="upload-demo"
                :action="uploadAppPatchUrl"
                :on-change="handleFilesChange"
                :show-file-list="false">
                <el-input v-model="appPatchVersionForm.patchUrl" readonly clearable placeholder="补丁地址" suffix-icon="el-icon-circle-plus"/>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
              <el-input type="hidden" v-model="appPatchVersionForm.patchEncryption"/>
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
    'appPatchVersionWindow': Object
  },
  data () {
    return {
      appPatchVersionForm: {},
      rules: {},
      uploadAppPatchUrl: `${process.env.API_ROOT}/config/appPatchVersion/uploadAppPathFile`
    }
  },
  methods: {
    openDialog () {
      this.appPatchVersionForm = clone(this.appPatchVersionWindow)
    },
    closeDialog () {
      this.$refs['appPatchVersionForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    handleFilesChange (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }

      if (file.status === 'ready') {
        return
      }

      if (file.status === 'success' && file.response.code === '200') {
        this.appPatchVersionForm.patchUrl = file.response.data.patchUrl
        this.appPatchVersionForm.patchEncryption = file.response.data.patchEncryption
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message.error('上传失败')
      }
    },
    save: debounce(300, function () {
      this.$refs['appPatchVersionForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/config/appPatchVersion', this.appPatchVersionForm)
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
