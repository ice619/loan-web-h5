<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户标签">
        <el-select v-model="searchForm.userTag" clearable placeholder="请选择">
          <el-option v-for="item in globalConfig.userTags" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="应用名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in globalConfig.status" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="id" label="ID" header-align="center" align="center" width="50"/>
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" width="104" :formatter="formatAppNume"/>
      <el-table-column prop="userTag" label="用户标签" header-align="center" align="center" width="150" :formatter="formatUserTags"/>
      <el-table-column prop="terminal" label="生效终端" header-align="center" align="center" width="80" :formatter="formatTerminals"/>
      <el-table-column prop="position" label="banner位置" header-align="center" align="center" width="118" :formatter="formatPositions"/>
      <el-table-column prop="displayPosition" label="显示位置" header-align="center" align="center" width="82" :formatter="formatDisplayPositions"/>
      <el-table-column prop="versionLowerLimit" label="版本号下限" header-align="center" align="center" width="100" :formatter="formatVersions"/>
      <el-table-column prop="versionUpperLimit" label="版本号上限" header-align="center" align="center" width="100" :formatter="formatVersions"/>
      <el-table-column prop="status" label="状态" header-align="center" align="center" width="60" :formatter="formatStatus"/>
      <el-table-column prop="startTime" label="开始时间" header-align="center" align="center" width="164"/>
      <el-table-column prop="endTime" label="结束时间" header-align="center" align="center" width="164"/>
      <el-table-column prop="modifyUser" label="修改人" header-align="center" align="center" width="130"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" width="164"/>
      <el-table-column prop="createUser" label="创建人" header-align="center" align="center" width="130"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" width="164"/>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editBanner(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeBanner(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>
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
    <edit :ifshow="showEditFlag" :bannerWindow="bannerWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
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
      bannerWindow: {},
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
        const res = await this.$http.post('/config/banner/page', params)
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
    editBanner (row) {
      this.showEditFlag = true
      this.bannerWindow = row
    },
    removeBanner (row) {
      let selectIdsStr = ''
      let idsLength = this.selectIds.length
      if (row instanceof Event) {
        if (idsLength > 0) {
          this.selectIds.forEach(v => {
            selectIdsStr += `${v},`
          })
          selectIdsStr = selectIdsStr.substring(0, selectIdsStr.length - 1)
        } else {
          this.$message.warning('至少选择一条记录')
          return
        }
      } else {
        this.$refs.iosCompanySignTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/config/banner/${selectIdsStr}`
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(url)
          if (res.code === '200') {
            this.$message.success('删除成功!')
            // this.list()
            this.selectIds.forEach(v => {
              let i = this.tableData.findIndex(s => s.id === v)
              this.tableData.splice(i, 1)
            })
            this.total -= idsLength
            if (idsLength === tableLength) {
              this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1
              this.list()
            }
          } else {
            this.$message.error(res.message)
          }
          this.selectIds = []
        } catch (err) {
          console.error(err)
        }
      }).catch(action => {
        this.selectIds = []
      })
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
