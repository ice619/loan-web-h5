<template>
  <div class="border">
    <el-dialog title="新增交易开关" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="100px" class="demo-form-inline" style="padding-left: 40px">
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="APP平台:" align="left">
              <el-select v-model="entryForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="开关类型:" align="left">
              <el-select v-model="entryForm.switchType" clearable placeholder="请选择" style="width: 400px" >
                <el-option v-for="item in $formatter.getSelectionOptions('switchTypes')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="版本号" prop="title">
              <el-input style="width: 129.250px;" v-model="entryForm.startVersion" placeholder="开始版本号"></el-input>
              <el-input style="width: 129.250px;" v-model="entryForm.endVersion" placeholder="结束版本号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="用户类型:">
              <el-select v-model="entryForm.userType" clearable >
                <el-option v-for="item in $formatter.getSelectionOptions('userTypes')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <el-form-item label="备注:">
              <el-input v-model="entryForm.remark" type="textarea" style="width: 400px;" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="30">
            <!--<el-form-item label="状态:">
              <el-radio-group v-model="entryForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>-->
            <el-form-item label="状态">
              <el-select v-model="entryForm.status" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" style="padding-top: 20px;padding-left: 50px">
          <el-col :span="30">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveVariable">提交</el-button>
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
  data: function () {
    return {
      actionUrl: `${process.env.API_ROOT}/management/upload-image-file`,
      entryFormInitForm: {
        id: '',
        appName: 7,
        switchType: '',
        startVersion: '',
        endVersion: '',
        userType: '',
        remark: '',
        status: true
      },
      entryForm: {},
      rules: {},
      dialogVisible: false,
      displayFlag: true
    }
  },
  methods: {
    openDialog () {
      this.entryForm = clone(this.entryFormInitForm)
    },
    closeDialog () {
      this.$refs['entryForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveVariable: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            if (this.entryForm.startVersion > this.entryForm.endVersion) {
              this.$message.error('开始版本号不能大于结束版本号')
              return
            }
            const res = await this.$http.post('/management/transaction-switch', this.entryForm)
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

<style lang="stylus" scoped="scoped">
  .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 330px;
    height: 500px;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
</style>
