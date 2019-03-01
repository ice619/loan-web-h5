<template>
  <div class="border">
    <el-dialog title="新增运营弹窗" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="marketWindowForm" :rules="rules" ref="marketWindowForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="marketWindowForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效终端">
              <el-select v-model="marketWindowForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('terminals')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="用户标签">
              <el-select v-model="marketWindowForm.userTag" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级">
              <el-input-number style="width: 217px" v-model="marketWindowForm.priority" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input style="width: 672px;" v-model="marketWindowForm.title" placeholder="标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="弹窗链接">
              <el-input style="width: 672px" v-model="marketWindowForm.popUrl" placeholder="弹窗链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
              <el-form-item label="版本号" prop="title">
                <el-input style="width: 129.250px;" v-model="advertsPageForm.startVersion" placeholder="开始版本号"></el-input>
                <el-input style="width: 129.250px;" v-model="advertsPageForm.endVersion" placeholder="结束版本号"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="弹框位置">
              <el-select v-model="marketWindowForm.popPosition" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('marketPositions')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker style="width: 217px" v-model="marketWindowForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker style="width: 217px" v-model="marketWindowForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <!--<el-form-item label="状态">
              <el-radio-group v-model="marketWindowForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>-->
            <el-form-item label="状态">
              <el-select v-model="marketWindowForm.status" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="弹窗图片">
              <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-change="handleFilesChange">
                <img v-if="marketWindowForm.imageUrl" :src="marketWindowForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveMarketWindow">提交</el-button>
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
      marketWindowInitForm: {
        appName: 6,
        terminal: 1,
        userTag: 1,
        showFrequency: 1,
        title: '',
        priority: 1,
        versionLowerLimit: null,
        versionUpperLimit: null,
        popUrl: '',
        startTime: null,
        endTime: null,
        popPosition: '',
        imageUrl: '',
        status: true
      },
      marketWindowForm: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
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
      this.marketWindowForm = clone(this.marketWindowInitForm)
    },
    closeDialog () {
      this.$refs['marketWindowForm'].resetFields()
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
        this.marketWindowForm.imageUrl = file.response.data
      }
    },
    saveMarketWindow: debounce(300, function () {
      if (this.marketWindowForm.versionLowerLimit > this.marketWindowForm.versionUpperLimit) {
        this.$message.error('开始版本要小于结束版本')
        return
      }
      if (this.marketWindowForm.startTime > this.marketWindowForm.endTime) {
        this.$message.error('开始时间要小于结束时间')
        return
      }
      this.$refs['marketWindowForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            this.marketWindowForm.showFrequency = 0
            const res = await this.$http.post('/management/market-window', this.marketWindowForm)
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
