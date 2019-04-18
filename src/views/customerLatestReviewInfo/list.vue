<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择APP名称">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号：">
        <el-input v-model="searchForm.customerId" clearable placeholder="请输入客户编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-select v-model="searchForm.businessType" clearable placeholder="请选择业务类型">
          <el-option v-for="item in $formatter.getSelectionOptions('reviewBusinessType')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
        <el-button @click="back" v-show="showBackFlag">返回</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerLatestReviewInfoTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="businessType" label="业务类型" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('reviewBusinessType', scope.row.businessType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="appSerialNumber" label="申请单编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="latestRiskIncomingStatus" label="进件状态" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('latestRiskIncomingStatus', scope.row.latestRiskIncomingStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="latestRiskWithdrawalStatus" label="提现状态" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('latestRiskWithdrawalStatus', scope.row.latestRiskWithdrawalStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="latestRiskInsuranceStatus" label="保险状态" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('latestRiskInsuranceStatus', scope.row.latestRiskInsuranceStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="latestRiskAuthMoney" label="授信额度" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="latestMaxProductQuota" label="最大提现额度限制" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="totalIncreaseQuota" label="总提额额度" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="totalCreditQuota" label="总授信额度" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="againsubmitAuditTime" label="可再次提交审核时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="isDiversionLoanSupermarket" label="是否导流到贷款超市" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('isDiversionLoanSupermarket', scope.row.isDiversionLoanSupermarket)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="settleOrderStatus" label="订单结清状态" header-align="center" align="center" min-width="110">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('settleOrderStatus', scope.row.settleOrderStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="160"/>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        appName: 6,
        customerId: null,
        businessType: 3
      },
      customerLatestReviewInfoWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showBackFlag: false,
      phone: null
    }
  },
  created () {
    this.initList()
  },
  methods: {
    back () {
      this.$router.push({name: 'customerInfo', params: {appName: this.$route.params.appName, phone: this.phone, customerId: this.$route.params.customerId, businessType: this.$route.params.businessType}})
    },
    async initList () {
      let appName = this.$route.params.appName
      let customerId = this.$route.params.customerId
      let businessType = this.$route.params.businessType
      let phone = this.$route.params.phone
      if (appName && customerId && businessType) {
        this.searchForm.appName = appName
        this.searchForm.customerId = customerId
        this.searchForm.businessType = businessType
        this.phone = phone
        this.showBackFlag = true
        this.list()
      }
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/customer/latest-review-infos', params)
        if (res.code === '200') {
          this.tableData = res.data
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
        this.selectIds.push(v.latestReviewInfoId)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
