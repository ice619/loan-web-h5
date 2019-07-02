<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-form-item label="活动类型">
          <el-select v-model="searchForm.activityType" clearable placeholder="请选择">
            <el-option v-for="item in $formatter.getSelectionOptions('activityType')" v-if="item.value !== 'XW'" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="活动编码">
        <el-input v-model="searchForm.activityCode" maxlength="30" clearable placeholder="活动编码"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list" v-if="$permission.hasPermission('ACTIVITY_CONFIG_SELECT')">查询</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus"  @click="showAddFlag = true" v-if="$permission.hasPermission('ACTIVITY_CONFIG_CREATE')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityType" label="活动类型" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('activityType', scope.row.activityType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityCode" label="活动编码" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="customerState" label="生效用户" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('activityCustomerState', scope.row.customerState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题(默认)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="translateTitle" label="标题(切换)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="startTime" label="活动开始时间" header-align="center" align="center" min-width="195"/>
      <el-table-column prop="endTime" label="活动结束时间" header-align="center" align="center" min-width="195"/>
      <el-table-column prop="drawTimes" label="抽奖次数" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="status" label="状态" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('status', scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="updateUser" label="修改人" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="160"/>
      <el-table-column label="操作" header-align="center" align="center" fixed="right" v-if="$permission.hasPermission('ACTIVITY_CONFIG_DELETE')">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" @click="removeBanner(scope.row)" type="text" size="small" v-if="$permission.hasPermission('ACTIVITY_CONFIG_DELETE')" style="color: #F56C6C">删除</el-button>
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
        appName: 21,
        materialType: null,
        materialCode: null,
        status: null
      },
      entry: {},
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
    if (this.$permission.hasPermission('ACTIVITY_CONFIG_SELECT')) {
      this.list()
    }
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/activity-config/page', params)
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
      this.$router.push({path: `activity-config-edit/${row.id}`})
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
      // 判断是否使用
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(`/activity-config/${selectIdsStr}`)
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
    'add': () => import('./add')
  }
}
</script>

<style scoped lang="stylus">
</style>
