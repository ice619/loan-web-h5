<template>
  <div class="border" style="width: 100%; margin-top: 100px;">
    <!--<el-dialog title="新增" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">-->
      <el-form :inline="true" :model="faceLevelConfigForm" :rules="rules" ref="faceLevelConfigForm" label-width="150px"
               class="demo-form-inline">
        <el-row  type="flex" justify="center">
          <el-col :span="40">
            <el-form-item label="活体分阈值" prop="livenessScore">
              <el-input type="number" v-model="faceLevelConfigForm.livenessScore" clearable placeholder="0~100分,越高通过率越低"/>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="人脸比对相似度阈值" prop="similarity">
              <el-input type="number" v-model="faceLevelConfigForm.similarity" clearable placeholder="0~100分,越高通过率越低"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" @click="save">保存</el-button>
              <!--<el-button @click="closeDialog">返回</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <!--</el-dialog>-->
  </div>
</template>

<script>
import debounce from 'throttle-debounce/debounce'
// import {clone} from '@/utils/common'

export default {
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      faceLevelConfigInitForm: {
        // appName: this.GLOBAL.appName,
        livenessScore: null,
        similarity: null,
        state: 2
      },
      faceLevelConfigForm: {},
      rules: {
        livenessScore: [
          {required: true, message: '请输入活体分阈值', trigger: 'blur'},
          {min: 0.00, max: 100.00, message: '请输入正确的数值', trigger: 'blur'}
        ],
        similarity: [
          {required: true, message: '请输入人脸比对相似度阈值', trigger: 'blur'},
          {min: 0.00, max: 100.00, message: '请输入正确的数值', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.list()
  },
  methods: {
    // openDialog () {
    //   this.faceLevelConfigForm = clone(this.faceLevelConfigInitForm)
    // },
    // closeDialog () {
    //   this.$refs['faceLevelConfigForm'].resetFields()
    //   this.$emit('handleCloseDialog')
    // },
    async list () {
      let params = {}
      try {
        const res = await this.$http.post('/advance-level/list', params)
        if (res.code === '200') {
          if (res.data && res.data.rows && res.data.rows.length > 0) {
            this.faceLevelConfigForm = res.data.rows[0]
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    save: debounce(300, function () {
      this.$refs['faceLevelConfigForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/advance-level/update', this.faceLevelConfigForm)
            if (res.code === '200') {
              this.$message.success('保存成功!')
              // this.closeDialog()
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

<style>

</style>
