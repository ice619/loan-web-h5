<template>
  <div class="border">
    <el-dialog title="编辑消息模板" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="noticeTemplateForm" :rules="rules" ref="noticeTemplateForm" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-select v-model="noticeTemplateForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息模板类型">
              <el-select v-model="noticeTemplateForm.type" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('noticeTemplateTypes')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="业务名称">
              <el-input v-model="noticeTemplateForm.businessName" clearable placeholder="业务名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务id">
              <el-input v-model="noticeTemplateForm.businessId" clearable placeholder="业务id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="状态">
              <el-select v-model="noticeTemplateForm.status" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="模板内容">
              <el-input v-model="noticeTemplateForm.template" type="textarea" cols="70" rows="7" clearable placeholder="模板内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveNoticeTemplate">提交</el-button>
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
    'noticeTemplate': Object
  },
  data () {
    return {
      configTime: [],
      noticeTemplateInitForm: {
        appName: 6,
        businessName: null,
        businessId: null,
        type: null,
        template: null,
        status: null
      },
      noticeTemplateForm: {},
      rules: {
        text: [
          { required: true, message: '请输入文本', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.noticeTemplateForm = clone(this.noticeTemplate)
    },
    closeDialog () {
      this.$refs['noticeTemplateForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveNoticeTemplate: debounce(300, function () {
      if (this.noticeTemplateForm.startTime > this.noticeTemplateForm.endTime) {
        this.$message.error('开始时间要小于结束时间')
        return
      }
      this.$refs['noticeTemplateForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            if (this.configTime && this.configTime.length > 0) {
              this.noticeTemplateForm.startTime = this.configTime[0]
              this.noticeTemplateForm.endTime = this.configTime[1]
            }
            const res = await this.$http.put('/management/notice-template', this.noticeTemplateForm)
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
</style>
