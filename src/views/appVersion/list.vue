<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择APP名称">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号：">
          <el-input v-model="searchForm.versionNumber" clearable placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="系统：">
        <el-select v-model="searchForm.appType" clearable placeholder="请选择系统类型">
          <el-option v-for="item in $formatter.getSelectionOptions('appType')" :key="item.value" :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" clearable placeholder="请选择状态">
          <el-option v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="appVersionTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="appType" label="系统" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appType', scope.row.appType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="versionNumber" label="版本号" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="market" label="渠道" header-align="center" align="center"  min-width="40px"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="isForcedUpdate" label="强制更新" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="isPopup" label="是否弹窗" header-align="center" align="center"  min-width="50px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('isPopup', scope.row.isPopup)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间" header-align="center" align="center"  min-width="80px"  show-overflow-tooltip/>
      <el-table-column prop="endTime" label="结束时间" header-align="center" align="center"  min-width="80px"  show-overflow-tooltip/>
      <el-table-column prop="state" label="状态" header-align="center" align="center"  min-width="30px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('status', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"  min-width="80px"  show-overflow-tooltip/>
      <el-table-column label="创建人" header-align="center" align="center"   min-width="60px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.createUserId}}</span>
          <span>{{scope.row.createUserId === null || scope.row.createUserId === ''|| scope.row.createUser === null || scope.row.createUser === '' ? '' : '-'}}</span>
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center"  min-width="80px"  show-overflow-tooltip/>
      <el-table-column label="修改人" header-align="center" align="center"   min-width="60px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.updateUserId}}</span>
          <span>{{scope.row.updateUserId === null || scope.row.updateUserId === '' || scope.row.updateUser === null || scope.row.updateUser === '' ? '' : '-'}}</span>
          <span>{{scope.row.updateUser}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center"  min-width="40px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editAppVersion(scope.row)" type="text" size="small">编辑</el-button>
          <!--<el-button icon="el-icon-delete" @click="removeAppVersion(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>-->
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
    <edit :ifshow="showEditFlag" :appVersionWindow="appVersionWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        appName: 21,
        state: null,
        appType: null,
        versionNumber: ''
      },
      appVersionWindow: {},
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
        const res = await this.$http.post('/app-version/page', params)
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
    editAppVersion (row) {
      this.showEditFlag = true
      row.isPopup = Number(row.isPopup)
      this.appVersionWindow = row
    },
    removeAppVersion (row) {
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
        this.$refs.appVersionTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.appVersionId)
        selectIdsStr = row.appVersionId
      }
      const url = `/Useragement/app-version/${selectIdsStr}`
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(url)
          if (res.code === '200') {
            this.$message.success('删除成功!')
            // this.list()
            this.selectIds.forEach(v => {
              let i = this.tableData.findIndex(s => s.appVersionId === v)
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
