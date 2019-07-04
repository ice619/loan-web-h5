<template>
  <div class="border">
    <el-dialog title="编辑市场渠道" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="45%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="投放渠道" prop="remark">
              <el-input v-model="entryForm.channel" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="entryForm.remark" rows="4" placeholder="请输入备注" clearable style="width: 350px"/>
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
    'ifshow': Boolean,
    'entry': Object
  },
  data () {
    return {
      entryFormInitForm: {
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
      this.entryForm = clone(this.entry)
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
            const res = await this.$http.put('/market-channel', this.entryForm)
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
