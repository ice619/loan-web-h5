<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="ruleForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本代号" prop="versionCode">
              <el-input v-model="ruleForm.versionCode" clearable placeholder="版本代号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="版本名字" prop="versionName">
              <el-input v-model="ruleForm.versionName" clearable placeholder="版本名字"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布渠道" prop="channel">
              <el-input v-model="ruleForm.channel" clearable placeholder="发布渠道"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效时间" prop="validateFrom">
              <el-date-picker v-model="ruleForm.validateFrom" type="datetime" placeholder="选择生效时间" value-format="yyyy-MM-dd hh:mm:ss"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台类型" prop="clientType">
              <el-select v-model="ruleForm.clientType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('clientType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="基线版本" prop="baseVersion">
              <el-input v-model="ruleForm.baseVersion" clearable placeholder="基线版本"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补丁版本" prop="patchVersion">
              <el-input v-model="ruleForm.patchVersion" clearable placeholder="补丁版本"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补丁说明" prop="remark">
              <el-input v-model="ruleForm.remark" clearable placeholder="补丁说明" style="width: 675px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-select v-model="ruleForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions(`state`)" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补丁地址" prop="patchUrl">
              <el-upload
                class="upload-demo"
                :action="uploadAppPatchUrl"
                :on-change="handleFilesChange"
                :show-file-list="false">
                <el-input v-model="ruleForm.patchUrl" readonly clearable placeholder="补丁地址" suffix-icon="el-icon-circle-plus"/>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
              <el-input type="hidden" v-model="ruleForm.patchEncryption" style="display: none;"/>
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
      ruleForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        versionCode: [
          {required: true, message: '请输入版本代号', trigger: 'blur'},
          {max: 100, message: '最长 100 个字符', trigger: 'blur'}
        ],
        versionName: [
          {required: true, message: '请输入版本名字', trigger: 'blur'},
          {max: 100, message: '最长 100 个字符', trigger: 'blur'}
        ],
        channel: [
          {required: true, message: '请输入发布渠道', trigger: 'blur'},
          {max: 64, message: '最长 64 个字符', trigger: 'blur'}
        ],
        validateFrom: [
          {required: true, message: '请选择生效时间', trigger: 'blur'}
        ],
        clientType: [
          {required: true, message: '请选择平台类型', trigger: 'blur'}
        ],
        baseVersion: [
          {required: true, message: '请输入基线版本', trigger: 'blur'},
          {max: 30, message: '最长 30 个字符', trigger: 'blur'}
        ],
        patchVersion: [
          {required: true, message: '请输入补丁版本', trigger: 'blur'},
          {max: 30, message: '最长 30 个字符', trigger: 'blur'}
        ],
        remark: [
          {required: true, message: '请输入补丁说明', trigger: 'blur'},
          {max: 350, message: '最长 350 个字符', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        patchUrl: [
          {required: true, message: '请上传补丁包', trigger: 'blur'}
        ]
      },
      uploadAppPatchUrl: `${process.env.API_ROOT}/management/app-patch-version/uploadAppPathFile`
    }
  },
  methods: {
    openDialog () {
      this.ruleForm = clone(this.appPatchVersionWindow)
    },
    closeDialog () {
      this.$refs['ruleForm'].resetFields()
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
        this.ruleForm.patchUrl = file.response.data.patchUrl
        this.ruleForm.patchEncryption = file.response.data.patchEncryption
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message.error('上传失败')
      }
    },
    save: debounce(300, function () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/app-patch-version', this.ruleForm)
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
