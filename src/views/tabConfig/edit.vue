<template>
  <div class="border">
    <el-dialog title="Tab页配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="tabFrom" :rules="rules" ref="tabFrom" label-width="130px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="APP名称:" prop="appName">
              <el-select v-model="tabFrom.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="Tab页名称:" prop="tabType">
              <el-select v-model="tabFrom.tabType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('tabType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="默认首页:" prop="defaultFirst">
              <el-radio-group v-model="tabFrom.defaultFirst">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="上传选中Icon:" prop="selectIconUrl">
              <el-upload
                :headers = "headers"
                class="avatar-uploader"
                :action="activityUrl"
                :show-file-list="false"
                :on-success="handleAvatarSelectSuccess">
                <img v-if="tabFrom.selectIconUrl" :src="tabFrom.selectIconUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="上传未选中Icon:" prop="iconUrl">
              <el-upload
                :headers = "headers"
                class="avatar-uploader"
                :action="activityUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="tabFrom.iconUrl" :src="tabFrom.iconUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
    'ifshow': Boolean,
    'tab': Object
  },
  data () {
    return {
      tabFrom: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        tabType: [
          {required: true, message: '请选择Tab页名称', trigger: 'blur'}
        ],
        iconUrl: [
          {required: true, message: '上传icon图标', trigger: 'blur'}
        ],
        selectIconUrl: [
          {required: true, message: '上传选中Icon图标', trigger: 'blur'}
        ]
      },
      activityUrl: `${process.env.API_ROOT}/upload-image-file`,
      headers: {
        'xxl_sso_sessionid': getToken(),
        'language': getLanguage()
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.code === '200') {
        this.tabFrom.iconUrl = res.data
      }
    },
    handleAvatarSelectSuccess (res, file) {
      if (res.code === '200') {
        this.tabFrom.selectIconUrl = res.data
      }
    },
    handleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.tabFrom.iconUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    handleSelectFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.tabFrom.selectIconUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    openDialog () {
      this.tabFrom = clone(this.tab)
    },
    closeDialog () {
      this.$refs['tabFrom'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['tabFrom'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/tab-config/save-or-update', this.tabFrom)
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
