<!--<template>-->
  <!--<div class="border">-->
    <!--<el-form :inline="true" :model="agreementPageForm" class="demo-form-inline">-->
      <!--<el-form-item label="APP平台：">-->
        <!--<el-select v-model="agreementPageForm.appName" clearable placeholder="请选择">-->
          <!--<el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>-->
        <!--<el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-table ref="appAgreementTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">-->
      <!--<el-table-column type="index" label="序号" width="50" header-align="center" align="center" />-->
      <!--<el-table-column prop="appName" label="APP平台" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="agreementName" label="协议名称" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.agreementName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="agreeType" label="语言" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{$formatter.simpleFormatSelection('language', scope.row.language)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="agreeType" label="类型" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{$formatter.simpleFormatSelection('agreeType', scope.row.agreeType)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="currentState" label="状态" header-align="center" align="center"  min-width="30px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{$formatter.simpleFormatSelection('currentState', scope.row.currentState)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="创建人" header-align="center" align="center"   min-width="60px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.createUser}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="createTime" label="创建时间" header-align="center" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.createTime}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="updateTime" label="修改时间" header-align="center" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.updateTime}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" header-align="center" align="center"  min-width="60px"  show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<el-button icon="el-icon-review" @click="lookAgreementConfig(scope.row)" type="text" size="small">查看</el-button>-->
          <!--<el-button icon="el-icon-edit" @click="editAgreementConfig(scope.row)" type="text" size="small">编辑</el-button>-->
          <!--<el-button icon="el-icon-delete" @click="removeAgreement(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<el-pagination-->
      <!--@current-change="handleCurrentChange"-->
      <!--@size-change="handleSizeChange"-->
      <!--:current-page="pageIndex"-->
      <!--:page-sizes="[10, 20, 50, 100]"-->
      <!--:page-size="pageSize"-->
      <!--layout="->,total, sizes, prev, pager, next, jumper"-->
      <!--:total="total">-->
    <!--</el-pagination>-->
    <!--&lt;!&ndash;子组件&ndash;&gt;-->
    <!--<add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>-->
    <!--<edit :ifshow="showEditFlag" :agreementWindow="agreementWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>-->
    <!--<review :ifshow="showReviewFlag" :agreementWindow="agreementWindow" @handleCloseDialog="showReviewFlag=false;list();"></review>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->

<!--import Review from "./review";-->
<!--export default {-->
  <!--data () {-->
    <!--return {-->
      <!--agreementPageForm: {-->
        <!--appName: 21-->
      <!--},-->
      <!--agreementWindow: {},-->
      <!--tableData: [],-->
      <!--pageIndex: 1,-->
      <!--pageSize: 10,-->
      <!--total: 0,-->
      <!--selectIds: [],-->
      <!--showAddFlag: false,-->
      <!--showEditFlag: false,-->
      <!--showReviewFlag: false-->
    <!--}-->
  <!--},-->
  <!--created () {-->
    <!--this.list()-->
  <!--},-->
  <!--methods: {-->
    <!--async list () {-->
      <!--let params = {-->
        <!--...this.agreementPageForm,-->
        <!--pageIndex: this.pageIndex,-->
        <!--pageSize: this.pageSize-->
      <!--}-->
      <!--try {-->
        <!--const res = await this.$http.post('/agreement-config/agreement-query-list', params)-->
        <!--if (res.code === '200') {-->
          <!--this.tableData = res.data.rows-->
          <!--this.total = res.data.total-->
        <!--} else {-->
          <!--this.$message.error(res.message)-->
        <!--}-->
      <!--} catch (err) {-->
        <!--console.error(err)-->
      <!--}-->
    <!--},-->
    <!--handleCurrentChange (currentPage) {-->
      <!--this.pageIndex = currentPage-->
      <!--this.list()-->
    <!--},-->
    <!--handleSizeChange (size) {-->
      <!--this.pageSize = size-->
      <!--this.list()-->
    <!--},-->
    <!--handleSelectionChange (val) {-->
      <!--this.selectIds = []-->
      <!--val.forEach(v => {-->
        <!--this.selectIds.push(v.id)-->
      <!--})-->
    <!--},-->
    <!--lookAgreementConfig (row) {-->
    <!--this.showReviewFlag = true-->
    <!--this.agreementWindow = row-->
    <!--},-->
    <!--editAgreementConfig (row) {-->
      <!--this.showEditFlag = true-->
      <!--this.agreementWindow = row-->
    <!--},-->
    <!--removeAgreement (row) {-->
      <!--let agreementId = ''-->
      <!--let idsLength = this.selectIds.length-->
      <!--console.log(idsLength)-->
      <!--if (row instanceof Event) {-->
        <!--if (idsLength > 0) {-->
          <!--this.selectIds.forEach(v => {-->
            <!--agreementId += `${v},`-->
          <!--})-->
          <!--agreementId = agreementId.substring(0, agreementId.length - 1)-->
        <!--} else {-->
          <!--this.$message.warning('至少选择一条记录')-->
          <!--return-->
        <!--}-->
      <!--} else {-->
        <!--this.$refs.appAgreementTable.clearSelection()-->
        <!--idsLength = 1-->
        <!--this.selectIds.push(row.customerAgreementConfigId)-->
        <!--agreementId = row.customerAgreementConfigId-->
      <!--}-->
      <!--const url = `/agreement-config/agreement-delete/${agreementId}`-->
      <!--const tableLength = this.tableData.length-->
      <!--this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {-->
        <!--try {-->
          <!--const res = await this.$http.delete(url)-->
          <!--if (res.code === '200') {-->
            <!--this.$message.success('删除成功!')-->
            <!--this.selectIds.forEach(v => {-->
              <!--let i = this.tableData.findIndex(s => s.id === v)-->
              <!--this.tableData.splice(i, 1)-->
            <!--})-->
            <!--this.total -= idsLength-->
            <!--if (idsLength === tableLength) {-->
              <!--this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1-->
              <!--this.list()-->
            <!--}-->
          <!--} else {-->
            <!--this.$message.error(res.message)-->
          <!--}-->
          <!--this.selectIds = []-->
        <!--} catch (err) {-->
          <!--console.error(err)-->
        <!--}-->
      <!--}).catch(action => {-->
        <!--this.selectIds = []-->
      <!--})-->
    <!--}-->
  <!--},-->
  <!--components: {-->
    <!--'review': () => import('./review'),-->
    <!--'add': () => import('./add'),-->
    <!--'edit': () => import('./edit')-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus">-->
  <!--.ql-container .ql-editor {-->
    <!--min-height: 20em;-->
    <!--padding-bottom: 1em;-->
    <!--max-height: 25em-->
  <!--}-->
<!--</style>-->
