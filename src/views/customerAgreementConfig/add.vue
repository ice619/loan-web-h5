<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <div class="border" style="height: 800px">
    <el-dialog title="添加协议" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="70%">
      <el-form :inline="true" :model="agreementAddForm" :rules="rules" ref="agreementAddForm" label-width="100px" class="demo-form-inline">
        <el-row  type="flex" justify="center">
          <el-col >
            <el-form-item label="APP平台:" prop="appName">
              <el-select v-model="agreementAddForm.appName" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col >
            <el-form-item label="协议名称:" prop="agreementName">
              <el-input type="text" v-model="agreementAddForm.agreementName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="类型:" prop="agreeType">
              <el-select v-model="agreementAddForm.agreeType" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('agreeType')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="语言:" prop="language">
              <el-select v-model="agreementAddForm.language" clearable placeholder="请选择">
                <el-option v-for="item in $formatter.getSelectionOptions('language')" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
       <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="内容:" prop="agreeContent">
              <quill-editor class="editer" ref="myTextEditor"
                            v-model="agreementAddForm.agreeContent"
                            :option="editorOption"
                            @change="onEditorChange($event)" style="height: 200px;margin-bottom: 100px">
              </quill-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="状态:" prop="currentState">
              <el-radio-group v-model="agreementAddForm.currentState">
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
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      content: '<h2>Please Input Content</h2>',
      editorOption: {
        height: 100,
        theme: 'snow'
      },
      tipPageInitForm: {
        appName: 21,
        agreeType: '',
        language: '',
        agreementName: '',
        currentState: 1,
        agreeContent: ''
      },
      agreementAddForm: {
      },
      rules: {
        appName: [
          {required: true, message: '请选择APP平台', trigger: 'blur'}
        ],
        agreeType: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ],
        language: [
          {required: true, message: '请选择语言', trigger: 'blur'}
        ],
        agreementName: [
          {required: true, message: '请输入协议名称', trigger: 'blur'}
        ],
        agreeContent: [
          {required: true, message: '请输入协议内容', trigger: 'blur'}
        ],
        currentState: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    openDialog () {
      this.agreementAddForm = clone(this.tipPageInitForm)
    },
    closeDialog () {
      this.$refs['agreementAddForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    saveTipPage: debounce(300, function () {
      this.$refs['agreementAddForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/agreement-config/agreement-save', this.agreementAddForm)
            if (res.code === '200') {
              this.closeDialog()
            } else {
              this.$message.error('同平台同类型协议下同类语言的协议不可重复!')
              // if(res.code === '1008'){
              //   this.$message.error('同平台同类型协议下同类语言的协议不可重复!')
              // }else{
              //   this.$message.error(res.message)
              // }
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
</style>
