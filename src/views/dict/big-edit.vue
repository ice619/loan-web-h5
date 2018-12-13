<template>
  <div class="border">
    <el-dialog :title="dictBig ? '编辑大类' : '新增大类'" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="dictBigForm" :rules="rules" ref="dictBigForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="大类编码">
              <el-input v-model="dictBigForm.dicBigCode" placeholder="大类编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="大类中文名称">
              <el-input v-model="dictBigForm.dicBigValue" placeholder="大类中文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="大类使用状态" style="margin-left: -156px;">
              <el-switch v-model="dictBigForm.dicBigStaues" active-value="1" inactive-value="2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input v-model="dictBigForm.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button type="primary" @click="saveDictBig">提交</el-button>
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
    'dictBig': Object
  },
  data () {
    return {
      dictBigInitForm: {
        dicBigCode: '',
        dicBigValue: '',
        dicBigStaues: '1',
        remark: ''
      },
      dictBigForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.dictBigForm = clone(this.dictBig ? this.dictBig : this.dictBigInitForm)
    },
    closeDialog () {
      this.$refs['dictBigForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveDictBig: debounce(300, function () {
      // this.$refs['dictBigForm'].validate((valid) => {
      //   if (valid) {
      //     this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
      //     }).catch(() => {
      //     })
      //   }
      // })
      this.$refs['dictBigForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = this.dictBig ? (await this.$http.put('/management/dict-big', this.dictBigForm))
              : (await this.$http.post('/management/dict-big', this.dictBigForm))
            if (res.code === '200') {
              this.$message.success(`【${this.dictBig ? '更新' : '新增'}】操作成功!`)
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
