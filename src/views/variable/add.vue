<template>
  <div class="border">
    <el-dialog title="新增变量" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="variableForm" :rules="rules" ref="variableForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="变量名称">
              <el-input v-model="variableForm.name" placeholder="变量名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="30">
            <el-form-item label="变量描述">
              <el-input v-model="variableForm.description" placeholder="变量描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="变量类型">
              <el-input v-model="variableForm.dataType" placeholder="变量类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="30">
            <el-form-item label="变量所属域">
              <el-input v-model="variableForm.domain" placeholder="变量所属域"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="变量征信源">
              <el-select v-model="variableForm.creditAgency" clearable placeholder="请选择">
                <el-option v-for="item in globalConfig.creditAgencys" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="30" justify="center">
            <el-form-item label="变量版本号">
              <el-input v-model="variableForm.version" placeholder="变量版本号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item label="变量状态">
              <el-switch style="margin: 10px;" v-model="variableForm.status" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="30">
            <el-form-item>
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveVariable">确定</el-button>
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
      variableInitForm: {
        name: '',
        description: '',
        dataType: '',
        domain: '',
        creditAgency: 1,
        version: '',
        status: true
      },
      variableForm: {},
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.variableForm = clone(this.variableInitForm)
    },
    closeDialog () {
      this.$refs['variableForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveVariable: debounce(300, function () {
      this.$refs['variableForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确认新增吗？')
            .then(async () => {
              try {
                const res = await this.$http.post('/variables', this.variableForm)
                if (res.code === '200') {
                  this.$message.success('新增成功!')
                  this.closeDialog()
                } else {
                  this.$message.error(res.message)
                }
              } catch (err) {
                console.error(err)
              }
            })
            .catch(() => {})
        }
      })
    })
  }
}
</script>

<style scoped lang="stylus">
</style>
