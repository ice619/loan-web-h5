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
      <el-form-item label="业务类型">
        <el-select v-model="searchForm.incomingType" clearable placeholder="请选择业务类型">
          <el-option v-for="item in $formatter.getSelectionOptions('reviewincomingType')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="流程类型">
        <el-select v-model="searchForm.processType" clearable placeholder="请选择流程类型">
          <el-option v-for="item in $formatter.getSelectionOptions('processType')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="推送开关">
        <el-select v-model="searchForm.pushFlag" clearable placeholder="请选择推送开关">
          <el-option v-for="item in $formatter.getSelectionOptions('pushFlag')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" @click="rePush">重新推送</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="pushRiskLogTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" header-align="center" align="center"/>
      <el-table-column v-if="false" prop="customerReviewPushRiskLogId" label="主键" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pushFlag" label="推送开关" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('pushFlag', scope.row.pushFlag)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applicationType" label="申请单类型" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('applicationType', scope.row.applicationType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="incomingType" label="业务类型" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('reviewincomingType', scope.row.incomingType)}}</span>
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
      <el-table-column prop="processType" label="流程类型" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('processType', scope.row.processType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="appSerialNumber" label="申请单编号" header-align="center" align="center" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text">{{scope.row.appSerialNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="applicationId" label="风控申请单编号" header-align="center" align="center" min-width="200"/>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text">{{scope.row.customerId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="rejectedNode" label="风控最后审核步骤" header-align="center" align="center" min-width="155"/>
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
        appName: 21,
        startTime: null,
        endTime: null,
        status: null,
        auditingState: null,
        applicationType: null,
        incomingType: null,
        pushFlag: null,
        processType: null
      },
      pushRiskLogWindow: {},
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
        this.searchForm.incomingType = this.$route.params.incomingType
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
        const res = await this.$http.post('/customer/push-risk-log/page', params)
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
    // async callRiskInterfaceRecord (appSerialNumber) {
    //   try {
    //     let applicationId = appSerialNumber
    //     if (!applicationId) {
    //       this.$message.error('申请单编号不能为空')
    //       return
    //     }
    //     let params = {
    //       ...this.searchForm,
    //       applicationId: applicationId
    //     }
    //     this.$router.push({name: 'riskInterfaceRecord', params: params})
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    // async toCustomerInfo (row) {
    //   try {
    //     let rowAppName = row.appName
    //     let rowCustomerId = row.customerId
    //     if (!rowAppName) {
    //       this.$message.error('APP名称不能为空')
    //       return
    //     }
    //     if (!rowCustomerId) {
    //       this.$message.error('客户编号不能为空')
    //       return
    //     }
    //     let params = {
    //       ...this.searchForm,
    //       appName: rowAppName,
    //       customerId: rowCustomerId,
    //       customerReviewPushRiskLogFlag: true
    //     }
    //     this.$router.push({name: 'customerInfo', params: params})
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    rePush () {
      let selectIdsStr = ''
      let idsLength = this.selectIds.length
      if (idsLength > 0) {
        this.selectIds.forEach(v => {
          selectIdsStr += `${v},`
        })
        selectIdsStr = selectIdsStr.substring(0, selectIdsStr.length - 1)
      } else {
        this.$message.warning('至少选择一条记录')
        return
      }
      const url = `/customer/update-push-flag-allow/` + selectIdsStr
      // const tableLength = this.tableData.length
      this.$confirm('确认重新推送并清除失败次数吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.put(url)
          if (res.code === '200') {
            this.$message.success('推送成功!')
            this.list()
            // this.selectIds.forEach(v => {
            //   let i = this.tableData.findIndex(s => s.id === v)
            //   this.tableData.splice(i, 1)
            // })
            // this.total = idsLength
            // if (idsLength === tableLength) {
            //   this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1
            //   this.list()
            // }
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
        this.selectIds.push(v.customerReviewPushRiskLogId)
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
