<template>
  <div class="border">
    <el-dialog title="新增引导页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="40%">
      <el-form :inline="true" :model="guideForm" :rules="rules" ref="guideForm" label-width="100px" class="demo-form-inline">
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
                <el-option v-for="item in terminals" :key="item.value" :label="item.label" :value="item.value"/>
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
              <el-input placeholder="请输入生效版本" v-model="guideForm.version" class="input-with-select" style="float: left">
                <el-select v-model="guideForm.judge" slot="prepend" placeholder="请选择" style="width: 80px">
                  <el-option v-for="item in judges" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-input>
              <div style="float: left">非必选，不选则通用</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="是否支持跳过:">
              <el-radio-group v-model="guideForm.skip">
                <el-radio label="true">支持</el-radio>
                <el-radio label="false">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="状态:">
              <el-radio-group v-model="guideForm.status">
                <el-radio label="true">有效</el-radio>
                <el-radio label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-upload
              class="upload-demo"
              :action="actionUrl"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="picList"
              :limit="5"
              list-type="picture">
              <el-button size="small" type="primary">上传图片</el-button>
              <span slot="tip" class="el-upload__tip">最多上传五张引导图</span>
            </el-upload>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="padding-top: 20px">
          <el-col :span="30">
            <el-form-item>
              <el-button type="primary" @click="saveVariable">提交</el-button>
              <el-button @click="closeDialog">重置</el-button>
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
    'judges': Array,
    'terminals': Array
  },
  data: function () {
    return {
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`,
      guideFormInitForm: {
        id: '',
        appName: '',
        terminal: '',
        title: '',
        judge: '',
        version: '',
        skip: 'true',
        pictureUrls: '',
        status: 'false'
      },
      guideForm: {},
      rules: {},
      picList: []
    }
  },
  methods: {
    openDialog () {
      this.guideForm = clone(this.guideFormInitForm)
    },
    handleRemove (file, fileList) {
      this.urlHandler(fileList)
    },
    handleSuccess (response, file, fileList) {
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
