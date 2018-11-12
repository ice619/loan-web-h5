<template>
  <div class="border">
    <el-dialog title="更新IOS企业签" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="iosCompanySignForm" :rules="rules" ref="iosCompanySignForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="手机系统">
              <el-input v-model="iosCompanySignForm.osType" placeholder="手机系统"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="下载链接key">
              <el-input v-model="iosCompanySignForm.urlKey" placeholder="下载链接key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="下载链接">
              <el-input v-model="iosCompanySignForm.url" placeholder="下载链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="优先级">
              <el-input-number v-model="iosCompanySignForm.priority" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="应用号">
              <el-select v-model="iosCompanySignForm.appNum" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="40" justify="center">
            <el-form-item label="备注说明">
              <el-input v-model="iosCompanySignForm.remark" placeholder="备注说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="状态">
              <el-switch style="margin: 10px;" v-model="iosCompanySignForm.status" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item>
              <el-input v-model="iosCompanySignForm.id" type="hidden"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveIosCompanySign">确定</el-button>
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
    'iosCompanySign': Object
  },
  data () {
    return {
      iosCompanySignForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.iosCompanySignForm = clone(this.iosCompanySign)
    },
    closeDialog () {
      this.$refs['iosCompanySignForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveIosCompanySign: debounce(300, function () {
      // this.$refs['iosCompanySignForm'].validate((valid) => {
      //   if (valid) {
      //     this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
      //     }).catch(() => {
      //     })
      //   }
      // })
      this.$refs['iosCompanySignForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.put('/config/ios-company-sign', this.iosCompanySignForm)
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
</style>
