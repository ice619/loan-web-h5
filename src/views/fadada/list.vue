<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="fadadaTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" min-width="40">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fddVersion" label="版本号" header-align="center" align="center" min-width="40"/>
      <el-table-column prop="templateNo" label="合同模板编号" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="templateUrl" label="合同模板url" header-align="center" align="center" min-width="150" />
      <el-table-column prop="fddHandlerResult" label="处理结果" header-align="center" align="center" min-width="60"/>
      <el-table-column prop="fddHandlerCode" label="返回状态码" header-align="center" align="center" min-width="60"/>
      <el-table-column prop="traceId" label="请求流水号" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="80"/>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="center" min-width="40"/>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="100"/>
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
    <!--子组件-->
    <add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: null
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/config/fadada/page', params)
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
      val.forEach(v => {
        this.selectIds.push(v.id)
      })
    }
  },
  components: {
    'add': () => import('./add')
  }
}
</script>

<style scoped lang="stylus">
</style>
