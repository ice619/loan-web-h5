<template>
  <div class="border">
    <el-dialog title="新增广告页" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="advertsPageForm" :rules="rules" ref="advertsPageForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="advertsPageForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户标签">
              <el-select v-model="advertsPageForm.userTag" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="生效客户端">
              <el-select v-model="advertsPageForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="屏幕类型">
              <el-select v-model="advertsPageForm.screenType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('screenTypes')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="版本号" prop="title">
              <el-input style="width: 672px;" v-model="advertsPageForm.versions" placeholder="版本号,多个以英文逗号分割"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="跳转链接">
              <el-input style="width: 672px" v-model="advertsPageForm.forwardUrl" placeholder="跳转链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="advertsPageForm.status" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停留时间(秒)">
              <el-input-number style="width: 217px" v-model="advertsPageForm.stayTime" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="配置时间">
              <el-date-picker v-model="advertsPageForm.configTime" type="datetimerange" range-separator="至" start-placeholder="开始时间"
                              end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="选择图片">
              <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-change="handleFilesChange">
                <img v-if="advertsPageForm.imageUrl" :src="advertsPageForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveAdvertsPage">提交</el-button>
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
  data () {
    return {
      advertsPageInitForm: {
        appName: 6,
        terminal: 0,
        userTag: 1,
        status: true,
        screenType: 1,
        imageUrl: '',
        versions: '',
        startTime: null,
        endTime: null,
        configTime: [],
        stayTime: 1,
        forwardUrl: ''
      },
      advertsPageForm: {},
      rules: {
        text: [
          { required: true, message: '请输入文本', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ]
      },
      actionUrl: `${process.env.API_ROOT}/management/upload-image-file`,
      showFrequencies: [{
        value: 1,
        label: 'value1'
      }]
    }
  },
  methods: {
    openDialog () {
      this.advertsPageForm = clone(this.advertsPageInitForm)
      const now = new Date()
      this.advertsPageForm.startTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.advertsPageForm.endTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
      this.advertsPageForm.configTime = [this.advertsPageForm.startTime, this.advertsPageForm.endTime]
    },
    closeDialog () {
      this.$refs['advertsPageForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    handleFilesExceed (response, file, fileList) {
      this.$message.error('上传文件超过限制，请先删除在重新上传!')
    },
    handleFilesChange (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'success') {
        this.advertsPageForm.imageUrl = file.response.data
      }
    },
    saveAdvertsPage: debounce(300, function () {
      if (this.advertsPageForm.startTime > this.advertsPageForm.endTime) {
        this.$message.error('开始时间要小于结束时间')
        return
      }
      this.$refs['advertsPageForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            if (this.advertsPageForm.configTime) {
              this.advertsPageForm.startTime = this.advertsPageForm.configTime[0]
              this.advertsPageForm.endTime = this.advertsPageForm.configTime[1]
            }
            const res = await this.$http.post('/management/adverts-page', this.advertsPageForm)
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
