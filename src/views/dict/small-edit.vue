<template>
  <div class="border">
    <el-dialog :title="dictSmall ? '更新小类' : '新增小类'" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" append-to-body>
      <el-form :inline="true" :model="dictSmallForm" :rules="rules" ref="dictSmallForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="小类编码">
              <el-input v-model="dictSmallForm.dicSmallCode" placeholder="小类编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="小类中文名称">
              <el-input v-model="dictSmallForm.dicSmallValue" placeholder="小类中文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="小类使用状态" style="margin-left: -156px;">
              <el-switch v-model="dictSmallForm.dicSmallStaues" active-value="1" inactive-value="2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="排序" style="margin-left: -20px;">
              <el-input-number v-model="dictSmallForm.sortNum" controls-position="right" :min="1" :max="99"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveDictSmall">确定</el-button>
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
    'dictBigId': Number,
    'dictSmall': Object
  },
  data () {
    return {
      dictSmallInitForm: {
        dicSmallCode: '',
        dicSmallValue: '',
        dicSmallStaues: '1',
        sortNum: 1
      },
      dictSmallForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.dictSmallForm = clone(this.dictSmall ? this.dictSmall : this.dictSmallInitForm)
      this.dictSmallForm.dictBigId = this.dictBigId
    },
    closeDialog () {
      this.$refs['dictSmallForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveDictSmall: debounce(300, function () {
      // this.$refs['dictSmallForm'].validate((valid) => {
      //   if (valid) {
      //     this.$confirm('确认更新吗？', '提示', {type: 'warning'}).then(async () => {
      //     }).catch(() => {
      //     })
      //   }
      // })
      this.$refs['dictSmallForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = this.dictSmall ? (await this.$http.put('/config/dict-small', this.dictSmallForm))
              : (await this.$http.post('/config/dict-small', this.dictSmallForm))
            if (res.code === '200') {
              this.$message.success(`【${this.dictSmall ? '更新' : '新增'}】操作成功!`)
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
