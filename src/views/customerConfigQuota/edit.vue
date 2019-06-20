<template>
  <div class="border">
    <el-dialog title="额度配置" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="quotaPageForm" :rules="rules" ref="quotaPageForm" label-width="100px" class="demo-form-inline">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="APP名称:" prop="appName">
              <el-select v-model="quotaPageForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="生效用户:" prop="userType">
              <el-select v-model="quotaPageForm.userType" clearable placeholder="请选择状态">
                <el-option v-for="item in $formatter.getSelectionOptions('userTag')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="默认额度:" prop="defaultQuota">
              <el-input type="number" v-model="quotaPageForm.defaultQuota"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="状态:" prop="status">
              <el-radio-group v-model="quotaPageForm.status">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">失效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveTipPage">提交</el-button>
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
    'quota': Object
  },
  data () {
    return {
      quotaPageForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ],
        userType: [
          {required: true, message: '请选择生效用户', trigger: 'blur'}
        ],
        defaultQuota: [
          {required: true, message: '请输入默认额度', trigger: 'blur'},
          { min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.quotaPageForm = clone(this.quota)
    },
    closeDialog () {
      this.$refs['quotaPageForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveTipPage: debounce(300, function () {
      this.$refs['quotaPageForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.put('/app-config/customer-config-quota', this.quotaPageForm)
            if (res.code === '200') {
              this.$message.success('编辑成功!')
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
