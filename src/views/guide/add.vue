<template>
  <div class="border">
    <el-dialog title="新增引导页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="guideForm" :rules="rules" ref="guideForm" label-width="100px" class="demo-form-inline" style="margin-left: 60px">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="APP平台:" align="left">
              <el-select v-model="guideForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="生效终端:">
              <el-select v-model="guideForm.terminal" clearable >
                <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="标题:">
              <el-input v-model="guideForm.title" style="width: 400px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="生效版本:" >
              <el-select v-model="guideForm.versionLowerLimit" clearable style="width: 120px">
                <el-option v-for="item in globalConfig.versions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
              <el-select v-model="guideForm.versionUpperLimit" clearable style="width: 120px">
                <el-option v-for="item in globalConfig.versions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="是否支持跳过:">
              <el-radio-group v-model="guideForm.skip">
                <el-radio :label="true">支持</el-radio>
                <el-radio :label="false">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="状态:">
              <el-radio-group v-model="guideForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="padding-left: 50px">
          <el-col :span="30">
            <el-upload
              ref="upload"
              class="upload-demo"
              :action="actionUrl"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              :file-list="picList"
              :limit="5"
              list-type="picture">
              <el-button size="small" type="primary">上传图片</el-button>
              <span slot="tip" class="el-upload__tip">最多上传五张引导图</span>
            </el-upload>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="padding-top: 20px;padding-left: 50px">
          <el-col :span="30">
            <el-form-item>
              <el-button type="primary" @click="saveVariable">提交</el-button>
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
    'ifshow': Boolean
  },
  data: function () {
    return {
      actionUrl: `${process.env.API_ROOT}/management/upload-image-file`,
      guideFormInitForm: {
        id: '',
        appName: 7,
        terminal: '',
        title: '',
        versionLowerLimit: '',
        versionUpperLimit: '',
        skip: true,
        pictureUrls: '',
        status: false
      },
      guideForm: {},
      rules: {},
      picList: []
    }
  },
  methods: {
    openDialog () {
      this.guideForm = clone(this.guideFormInitForm)
      this.picList = []
    },
    handleRemove (file, fileList) {
      this.urlHandler(fileList)
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多上传5张图片',
        type: 'warning',
        duration: 2000
      })
    },
    handleSuccess (response, file, fileList) {
      if (response.code !== '200') {
        this.$message.error('上传失败！' + response.message)
        this.$refs.upload.clearFiles()
        return
      } else {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
      }
      this.urlHandler(fileList)
    },
    urlHandler (fileList) {
      let url = ''
      if (fileList.length > 0) {
        for (const item of fileList) {
          url += item.response.data
          url += ','
        }
        url = url.substring(0, url.length - 1)
      }
      this.guideForm.pictureUrls = url
    },
    closeDialog () {
      this.$refs['guideForm'].resetFields()
      this.picList = []
      this.$emit('handleCloseDialog')
    },
    saveVariable: debounce(300, function () {
      this.$refs['guideForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            if (this.guideForm.versionLowerLimit > this.guideForm.versionUpperLimit) {
              this.$message.error('开始版本号不能大于结束版本号')
              return
            }
            const res = await this.$http.post('/config/guide-page', this.guideForm)
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

<style scoped lang="stylus">
</style>
