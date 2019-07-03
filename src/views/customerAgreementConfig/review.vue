<!--<template>-->
<!--<div class="border" style="width: 100%">-->
<!--<el-dialog title="详情" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="70%">-->
<!--<el-form :inline="true" :model="agreementForm" ref="agreementForm" label-width="100px"-->
<!--class="demo-form-inline">-->
<!--<el-row type="flex" justify="center">-->
<!--<el-col :span="12">-->
<!--<el-form-item  prop="reviewUrl">-->
<!--&lt;!&ndash;-->
<!--label="内容:"-->
<!--<el-input  v-model="agreementForm.reviewUrl"></el-input>&ndash;&gt;-->
<!--<quill-editor class="editer" ref="myTextEditor"-->
<!--v-model="agreementForm.agreeContent"-->
<!--:config="editorOption"-->
<!--@change="onEditorChange($event)">-->
<!--</quill-editor>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--</el-row>-->

<!--</el-form>-->
<!--</el-dialog>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import {clone} from '@/utils/common'-->
<!--import ElPager from "element-ui/packages/pagination/src/pager";-->
<!--export default {-->
<!--components: {ElPager},-->
<!--props: {-->
<!--'ifshow': Boolean,-->
<!--'agreementWindow': Object-->
<!--},-->
<!--data () {-->
<!--return {-->
<!--configDetails: [],-->
<!--agreementForm: {}-->
<!--}-->
<!--},-->
<!--methods: {-->
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
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus">-->
<!--.ql-container .ql-editor {-->
<!--min-height: 20em;-->
<!--padding-bottom: 1em;-->
<!--padding-left: -20em;-->
<!--max-height: 25em;-->
<!--margin-left: 0em;-->
<!--min-width: 50em-->
<!--}-->
<!--</style>-->
