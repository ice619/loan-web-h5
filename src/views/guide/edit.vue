<template>
  <div class="border">
    <el-dialog title="编辑引导页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="guideForm" :rules="rules" ref="guideForm" label-width="100px" class="demo-form-inline"  style="margin-left: 60px">
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="APP平台">
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
            <el-form-item label="状态:" >
              <el-radio-group v-model="guideForm.status" :value="guideForm.status">
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
              <el-button type="primary" @click="saveGuidePage">提交</el-button>
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
    'guidePage': Object,
    'terminals': Array
  },
  data () {
    return {
      guideForm: {},
      rules: {},
      picList: [],
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`
    }
  },
  methods: {
    openDialog () {
      this.guideForm = clone(this.guidePage)
      //        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      let fileList = []
      if (this.guideForm.pictureUrls) {
        let pics = this.guideForm.pictureUrls.split(',')
        for (let i = 0; i < pics.length; i++) {
          let pic = pics[i]
          let obj = {}
          // obj.name = i
          obj.url = pic
          let response = {}
          response.data = pic
          obj.response = response
          fileList[i] = obj
        }
      }
      this.picList = fileList
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
      let urls = ''
      if (fileList.length > 0) {
        for (const item of fileList) {
          urls += item.response.data
          urls += ','
        }
        urls = urls.substring(0, urls.length - 1)
      }
      this.guideForm.pictureUrls = urls
    },
    closeDialog () {
      this.$refs['guideForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveGuidePage: debounce(300, function () {
      this.$refs['guideForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            if (this.guideForm.versionLowerLimit > this.guideForm.versionUpperLimit) {
              this.$message.error('开始版本号不能大于结束版本号')
              return
            }
            const res = await this.$http.put('/config/guide-page', this.guideForm)
            if (res.code === '200') {
              this.$message.success('更新成功!')
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
