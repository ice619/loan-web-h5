<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="APP平台：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择APP平台">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="对接方：">
        <el-select v-model="searchForm.dockingParty" clearable placeholder="请选择对接方">
          <el-option v-for="item in $formatter.getSelectionOptions('unionLoginType')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="logTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dockingParty" label="对接方" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('unionLoginType', scope.row.dockingParty)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="methodName" label="切点方法名称" header-align="center" align="center" min-width="110"/>
      <el-table-column prop="requestParam" label="请求参数" header-align="center" align="center" min-width="170" show-overflow-tooltip/>
      <el-table-column prop="responseParam" label="返回参数" header-align="center" align="center" min-width="170" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center">
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
        appName: 7,
        dockingParty: null
      },
      unionWindow: {},
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
        if (!this.searchForm.appName) {
          this.$message.error('APP平台不能为空')
          return
        }
        if (!this.searchForm.dockingParty) {
          this.$message.error('对接方不能为空')
          return
        }
        const res = await this.$http.post('/management/mongodb/union-login-request-log/page', params)
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
