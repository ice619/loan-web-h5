<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-form-item label="奖励行为">
          <el-select v-model="searchForm.customerState" clearable placeholder="请选择">
            <el-option v-for="item in $formatter.getSelectionOptions('customerState')" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list" v-if="$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_SELECT')">查询</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus"  @click="showAddFlag = true" v-if="$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_CREATE')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerState" label="奖励行为" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('customerState', scope.row.customerState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="materialType" label="物料类型" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('materialType', scope.row.materialType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="materialCode" label="物料编码" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="osVersion" label="系统类型" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('osVersion', scope.row.osVersion)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效版本号" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.startAppVersion}} ~ {{ scope.row.endAppVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="materialRemark" label="物料备注" header-align="center" align="center" width="150" show-overflow-tooltip/>
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('status', scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" header-align="center" align="center" min-width="80"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="updateUser" label="修改人" header-align="center" align="center" min-width="80"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="120"/>
      <el-table-column label="操作" header-align="center" align="center" min-width="140" fixed="right" v-if="$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_UPDATE', 'BEHAVIOR_REWARD_CONFIG_DELETE')">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editVariable(scope.row)" type="text" size="small" v-if="$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_UPDATE')">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeBanner(scope.row)" type="text" size="small" v-if="$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_DELETE')" style="color: #F56C6C">删除</el-button>
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
    <edit :ifshow="showEditFlag" :entry="entry" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: 21,
        customerState: null,
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
    if (this.$permission.hasPermission('BEHAVIOR_REWARD_CONFIG_SELECT')) {
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
        const res = await this.$http.post('/behavior-reward-config/page', params)
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
    editVariable (row) {
      this.showEditFlag = true
      this.entry = row
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
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(`/behavior-reward-config/${selectIdsStr}`)
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
