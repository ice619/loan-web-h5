<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="第三方标识">
        <el-input v-model="searchForm.serviceCode" placeholder="请输入第三方标识" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="logTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="serviceCode" label="第三方标识" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="requestService" label="请求的服务" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="requestUrl" label="请求url" header-align="center" align="center" min-width="130" show-overflow-tooltip/>
      <el-table-column prop="requestHeader" label="请求头内容" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="requestBody" label="请求体内容" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="httpStatus" label="HTTP状态码" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="response" label="响应内容" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="errorInfo" label="异常消息" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="errorStackTrace" label="异常堆栈" header-align="center" align="center" min-width="120" show-overflow-tooltip/>
      <el-table-column prop="requestTime" label="请求时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.requestTime), "yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="responseTime" label="响应时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.responseTime), "yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalTime" label="总耗时" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="serverAddress" label="当前服务器地址" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.createTime), "yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        startTime: null,
        endTime: null,
        serviceCode: null
      },
      logWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: []
    }
  },
  created () {
    this.initSearchForm()
  },
  methods: {
    initSearchForm () {
      const now = new Date()
      this.searchForm.startTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.searchForm.endTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        if (!this.searchForm.startTime) {
          this.$message.error('开始时间不能为空')
          return
        }
        if (!this.searchForm.endTime) {
          this.$message.error('结束时间不能为空')
          return
        }
        if (this.searchForm.startTime > this.searchForm.endTime) {
          this.$message.error('开始时间要小于结束时间')
          return
        }
        const res = await this.$http.post('/management/mongodb/docking-request-log/page', params)
        if (res.code === '200') {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    handleCurrentChange (currentPage) {
      this.pageIndex = currentPage
      this.list()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.list()
    },
    handleSelectionChange (val) {
      this.selectIds = []
      // val.forEach(v => {
      //   this.selectIds.push(v.id)
      // })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
