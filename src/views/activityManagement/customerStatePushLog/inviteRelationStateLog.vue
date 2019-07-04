<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" placeholder="请选择" style="width: 140px">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="searchForm.serialNumber" maxlength="30" clearable placeholder="唯一流水号" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="客户ID">
        <el-input v-model="searchForm.customerId" maxlength="30" clearable placeholder="奖励人客户ID" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="客户手机号">
        <el-input v-model="searchForm.customerPhone" maxlength="30" clearable placeholder="奖励客户手机号" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="发送时间：">
        <el-col>
          <el-date-picker v-model="searchForm.sendTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/> -
          <el-date-picker v-model="searchForm.sendTimeTo" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list" v-if="$permission.hasPermission('CUSTOMER_STATE_SELECT')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="serialNumber" label="流水号" header-align="center" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.serialNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="customerId" label="客户ID" header-align="center" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.customerId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerPhone" label="客户手机号" header-align="center" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.customerPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerState" label="客户状态" header-align="center" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('customerState', scope.row.customerState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviterCustomerId" label="邀请人客户ID" header-align="center" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.inviterCustomerId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviterCustomerPhone" label="被邀请人客户手机号" header-align="center" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.inviterCustomerPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatTimeStamp(scope.row.createTime,'yyyy-MM-dd hh:mm:ss')}}</span>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: 21,
        serialNumber: null,
        customerId: null,
        customerPhone: null,
        customerState: null,
        inviterCustomerId: null,
        inviterCustomerPhone: null,
        createTime: null,
        sendTime: this.formatDate(new Date(), 'yyyy-MM-dd 00:00:00'),
        sendTimeTo: this.formatDate(new Date(), 'yyyy-MM-dd 23:59:59')
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: []
    }
  },
  created () {
    if (this.$permission.hasPermission('CUSTOMER_STATE_SELECT')) {
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
        const res = await this.$http.post('/customer-state-push/find-relation-state-list', params)
        console.log(res)
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
