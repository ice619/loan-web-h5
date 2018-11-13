<template>
  <div class="border">
    <el-dialog title="更新运营弹窗" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="marketWindowForm" :rules="rules" ref="marketWindowForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="应用名称">
              <el-select v-model="marketWindowForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="生效终端">
              <el-select v-model="marketWindowForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in terminals" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="用户标签">
              <el-select v-model="marketWindowForm.userTag" clearable placeholder="请选择">
                <el-option v-for="item in userTags" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="显示频率">
              <el-select v-model="marketWindowForm.showFrequency" clearable placeholder="请选择">
                <el-option v-for="item in showFrequencies" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="标题">
              <el-input v-model="marketWindowForm.title" placeholder="标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="优先级">
              <el-input-number v-model="marketWindowForm.priority" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="版本号">
              <el-select v-model="marketWindowForm.judge" clearable placeholder="请选择">
                <el-option v-for="item in judges" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-input v-model="marketWindowForm.version" placeholder="版本号"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="弹窗链接">
              <el-input v-model="marketWindowForm.popUrl" placeholder="弹窗链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="开始时间">
              <el-date-picker v-model="marketWindowForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="结束时间">
              <el-date-picker v-model="marketWindowForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="弹框位置">
              <el-select v-model="marketWindowForm.popPosition" clearable placeholder="请选择">
                <el-option v-for="item in popPositions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="状态">
              <el-switch style="margin: 10px;" v-model="marketWindowForm.status" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="弹窗图片">
              <el-row type="flex" justify="center">
                <el-col :span="40">
                  <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-change="handleFilesChange">
                    <img v-if="marketWindowForm.imageUrl" :src="marketWindowForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveMarketWindow">确定</el-button>
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
    'marketWindow': Object
  },
  data () {
    return {
      marketWindowForm: {},
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`,
      terminals: [{
        value: 1,
        label: 'value1'
      }, {
        value: 2,
        label: 'value2'
      }],
      userTags: [{
        value: 1,
        label: 'value1'
      }, {
        value: 2,
        label: 'value2'
      }],
      showFrequencies: [{
        value: 1,
        label: 'value1'
      }, {
        value: 2,
        label: 'value2'
      }],
      judges: [{
        value: 1,
        label: 'value1'
      }, {
        value: 2,
        label: 'value2'
      }],
      popPositions: [{
        value: 1,
        label: 'value1'
      }, {
        value: 2,
        label: 'value2'
      }]
    }
  },
  methods: {
    openDialog () {
      this.marketWindowForm = clone(this.marketWindow)
      console.log(JSON.stringify(this.marketWindowForm))
    },
    closeDialog () {
      this.$refs['marketWindowForm'].resetFields()
      this.$emit('handleCloseDialog')
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
      this.$refs['marketWindowForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            const res = await this.$http.put('/config/market-window-web', this.marketWindowForm)
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
