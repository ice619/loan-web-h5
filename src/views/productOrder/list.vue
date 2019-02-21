<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.createTime" type="datetimerange" range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="应用名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.customerId" clearable placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="主交易订单号">
        <el-input v-model="searchForm.applicationId" clearable placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-search" @click="list">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="productOrderTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productOrderNo" label="保单订单号" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="payTime" label="付款时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="insuranceHolder" label="投保人" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="applicationId" label="账务订单编号" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="orderState" label="订单状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('productOrderStates', scope.row.orderState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="insuranceNo" label="保险公司保险单号" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="outTradeNo" label="外部交易单号" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="orderName" label="订单名称" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="orderAmount" label="订单金额" header-align="center" align="center"/>
      <el-table-column prop="fullPremium" label="未优惠前保费金额" header-align="center" align="center"/>
      <el-table-column prop="realMoney" label="本金" header-align="center" align="center"/>
      <el-table-column prop="count" label="购买数量" header-align="center" align="center"/>
      <el-table-column prop="loanDays" label="产品周期" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="insuranceStartTime" label="保单开始时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="insuranceEndTime" label="保单结束时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="goodsName" label="商品名称" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="goodsDesc" label="商品描述" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="planeQuota" label="飞机保险额度" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="trainQuota" label="轮船保险额度" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="streamShipQuota" label="火车保险额度" header-align="center" align="center" min-width="90"/>
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
        startTime: null,
        endTime: null,
        createTime: [],
        appName: 6,
        customerId: null,
        applicationId: null
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    this.initSearchForm()
    this.list()
  },
  methods: {
    initSearchForm () {
      const now = new Date()
      this.searchForm.tableName = `customer_login_log_${this.formatDate(now, 'yyyyMMdd')}`
      this.searchForm.startTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.searchForm.endTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
      this.searchForm.createTime = [this.searchForm.startTime, this.searchForm.endTime]
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        params.startTime = null
        params.endTime = null
        if (params.createTime) {
          params.startTime = params.createTime[0]
          params.endTime = params.createTime[1]
        }
        const res = await this.$http.post('/management/product-order/page', params)
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
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
