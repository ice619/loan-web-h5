<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option :key="true" label="有效" :value="true"/>
          <el-option :key="false" label="无效" :value="false"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增开关</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="switchTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55"/>-->
      <el-table-column prop="id" label="序号" header-align="center" align="center" min-width="40"/>
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="switchType" label="开关类型" header-align="center" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('switchTypes', scope.row.switchType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="versionLowerLimit" label="版本号下限" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection(`versions_${scope.row.appName}`, scope.row.versionLowerLimit)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="versionUpperLimit" label="版本号上限" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection(`versions_${scope.row.appName}`, scope.row.versionUpperLimit)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="用户类型" header-align="center" align="center" min-width="60">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('userTypes', scope.row.userType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="200" show-overflow-tooltip/>
      <el-table-column prop="status" label="状态" header-align="center" align="center" min-width="50">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('statuses', scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifyUser" label="修改人" header-align="center" align="center" min-width="60"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="createUser" label="创建人" header-align="center" align="center" min-width="60"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="120"/>
      <el-table-column label="操作" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editVariable(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeVariable(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>
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
    <add :ifshow="showAddFlag"  :userTypes="userTypes" :switchTypes="switchTypes" @handleCloseDialog="showAddFlag=false;list();"></add>
    <edit :ifshow="showEditFlag" :entry="entry"  :userTypes="userTypes" :switchTypes="switchTypes" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: null,
        status: null
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false,
      userTypes: [{
        value: 2,
        label: '全部'
      }, {
        value: 0,
        label: '新用户'
      }, {
        value: 1,
        label: '老用户'
      }],
      switchTypes: [{
        value: 1,
        label: '排队页开关'
      }, {
        value: 2,
        label: '保险弹窗开关'
      }, {
        value: 3,
        label: '（灾备）用户提现开关'
      }, {
        value: 4,
        label: '（灾备）保险开关'
      }]
    }
  },
  created () {
    this.list()
  },
  methods: {
    formatUserType (row, col, val) {
      let label = null
      this.userTypes.forEach(ter => {
        if (ter.value === val) {
          label = ter.label
        }
      })
      return label
    },
    formatSwitchType (row, col, val) {
      let label = null
      this.switchTypes.forEach(ter => {
        if (ter.value === val) {
          label = ter.label
        }
      })
      return label
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/config/transaction-switch/page', params)
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
    removeVariable (row) {
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
        this.$refs.switchTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/config/transaction-switch/${selectIdsStr}`
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
