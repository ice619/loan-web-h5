<template>
  <div class="border">
    <el-dialog title="新增IOS企业签" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="iosCompanySignForm" :rules="rules" ref="iosCompanySignForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="手机系统">
              <el-input v-model="iosCompanySignForm.osType" style="width: 217px;" readonly placeholder="手机系统"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="下载链接key">
              <el-input v-model="iosCompanySignForm.urlKey" style="width: 217px;" clearable placeholder="下载链接key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40" >
            <el-form-item label="下载链接">
              <el-input v-model="iosCompanySignForm.url" style="width: 217px;" clearable placeholder="下载链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="优先级">
              <el-input-number v-model="iosCompanySignForm.priority" style="width: 217px;" controls-position="right" :min="1" :max="2147483647"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="应用名称">
              <el-select v-model="iosCompanySignForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="40" justify="center">
            <el-form-item label="备注说明">
              <el-input v-model="iosCompanySignForm.remark" style="width: 217px;" clearable placeholder="备注说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <!--<el-form-item label="状态">
              <el-radio-group v-model="iosCompanySignForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>-->
            <el-form-item label="状态">
              <el-select style="width: 217px;" v-model="iosCompanySignForm.status" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveIosCompanySign">提交</el-button>
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
      iosCompanySignInitForm: {
        osType: 'IOS',
        urlKey: '',
        url: '',
        priority: 1,
        appName: 7,
        remark: '',
        status: true
      },
      iosCompanySignForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.iosCompanySignForm = clone(this.iosCompanySignInitForm)
    },
    closeDialog () {
      this.$refs['iosCompanySignForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveIosCompanySign: debounce(300, function () {
      // this.$refs['iosCompanySignForm'].validate((valid) => {
      //   if (valid) {
      //     this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
      //     }).catch(() => {
      //     })
      //   }
      // })
      this.$refs['iosCompanySignForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/ios-company-sign', this.iosCompanySignForm)
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
</style>
