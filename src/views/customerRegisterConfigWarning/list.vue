<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台:">
        <el-select v-model="searchForm.appName" clearable filterable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list()">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="tipsPageTable" :data="tableData" border stripe highlight-current-row height="750" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerToday" label="今日注册人数" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.registerToday}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerLimit" label="单日注册上限" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.registerLimit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="warningRate" label="预警率" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.warningRate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="receivedPhone" label="接收手机号" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.receivedPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateUser" label="修改人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updateUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('currentState', scope.row.currentState)}}</span>
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
    <add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"/>
    <edit :ifshow="showEditFlag" :tip="tip" @handleCloseDialog="showEditFlag=false;list();"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: 21
      },
      tipsPage: {},
      tip: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false
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
        const res = await this.$http.post('/register-config/register-page-query', params)
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
      this.tip = row
    }
  },
  components: {
    'add': () => import('./add'),
    'edit': () => import('./edit')
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
