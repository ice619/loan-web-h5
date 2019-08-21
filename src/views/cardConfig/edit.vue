<template>
  <div class="border" style="width: 100%">
    <el-dialog title="证件配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="cardConfigForm" :rules="rules" ref="cardConfigForm" label-width="150px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="证件名称" prop="cardName">
              <el-input type="text" v-model="cardConfigForm.cardName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="最小位数校验">
              <el-input type="number" v-model="cardConfigForm.minFigureCheck" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="最大位数校验">
              <el-input type="number" v-model="cardConfigForm.maxFigureCheck" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="字符形式">
              <el-select v-model="cardConfigForm.charType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('charType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="示例图:" prop="demoImgUrl">
              <el-upload
                :headers = "headers"
                class="avatar-uploader"
                :action="activityUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="cardConfigForm.demoImgUrl" :src="cardConfigForm.demoImgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="cardConfigForm.remark" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">提交</el-button>
              <el-button @click="closeDialog">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>`
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
    'cardObj': Object
  },
  data () {
    return {
      cardConfigForm: {},
      rules: {
        cardName: [
          {required: true, message: '请输入证件名称', trigger: 'blur'}
        ],
        demoImgUrl: [
          {required: true, message: '请上传示例图', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.code === '200') {
        this.cardConfigForm.iconUrl = res.data
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
        this.cardConfigForm.iconUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    openDialog () {
      this.cardConfigForm = clone(this.cardConfigInitForm)
    },
    closeDialog () {
      this.$refs['cardConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    save: debounce(300, function () {
      this.$refs['cardConfigForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/card-config/save-or-update', this.cardConfigForm)
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
