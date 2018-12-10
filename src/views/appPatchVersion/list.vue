<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="appPatchVersionTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="left">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="clientType" label="平台类型" header-align="center" align="left">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('clientType', scope.row.clientType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="baseVersion" label="基线版本" header-align="center" align="left"/>
      <el-table-column prop="patchVersion" label="补丁版本" header-align="center" align="left"/>
      <el-table-column prop="versionCode" label="版本代号" header-align="center" align="left"/>
      <el-table-column prop="versionName" label="版本名字" header-align="center" align="left"/>
      <el-table-column prop="channel" label="渠道" header-align="center" align="left"/>
      <el-table-column prop="validateFrom" label="开始生效" header-align="center" align="left"/>
      <el-table-column prop="state" label="状态" header-align="center" align="left">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('state', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="补丁说明" header-align="center" align="left" min-width="90"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="left" min-width="90"/>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="left"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="left" min-width="90"/>
      <el-table-column prop="modifyMan" label="修改人" header-align="center" align="left"/>
      <el-table-column label="操作" header-align="center" align="left">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
    <edit :ifshow="showEditFlag" :appPatchVersionWindow="appPatchVersionWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        userTag: null,
        appName: null,
        status: null
      },
      appPatchVersionWindow: {},
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
        const res = await this.$http.post('/app-patch-version/page', params)
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
    edit (row) {
      this.showEditFlag = true
      this.appPatchVersionWindow = row
    }
  },
  components: {
    'add': () => import('./add'),
    'edit': () => import('./edit')
  }
}
</script>

<style scoped lang="stylus">
</style>
