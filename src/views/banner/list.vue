<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <!--<el-form-item label="用户标签">
        <el-select v-model="searchForm.userTag" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>-->
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-form-item label="用户标签">
          <el-select v-model="searchForm.userTags" clearable placeholder="请选择">
            <el-option v-for="item in $formatter.getSelectionOptions('userTag')" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="banner位置">
        <el-select v-model="searchForm.position" clearable filterable placeholder="请选择">
         <!-- <el-option v-for="item in $formatter.getSelectionOptions('bannerPositions')" :key="item.value" :label="item.label" :value="item.value"/>-->
          <el-option :key="1" label="借款页" :value="1"/>
          <el-option :key="2" label="授信页" :value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list">查询</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus" @click="$router.push({name: 'bannerAdd'})">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <!--<el-table-column prop="id" label="ID" header-align="center" align="center"/>-->
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="startAppVersion" label="开始版本号" header-align="center" align="center" min-width="90"/>-->
      <!--<el-table-column prop="endAppVersion" label="结束版本号" header-align="center" align="center" min-width="90"/>-->
      <el-table-column prop="userTag" label="用户标签" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.multipleFormatSelection('userTag', scope.row.userTag)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="endTime" label="结束时间" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="position" label="banner位置" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('position', scope.row.position)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="90"/>
      <el-table-column label="修改人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updateUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="90"/>
      <!--<el-table-column prop="createUser" label="创建人" header-align="center" align="center"/>-->
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('status', scope.row.status)}}</span>
        </template>
      </el-table-column>
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
    <!--<add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>
    <edit :ifshow="showEditFlag" :bannerWindow="bannerWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        userTags: [],
        appName: 21,
        status: null,
        position: null
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
        const res = await this.$http.post('/banner/page', params)
        // console.log(res)
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
      // this.showEditFlag = true
      // this.bannerWindow = row
      this.$router.push({path: `banner-edit/${row.id}`})
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
      const url = `/banner/${selectIdsStr}`
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
  }
}
</script>

<style scoped lang="stylus">
</style>
