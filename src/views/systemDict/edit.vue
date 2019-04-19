<template>
  <div class="border">
    <el-dialog :title="systemDict ? '编辑' : '新增'" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="systemDictForm" :rules="rules" ref="systemDictForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="应用名称">
              <el-select style="width: 372px;" v-model="systemDictForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="编码">
              <el-input style="width: 372px;" v-model="systemDictForm.code" placeholder="编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="名称/标题/值">
              <el-input style="width: 372px;" v-model="systemDictForm.value" placeholder="名称/标题/值"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input style="width: 372px;" v-model="systemDictForm.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="状态" style="margin-left: -155px;">
              <el-select v-model="systemDictForm.state" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('dictStates')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveSystemDict">提交</el-button>
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
    'systemDict': Object
  },
  data () {
    return {
      systemDictInitForm: {
        parent: 0,
        appName: 7,
        code: '',
        value: '',
        state: 1,
        remark: '',
        flag: 1
      },
      systemDictForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.systemDictForm = clone(this.systemDict ? this.systemDict : this.systemDictInitForm)
    },
    closeDialog () {
      this.$refs['systemDictForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveSystemDict: debounce(300, function () {
      // this.$refs['systemDictForm'].validate((valid) => {
      //   if (valid) {
      //     this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
      //     }).catch(() => {
      //     })
      //   }
      // })
      this.$refs['systemDictForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = this.systemDict ? (await this.$http.put('/management/system-dict', this.systemDictForm))
              : (await this.$http.post('/management/system-dict', this.systemDictForm))
            if (res.code === '200') {
              this.$message.success(`【${this.systemDict ? '更新' : '新增'}】操作成功!`)
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
