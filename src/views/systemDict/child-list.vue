<template>
  <div class="border">
    <div style="margin:15px auto;">节点数据</div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button @click="back">返回</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showEditFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="systemDictTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <!--<el-table-column prop="dictionaryId" label="序号" header-align="center" align="center"/>-->
      <el-table-column prop="appName" label="应用名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="编码" header-align="center" align="center"/>
      <el-table-column prop="value" label="名称/标题/值" header-align="center" align="center"/>
      <el-table-column prop="remark" label="备注" header-align="center" align="center"/>
      <el-table-column prop="state" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state === 1 ? '正常' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editChildSystemDict(scope.row)" type="text" size="small">编辑</el-button>
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
    <!--子组件-->
    <child-edit :ifshow="showEditFlag" :systemDict="systemDict" @handleCloseDialog="showEditFlag=false;systemDict=null;list();"></child-edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        parent: null
      },
      systemDict: null,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showEditFlag: false
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.searchForm.parent = this.$route.params.dictionaryId
      this.searchForm.pageIndex = this.pageIndex
      this.searchForm.pageSize = this.pageSize
      try {
        const res = await this.$http.post('/management/system-dict/list', this.searchForm)
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
        this.selectIds.push(v.dictionaryId)
      })
    },
    editChildSystemDict (row) {
      this.showEditFlag = true
      this.systemDict = row
    },
    back () {
      this.$router.push({name: 'systemDict'})
    }
  },
  components: {
    'child-edit': () => import('./child-edit')
  }
}
</script>

<style lang="stylus">
</style>
