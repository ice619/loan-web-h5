<!--<template>-->
  <!--<div class="border" style="width: 100%">-->
    <!--<el-dialog title="修改协议" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="70%">-->
      <!--<el-form :inline="true" :model="agreementForm" :rules="rules" ref="agreementForm" label-width="500px"-->
               <!--class="demo-form-inline">-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col>-->
            <!--<el-form-item label="APP平台:" prop="appName">-->
              <!--<el-select v-model="agreementForm.appName" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col >-->
            <!--<el-form-item label="协议名称:" prop="agreementName">-->
              <!--<el-input type="text" v-model="agreementForm.agreementName"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col>-->
            <!--<el-form-item label="类型:" prop="agreeType">-->
              <!--<el-select v-model="agreementForm.agreeType" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in $formatter.getSelectionOptions('agreeType')" :key="item.value" :label="item.label" :value="item.value"/>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col>-->
            <!--<el-form-item label="语言:" prop="language">-->
              <!--<el-select v-model="agreementForm.language" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in $formatter.getSelectionOptions('language')" :key="item.value" :label="item.label" :value="item.value"/>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col>-->
            <!--<el-form-item label="内容:" prop="agreeContent">-->
              <!--<quill-editor class="editer" ref="myTextEditor"-->
                            <!--v-model="agreementForm.agreeContent"-->
                            <!--:config="editorOption"-->
                            <!--@blur="onEditorBlur($event)"-->
                            <!--@focus="onEditorFocus($event)"-->
                            <!--@ready="onEditorReady($event)">-->
              <!--</quill-editor>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center">-->
          <!--<el-col>-->
            <!--<el-form-item label="状态:" prop="currentState">-->
              <!--<el-radio-group v-model="agreementForm.currentState">-->
                <!--<el-radio :label="1">有效</el-radio>-->
                <!--<el-radio :label="0">失效</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="center" style="margin-top: 10px">-->
          <!--<el-col :span="40">-->
            <!--<el-form-item>-->
              <!--<el-button style="color: white;background-color: #009688;" type="primary" @click="updateTipPage">提交</el-button>-->
              <!--<el-button @click="closeDialog">返回</el-button>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import debounce from 'throttle-debounce/debounce'-->
<!--import {clone} from '@/utils/common'-->

<!--export default {-->
  <!--content: '<h2>Please Input Content</h2>',-->
  <!--editorOption: {-->
    <!--// something config-->
  <!--},-->
  <!--props: {-->
    <!--'ifshow': Boolean,-->
    <!--'agreementWindow': Object-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--configDetails: [],-->
      <!--pageInitForm: {-->
        <!--appName: 21,-->
        <!--language: '',-->
        <!--agreementName: '',-->
        <!--agreeType: '',-->
        <!--agreeContent: '',-->
        <!--currentState: 1-->
      <!--},-->
      <!--agreementForm: {},-->
      <!--sort: 1,-->
      <!--rules: {-->
        <!--appName: [-->
          <!--{required: true, message: '请选择应用类型', trigger: 'blur'}-->
        <!--],-->
        <!--agreeType: [-->
          <!--{required: true, message: '请选择类型', trigger: 'blur'}-->
        <!--],-->
        <!--language: [-->
          <!--{required: true, message: '请选择语言', trigger: 'blur'}-->
        <!--],-->
        <!--agreementName: [-->
          <!--{required: true, message: '请输入协议名称', trigger: 'blur'}-->
        <!--],-->
        <!--agreeContent: [-->
          <!--{required: true, message: '请输入协议内容', trigger: 'blur'}-->
        <!--],-->
        <!--currentState: [-->
          <!--{required: true, message: '请选择状态', trigger: 'blur'}-->
        <!--]-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--editor () {-->
      <!--return this.$refs.myTextEditor.quillEditor-->
    <!--}-->
  <!--},-->
  <!--mounted () {-->
    <!--// you can use current editor object to do something(editor methods)-->
    <!--console.log('this is my editor', this.editor)-->
    <!--// this.editor to do something...-->
  <!--},-->
  <!--methods: {-->
    <!--onEditorBlur (editor) {-->
      <!--console.log('editor blur!', editor)-->
    <!--},-->
    <!--onEditorFocus (editor) {-->
      <!--console.log('editor focus!', editor)-->
    <!--},-->
    <!--onEditorReady (editor) {-->
      <!--console.log('editor ready!', editor)-->
    <!--},-->
    <!--onEditorChange ({ editor, html, text }) {-->
      <!--this.content = html-->
    <!--},-->
    <!--async initFrom () {-->
      <!--try {-->
        <!--const res = await this.$http.post('/agreement-config/agreement-query/' + this.agreementWindow.customerAgreementConfigId)-->
        <!--if (res.code === '200') {-->
          <!--this.agreementForm = clone(this.agreementWindow)-->
          <!--this.configDetails = res.data-->
        <!--} else {-->
          <!--this.$message.error(res.message)-->
        <!--}-->
      <!--} catch (err) {-->
        <!--console.error(err)-->
      <!--}-->
    <!--},-->
    <!--openDialog () {-->
      <!--this.initFrom()-->
    <!--},-->
    <!--closeDialog () {-->
      <!--this.$refs['agreementForm'].resetFields()-->
      <!--this.$emit('handleCloseDialog')-->
    <!--},-->
    <!--updateTipPage: debounce(300, function () {-->
      <!--this.$refs['agreementForm'].validate(async (valid) => {-->
        <!--if (valid) {-->
          <!--try {-->
            <!--const res = await this.$http.post('/agreement-config/agreement-update', this.agreementForm)-->
            <!--if (res.code === '200') {-->
              <!--this.$message.success('修改成功!')-->
              <!--this.closeDialog()-->
            <!--} else {-->
              <!--this.$message.error(res.message)-->
            <!--}-->
          <!--} catch (err) {-->
            <!--console.error(err)-->
          <!--}-->
        <!--}-->
      <!--})-->
    <!--})-->
  <!--}-->
<!--}-->
<!--</script>-->
