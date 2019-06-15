<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable filterable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="生效用户">
        <el-select v-model="searchForm.userType" clearable filterable placeholder="请选择">
          <el-option v-for="item in userTypes" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable filterable placeholder="请选择">
          <el-option v-for="item in statuses" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list()">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="quotasPageTable" :data="tableData" border stripe highlight-current-row height="750" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.appName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="生效用户" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.userType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultQuota" label="默认额度" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultQuota}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editTipPage(scope.row)" type="text" size="small">编辑</el-button>
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
    <add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>
    <edit :ifshow="showEditFlag" :quota="quota" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>
export default {
  components: {
    'add': () => import('./add'),
    'edit': () => import('./edit')
  },
  data () {
    return {
      searchForm: {
        appName: 21,
        userType: null,
        status: null
      },
      quotasPage: {},
      quota: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false,
      statuses: [{value: '1', label: '生效'}, {value: '0', label: '失效'}],
      userTypes: [{value: '0', label: '全部用户'}]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/app-config/customer-config-quota/page', params)
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
    },
    editTipPage (row) {
      this.showEditFlag = true
      this.quota = row
    }
  }
}
</script>

<style lang="stylus">
  .el-tooltip__popper {
    border-bottom: 500px
  }
  .el-tooltip {
  }
</style>
