<template>
  <div class="border">
    <el-dialog title="官网二维码配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="twoDimensionalCodeForm" :rules="rules" ref="twoDimensionalCodeForm" label-width="130px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="APP名称:" prop="appName">
              <el-select v-model="twoDimensionalCodeForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="本地下载二维码:" prop="localCodeImageUrl">
              <el-upload
                :headers = "headers"
                class="avatar-uploader"
                :action="activityUrl"
                :show-file-list="false"
                :on-success="handleLocalAvatarSuccess">
                <img v-if="twoDimensionalCodeForm.localCodeImageUrl" :src="twoDimensionalCodeForm.localCodeImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="谷歌商店二维码:" prop="googleCodeImageUrl">
              <el-upload
                :headers = "headers"
                class="avatar-uploader"
                :action="activityUrl"
                :show-file-list="false"
                :on-success="handleGoogleAvatarSuccess">
                <img v-if="twoDimensionalCodeForm.googleCodeImageUrl" :src="twoDimensionalCodeForm.googleCodeImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="下载短链:" prop="shortUrl">
              <el-input type="text" v-model="twoDimensionalCodeForm.shortUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态:" prop="status">
              <el-radio-group v-model="twoDimensionalCodeForm.status">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
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
import {getToken, getLanguage} from '@/utils/VueCookies'
export default {
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      twoDimensionalCodeInitForm: {
        appName: 21,
        localCodeImageUrl: null,
        googleCodeImageUrl: null,
        shortUrl: null,
        status: 0
      },
      twoDimensionalCodeForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        localCodeImageUrl: [
          {required: true, message: '请上传本地下载二维码图片', trigger: 'blur'}
        ],
        googleCodeImageUrl: [
          {required: true, message: '请上传谷歌商店二维码图片', trigger: 'blur'}
        ],
        shortUrl: [
          {required: true, message: '请填写短链地址', trigger: 'blur'}
        ]
      },
      activityUrl: `${process.env.API_ROOT}/upload-image-file`,
      headers: {
        'xxl_sso_sessionid': getToken(),
        'language': getLanguage()
      },
      dialogVisible: false
    }
  },
  methods: {
    handleLocalAvatarSuccess (res, file) {
      if (res.code === '200') {
        this.twoDimensionalCodeForm.localCodeImageUrl = res.data
      }
    },
    handleGoogleAvatarSuccess (res, file) {
      if (res.code === '200') {
        this.twoDimensionalCodeForm.googleCodeImageUrl = res.data
      }
    },
    openDialog () {
      this.twoDimensionalCodeForm = clone(this.twoDimensionalCodeInitForm)
    },
    closeDialog () {
      this.$refs['twoDimensionalCodeForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    handleLocalFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.twoDimensionalCodeForm.localCodeImageUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    handleGoogleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.twoDimensionalCodeForm.googleCodeImageUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    save: debounce(300, function () {
      this.$refs['twoDimensionalCodeForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/two-dimensional-code/save-or-update', this.twoDimensionalCodeForm)
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
