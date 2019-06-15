<template>
  <div class="border">
    <el-dialog :title="dictSmall ? '编辑小类' : '新增小类'" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" append-to-body width="28%">
      <el-form :inline="true" :model="dictSmallForm" :rules="rules" ref="dictSmallForm" label-width="150px" class="demo-form-inline">
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="小类编码">
              <el-input v-model="dictSmallForm.dicSmallCode" placeholder="小类编码" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="小类值">
              <el-input v-model="dictSmallForm.dicSmallValue" placeholder="小类值" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="排序">
              <el-input-number v-model="dictSmallForm.sortNum" controls-position="left" :min="1" :max="99" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="使用状态">
              <el-radio-group v-model="dictSmallForm.status">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveDictSmall">提交</el-button>
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
    'dictBig': Object,
    'dictSmall': Object,
    'language': String
  },
  data () {
    return {
      dictSmallInitForm: {
        dicSmallCode: '',
        dicSmallValue: '',
        status: 1,
        sortNum: 1
      },
      dictSmallForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.dictSmallForm = clone(this.dictSmall ? this.dictSmall : this.dictSmallInitForm)
      this.dictSmallForm.dictBigId = this.dictBig.id
      this.dictSmallForm.language = this.language
    },
    closeDialog () {
      this.$refs['dictSmallForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveDictSmall: debounce(300, function () {
      this.$refs['dictSmallForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = this.dictSmall ? (await this.$http.put('/dict-small', this.dictSmallForm))
              : (await this.$http.post('/dict-small', this.dictSmallForm))
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
