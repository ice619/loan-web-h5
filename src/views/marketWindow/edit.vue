<template>
  <div class="border">
    <el-dialog title="修改运营弹窗" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="marketWindowForm" :rules="rules" ref="marketWindowForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="marketWindowForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效终端">
              <el-select v-model="marketWindowForm.terminal" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.terminals" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="用户标签">
              <el-select v-model="marketWindowForm.userTag" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.userTags" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示频率">
              <el-select v-model="marketWindowForm.showFrequency" clearable placeholder="请选择">
                <el-option v-for="item in showFrequencies" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input style="width: 217px" v-model="marketWindowForm.title" placeholder="标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级">
              <el-input-number style="width: 217px" v-model="marketWindowForm.priority" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="版本号下限">
              <el-select style="width: 107px;" v-model="marketWindowForm.versionLowerLimit" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.versions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
              <el-select style="width: 107px;" v-model="marketWindowForm.versionUpperLimit" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.versions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="弹窗链接">
              <el-input style="width: 217px" v-model="marketWindowForm.popUrl" placeholder="弹窗链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker style="width: 217px" v-model="marketWindowForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker style="width: 217px" v-model="marketWindowForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="弹框位置">
              <el-select v-model="marketWindowForm.popPosition" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.positions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="marketWindowForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
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
          <el-col :span="12"></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveMarketWindow">提交</el-button>
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
    'marketWindow': Object
  },
  data () {
    return {
      marketWindowForm: {},
      rules: {},
      actionUrl: `${process.env.API_ROOT}/config/upload-image-file`,
      showFrequencies: [{
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
