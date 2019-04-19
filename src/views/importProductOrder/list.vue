<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="完成状态">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('importProductOrderState')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">查询</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">上传保单</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-download" @click="downTemplate()">模板下载</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="fadadaTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" min-width="40" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批次号" header-align="center" align="center" min-width="110"  show-overflow-tooltip/>
      <el-table-column prop="allNum" label="总条数" header-align="center" align="center" min-width="30" show-overflow-tooltip/>
      <el-table-column prop="failNum" label="失败条数" header-align="center" align="center" min-width="30"  show-overflow-tooltip/>
      <el-table-column prop="successNum" label="成功条数" header-align="center" align="center" min-width="30" show-overflow-tooltip/>
      <el-table-column prop="fileStorageAddress" label="文件存储地址" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="state" label="完成状态" header-align="center" min-width="40" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('importProductOrderState', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="80" show-overflow-tooltip/>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="center" min-width="40" show-overflow-tooltip/>
      <el-table-column prop="modifyTime" label="完成时间" header-align="center" align="center" min-width="80" show-overflow-tooltip/>
      <el-table-column label="操作" header-align="center" align="center" min-width="60">
        <template slot-scope="scope">
          <el-button icon="el-icon-download" @click="downFile(scope.row.fileStorageAddress)" type="text" size="small">文件下载</el-button>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: 7
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      importTemplateUrl: null
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
        const res = await this.$http.post('/management/import-product-order/page', params)
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
    async downTemplate () {
      if (this.importTemplateUrl == null) {
        const res = await this.$http.post('/management/import-product-order/template-url', {})
        if (res.code === '200') {
          this.importTemplateUrl = res.data
        } else {
          this.$message.error(res.message)
          return
        }
      }
      location.href = this.importTemplateUrl
    },
    downFile (url) {
      location.href = url
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
