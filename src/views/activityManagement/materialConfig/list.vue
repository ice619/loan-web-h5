<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-form-item label="物料类型">
          <el-select v-model="searchForm.materialType" clearable placeholder="请选择">
            <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料编码">
        <el-input v-model="searchForm.materialCode" maxlength="20" clearable placeholder="物料编码"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list" v-if="$permission.hasPermission('MATERIAL_CONFIG_SELECT')">查询</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus"  @click="showAddFlag = true" v-if="$permission.hasPermission('MATERIAL_CONFIG_CREATE')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="materialType" label="物料类型" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('materialType', scope.row.materialType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="materialCode" label="物料编码" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="title" label="标题(默认)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <!--<el-table-column prop="translateTitle" label="标题(切换)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>-->
      <el-table-column prop="amount" label="金额" header-align="center" align="center" min-width="80"/>
      <el-table-column prop="validDays" label="有效期(天)" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="overdueCanUse" label="逾期可用" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('overdueCanUse', scope.row.overdueCanUse)}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="ruleDesc" label="规则描述(默认)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>-->
      <!--<el-table-column prop="translateRuleDesc" label="规则描述(切换)" header-align="center" align="center" min-width="150" show-overflow-tooltip/>-->
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
      <el-table-column label="操作" header-align="center" align="center" fixed="right" v-if="$permission.hasPermission('MATERIAL_CONFIG_DELETE')">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" @click="removeBanner(scope.row)" type="text" size="small" v-if="$permission.hasPermission('MATERIAL_CONFIG_DELETE')" style="color: #F56C6C">删除</el-button>
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
    if (this.$permission.hasPermission('MATERIAL_CONFIG_SELECT')) {
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
        const res = await this.$http.post('/material-config/page', params)
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
      this.$router.push({path: `material-config-edit/${row.id}`})
    },
    async removeBanner (row) {
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
      const hasUsed = await this.$http.get(`/material-config/has-used/${row.materialCode}`)
      let tipMsg = `${hasUsed.code === '370005' ? hasUsed.message : ''} 确认删除吗？`
      const tableLength = this.tableData.length
      this.$confirm(tipMsg, '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(`/material-config/${selectIdsStr}`)
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
