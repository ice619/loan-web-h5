<template>
  <div class="border" style="width: 100%">
    <el-dialog title="新增交易提醒配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="transactionReminderConfigForm" :rules="rules" ref="transactionReminderConfigForm"
               label-width="100px"
               class="demo-form-inline">
        <el-container>
          <el-aside width="300px" style="border: solid 1px black">
            <img v-if="transactionReminderConfigForm.imageUrl" :src="transactionReminderConfigForm.imageUrl" style="width: 100%;height: 502px;">
          </el-aside>
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-form-item label="APP名称">
                  <el-select v-model="transactionReminderConfigForm.appName" clearable placeholder="请选择">
                    <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="配置类型">
                  <el-select v-model="transactionReminderConfigForm.configType" @change="changeConfigType" clearable placeholder="请选择">
                    <el-option v-for="item in $formatter.getSelectionOptions('configTypes')" :key="item.value" :label="item.label"
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
                <!--<el-form-item label="状态">
                  <el-radio-group v-model="transactionReminderConfigForm.status">
                    <el-radio :label="true">有效</el-radio>
                    <el-radio :label="false">无效</el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <el-form-item label="状态">
                  <el-select v-model="transactionReminderConfigForm.status" clearable placeholder="请选择">
                    <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="40">
                <el-form-item>
                  <el-button style="color: white;background-color: #009688;" type="primary" @click="saveTransactionReminderConfig">提交</el-button>
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
    'ifshow': Boolean
  },
  data () {
    return {
      transactionReminderConfigFormInitForm: {
        imageUrl: '',
        appName: 7,
        configType: '',
        hint: '',
        remark: '',
        status: true
      },
      sort: 1,
      transactionReminderConfigForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.transactionReminderConfigForm = clone(this.transactionReminderConfigFormInitForm)
    },
    closeDialog () {
      this.$refs['transactionReminderConfigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    changeConfigType () {
      this.transactionReminderConfigForm.imageUrl = this.$formatter.simpleFormatSelection('configTypeImages', this.transactionReminderConfigForm.configType)
    },
    saveTransactionReminderConfig: debounce(300, function () {
      this.$refs['transactionReminderConfigForm'].validate(async (valid) => {
        // if (valid) {
        //   this.$confirm('确认新增吗？', '提示', {type: 'warning'}).then(async () => {
        //   }).catch(() => {
        //   })
        // }
        if (valid) {
          try {
            const res = await this.$http.post('/management/transaction-reminder', this.transactionReminderConfigForm)
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

<style scoped>

</style>
