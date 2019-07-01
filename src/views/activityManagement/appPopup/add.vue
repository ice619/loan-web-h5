<template>
  <div class="border">
    <el-dialog title="新增物料" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="90%" style="margin-top: -80px">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline" style="margin-left: 10%;">
      <el-row>
        <el-col :span="10">
          <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'blur' }]">
            <el-select v-model="entryForm.appName" clearable placeholder="请选择App名称" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="物料类型" prop="materialType" :rules="[{ required: true, message: '请选择物料类型', trigger: 'blur' }]">
            <el-select v-model="entryForm.materialType" clearable placeholder="请选择物料类型" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-upload class="avatar-uploader" :action="activityUrl" accept="image/jpg,image/jpeg,,image/png" :headers = "headers" :show-file-list="false" :on-change="handleFilesChange">
              <el-popover placement="right" width="200" trigger="hover" :content="entryForm.imageUrl && entryForm.imageUrl !== '' ? null : '图片未上传'">
                <img v-if="entryForm.imageUrl && entryForm.imageUrl !== ''" :src="entryForm.imageUrl" class="avatar">
                <el-button slot="reference" class="el-icon-plus">{{entryForm.imageUrl ? '更换图片' : '选择图片'}}</el-button>
              </el-popover>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题(默认)" prop="title" :rules="[{ required: entryForm.materialType !== 'XJ', message: '请输入标题', trigger: 'blur' }]">
            <el-input v-model="entryForm.title" placeholder="默认语言" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="标题(切换)" prop="title">
            <el-input v-model="entryForm.translateTitle" placeholder="切换语言" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="金额" prop="amount" :rules="[{ required: entryForm.materialType !== 'JP', message: '请输入金额', trigger: 'blur' }]">
            <el-input v-model="entryForm.amount" placeholder="请输入金额" :disabled="entryForm.materialType === 'JP'" clearable style="width: 350px"/>
            <span class="tip-info">请注意APP金额单位！</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="有效期(天)" prop="validDays" :rules="[{ required: entryForm.materialType === 'DK', message: '请输入有效期', trigger: 'blur' }]">
            <el-input v-model="entryForm.validDays" placeholder="请输入有效期" :disabled="entryForm.materialType != 'DK'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="使用场景" prop="usageScene" :rules="[{ required: entryForm.materialType === 'DK', message: '请选择使用场景', trigger: 'blur' }]">
            <el-select v-model="entryForm.usageScene" placeholder="请选择使用场景" :disabled="entryForm.materialType != 'DK'" clearable style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('usageScene')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="逾期可用" prop="validDays" :rules="[{ required: entryForm.materialType === 'DK', message: '请选择逾期可用', trigger: 'blur' }]">
            <el-select v-model="entryForm.overdueCanUse" placeholder="请选择逾期可用" :disabled="entryForm.materialType != 'DK'" clearable style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('overdueCanUse')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="规则描述(默认)" prop="ruleDesc">
            <el-input type="textarea" v-model="entryForm.ruleDesc" rows="4" placeholder="请输入默认语言规则描述" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="规则描述(切换)" prop="translateRuleDesc">
            <el-input type="textarea" v-model="entryForm.translateRuleDesc" rows="4" placeholder="请输入切换语言规则描述" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="entryForm.remark" rows="4" placeholder="请输入备注" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="状态：">
            <el-radio-group v-model="entryForm.status" style="width: 250px;">
              <el-radio v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 50px">
        <el-col :span="40">
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
import {getToken, getLanguage} from '@/utils/VueCookies'

export default {
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      entryFormInitForm: {
        appName: 21,
        materialType: null,
        imageUrl: null,
        validDays: null,
        usageScene: null,
        overdueCanUse: null,
        ruleDesc: null,
        translateRuleDesc: null,
        status: 1
      },
      entryForm: {},
      rules: {},
      activityUrl: `${process.env.API_ROOT}/upload-image-file`,
      headers: {
        'xxl_sso_sessionid': getToken(),
        'language': getLanguage()
      }
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
    handleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.entryForm.imageUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
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
    position: absolute;
    margin-top: -10px;
    font-size: 10px;
    color: gray;
    right: 0;
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
