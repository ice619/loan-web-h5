<template>
  <div class="border">
    <el-dialog :title="dictBig ? '编辑大类' : '新增大类'" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="28%">
      <el-form :inline="true" :model="dictBigForm" :rules="rules" ref="dictBigForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="所属系统：" prop="systemCode" :rules="[{ required: true, message: '请选择所属系统', trigger: 'change' }]">
              <el-select v-model="dictBigForm.systemCode" placeholder="所属系统" style="width: 250px;">
                <el-option v-for="item in $formatter.getSelectionOptions('systemCode')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="大类编码">
              <el-input v-model="dictBigForm.dicBigCode" placeholder="大类编码" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="大类中文名称">
              <el-input v-model="dictBigForm.dicBigValue" placeholder="大类中文名称" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="40">
            <el-form-item label="备注">
              <el-input v-model="dictBigForm.remark" placeholder="备注" style="width: 250px;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="25">
            <el-form-item label="大类状态">
              <el-radio-group v-model="dictBigForm.status">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveDictBig">提交</el-button>
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
        systemCode: 'common',
        dicBigCode: '',
        dicBigValue: '',
        status: 1,
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
      this.$refs['dictBigForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = this.dictBig ? (await this.$http.put('/dict-big', this.dictBigForm))
              : (await this.$http.post('/dict-big', this.dictBigForm))
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
