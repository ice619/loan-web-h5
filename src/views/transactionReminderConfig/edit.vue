<template>
  <div class="border" style="width: 100%">
    <el-dialog title="修改交易提醒配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="transactionReminderConfigForm" :rules="rules" ref="transactionReminderConfigForm"
               label-width="100px"
               class="demo-form-inline">
        <el-input style="display: none" type="hidden" v-model="transactionReminderConfigForm.id"></el-input>
        <el-container>
          <el-aside width="300px" style="border: solid 1px black">
            <img v-if="transactionReminderConfigForm.imageUrl" :src="transactionReminderConfigForm.imageUrl" style="width: 100%;height: 502px;">
          </el-aside>
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用名称">
                  <el-select v-model="transactionReminderConfigForm.appName" clearable placeholder="请选择">
                    <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="配置类型">
                  <el-select v-model="transactionReminderConfigForm.configType" @change="changeConfigType" clearable placeholder="请选择">
                    <el-option v-for="item in globalConfig.configTypes" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="提示语">
                  <el-input v-model="transactionReminderConfigForm.hint" style="width: 217px;" placeholder="提示语"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="transactionReminderConfigForm.remark" style="width: 217px;" type="textarea"
                            :rows="5" placeholder="请输入备注"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="24">
                <el-form-item label="状态">
                  <el-radio-group v-model="transactionReminderConfigForm.status">
                    <el-radio :label="true">有效</el-radio>
                    <el-radio :label="false">无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="40">
                <el-form-item>
                  <el-button type="primary" @click="saveTransactionReminderConfig">提交</el-button>
                  <el-button @click="closeDialog">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
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
    'transactionReminderConfigWindow': Object
  },
  data () {
    return {
      transactionReminderConfigForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.transactionReminderConfigForm = clone(this.transactionReminderConfigWindow)
      this.transactionReminderConfigForm.imageUrl = this.configTypeImages('', '', this.transactionReminderConfigForm.configType)
    },
    closeDialog () {
      this.$refs['transactionReminderConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    changeConfigType () {
      this.transactionReminderConfigForm.imageUrl = this.configTypeImages('', '', this.transactionReminderConfigForm.configType)
    },
    saveTransactionReminderConfig: debounce(300, function () {
      this.$refs['transactionReminderConfigForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            const res = await this.$http.post('/config/transaction/reminder/config', this.transactionReminderConfigForm)
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
