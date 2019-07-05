<template>
  <div class="border">
    <el-dialog title="新增运营弹窗" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="45%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
      <el-row type="flex" justify="left">
        <el-col :span="30">
          <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'change' }]">
            <el-select v-model="entryForm.appName" clearable placeholder="请选择App名称" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="运营弹窗位置" prop="position" :rules="[{ required: true, message: '请选择运营弹窗位置', trigger: 'change' }]">
              <el-select v-model="entryForm.position" clearable placeholder="请选择" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('popupPosition')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="生效用户" prop="userTag" :rules="[{ required: true, message: '请选择生效用户', trigger: 'change' }]">
              <el-select v-model="entryForm.userTag" clearable placeholder="请选择" style="width: 350px">
                <el-option v-for="item in $formatter.getSelectionOptions('userTag')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-form-item label="生效时间" prop="startTime" :rules="[{ required: true, message: '请选择生效时间', trigger: 'blur' }]">
            <el-date-picker v-model="entryForm.startTime" type="datetime" placeholder="请选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/>
          </el-form-item>
          ~
          <el-form-item prop="endTime">
            <el-date-picker v-model="entryForm.endTime" type="datetime" placeholder="请选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="图片" prop="imageUrl" :rules="[{ required: true, message: '请上传图片', trigger: 'blur' }]">
            <el-upload class="avatar-uploader" :action="activityUrl" accept="image/jpg,image/jpeg,,image/png,image/gif" :headers = "headers" :show-file-list="false" :on-change="handleFilesChange">
              <el-popover placement="right" width="200" trigger="hover" :content="entryForm.imageUrl && entryForm.imageUrl !== '' ? null : '图片未上传'">
                <img v-if="entryForm.imageUrl && entryForm.imageUrl !== ''" :src="entryForm.imageUrl" class="avatar">
                <el-button slot="reference" class="el-icon-plus">{{entryForm.imageUrl ? '更换图片' : '选择图片'}}</el-button>
              </el-popover>
            </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="跳转url" prop="popupUrl">
              <el-input v-model="entryForm.popupUrl" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
        <el-col :span="30">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="entryForm.remark" rows="4" placeholder="请输入备注" :disabled="entryForm.remarik === 'XJ'" clearable style="width: 350px"/>
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
      <el-row type="flex" justify="center" style="margin-top: 30px">
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
        imageUrl: null,
        status: 1,
        startTime: null,
        endTime: null
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
        if (!this.checkAppPopup()) {
          return
        }
        if (valid) {
          try {
            const res = await this.$http.post('/app-popup', this.entryForm)
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
    }),
    checkAppPopup () {
      if (this.entryForm.startTime > this.entryForm.endTime) {
        this.$message.error('开始时间要小于结束时间')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
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
