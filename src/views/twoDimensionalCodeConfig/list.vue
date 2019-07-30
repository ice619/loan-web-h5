<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台">
        <el-select v-model="searchForm.appName" clearable filterable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list()">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="quotasPageTable" :data="tableData" border stripe highlight-current-row height="750" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="localCodeImageUrl" label="本地下载二维码" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.localCodeImageUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="谷歌商店下载二维码" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.googleCodeImageUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shortUrl" label="下载短链" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shortUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultQuota" label="创建人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultQuota}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultQuota" label="创建时间" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultQuota}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultQuota" label="修改时间" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultQuota}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultQuota" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultQuota}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editTipPage(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="editTipPage(scope.row)" type="text" size="small">删除</el-button>
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

<style lang="stylus" scoped="scoped">
  .el-tooltip__popper {
    border-bottom: 500px
  }
  .el-tooltip {
  }
</style>
