<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.customerId" placeholder="客户编号"/>
      </el-form-item>
      <el-form-item label="申请单编号">
        <el-input v-model="searchForm.appSerialNumber" placeholder="申请单编号"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('pushStatus')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="审批状态">
        <el-select v-model="searchForm.auditingState" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('auditingState')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="申请单类型">
        <el-select v-model="searchForm.applicationType" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('applicationType')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="pushRiskLogTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applicationType" label="申请单类型" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('applicationType', scope.row.applicationType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" header-align="center" align="center" min-width="75">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('pushStatus', scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditingState" label="审批状态" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('auditingState', scope.row.auditingState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="appSerialNumber" label="申请单编号" header-align="center" align="center" min-width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="callRiskInterfaceRecord(scope.row.appSerialNumber)">{{scope.row.appSerialNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="riskApplicationId" label="风控申请单编号" header-align="center" align="center" min-width="300"/>
      <el-table-column prop="appLevel" label="客户标识" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appLevel', scope.row.appLevel)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="客户姓名" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="phoneNum" label="APP注册手机号" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="toCustomerInfo(scope.row)">{{scope.row.customerId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="authMoney" label="授信额度" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="maxProductQuota" label="最大提现额度" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="rejectedNode" label="风控最后审核步骤" header-align="center" align="center" min-width="155"/>
      <el-table-column prop="exceptionType" label="异常类型" header-align="center" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('exceptionType', scope.row.exceptionType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="appVersion" label="App版本号" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="appChannel" label="app下载渠道" header-align="center" align="center" min-width="110"/>
      <el-table-column prop="source" label="申请来源" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('clientType', scope.row.source)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jxlToken" label="聚信立运营商token" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="tdBlockBox" label="同盾black_box" header-align="center" align="center" min-width="135" show-overflow-tooltip/>
      <el-table-column prop="sesameScope" label="芝麻分" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="loanIp" label="申请用户公网IP" header-align="center" align="center" min-width="140"/>
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        customerId: null,
        appSerialNumber: null,
        appName: null,
        startTime: null,
        endTime: null,
        status: null,
        auditingState: null,
        applicationType: null
      },
      pushRiskLogWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false
      // rowAppName: null,
      // rowCustomerId: null
    }
  },
  created () {
    this.initSearchForm()
    this.list()
  },
  methods: {
    initSearchForm () {
      let applicationId = this.$route.params.applicationId
      let cId = this.$route.params.customerId
      let aName = this.$route.params.appName
      if (applicationId || (cId && aName)) {
        this.searchForm.customerId = this.$route.params.customerId
        this.searchForm.appSerialNumber = this.$route.params.appSerialNumber
        this.searchForm.appName = this.$route.params.appName
        this.searchForm.startTime = this.$route.params.startTime
        this.searchForm.endTime = this.$route.params.endTime
        this.searchForm.status = this.$route.params.status
        this.searchForm.auditingState = this.$route.params.auditingState
        this.searchForm.applicationType = this.$route.params.applicationType
      } else {
        const now = new Date()
        this.searchForm.startTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
        this.searchForm.endTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
      }
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/push-risk-log/page', params)
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
    async callRiskInterfaceRecord (appSerialNumber) {
      try {
        let applicationId = appSerialNumber
        if (!applicationId) {
          this.$message.error('申请单编号不能为空')
          return
        }
        let params = {
          ...this.searchForm,
          applicationId: applicationId
        }
        this.$router.push({name: 'riskInterfaceRecord', params: params})
      } catch (err) {
        console.error(err)
      }
    },
    async toCustomerInfo (row) {
      try {
        let rowAppName = row.appName
        let rowCustomerId = row.customerId
        if (!rowAppName) {
          this.$message.error('APP名称不能为空')
          return
        }
        if (!rowCustomerId) {
          this.$message.error('客户编号不能为空')
          return
        }
        let params = {
          ...this.searchForm,
          appName: rowAppName,
          customerId: rowCustomerId,
          customerReviewPushRiskLogFlag: true
        }
        this.$router.push({name: 'customerInfo', params: params})
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
      this.pushRiskLogWindow = row
    },
    delete (row) {
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
      const url = `/push-risk-log/${selectIdsStr}`
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
