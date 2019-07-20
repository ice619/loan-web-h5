<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" placeholder="请选择" style="width: 140px">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="流水号">-->
        <!--<el-input v-model="searchForm.serialNumber" maxlength="30" clearable placeholder="唯一流水号" style="width: 200px"/>-->
      <!--</el-form-item>-->
      <el-form-item label="手机号">
        <el-input v-model="searchForm.customerPhone" maxlength="30" clearable placeholder="奖励客户手机号" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="活动编码">
        <el-input v-model="searchForm.activityCode" maxlength="20" clearable placeholder="活动编码" style="width: 150px"/>
      </el-form-item>
      <el-form-item label="发送状态">
        <el-select v-model="searchForm.status" clearable placeholder="请选择" style="width: 100px">
          <el-option v-for="item in $formatter.getSelectionOptions('rewardSendStatus')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间：">
        <el-col>
          <el-date-picker v-model="searchForm.sendTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/> -
          <el-date-picker v-model="searchForm.sendTimeTo" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 195px"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list" v-if="$permission.hasPermission('CUSTOMER_REWARD_RECORD_SELECT')">查询</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus"  @click="showAddFlag = true" v-if="$permission.hasPermission('CUSTOMER_REWARD_MANUAL_SEND')">发送</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityCode" label="活动编码" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="materialCode" label="物料编码" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="customerPhone" label="手机号" header-align="center" align="center" min-width="150"/>
      <el-table-column prop="sendUser" label="发送人" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="sendTime" label="发送时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="remark" label="发送备注" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="sendStatus" label="发送状态" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('rewardSendStatus', scope.row.sendStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="errorMsg" label="失败原因" header-align="center" align="center" min-width="150" show-overflow-tooltip/>
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
        serialNumber: null,
        customerId: null,
        customerPhone: null,
        customerState: null,
        activityType: null,
        activityCode: null,
        materialType: null,
        materialCode: null,
        beInviterCustomerId: null,
        beInviterCustomerPhone: null,
        beInviterCustomerState: null,
        sendTime: this.formatDate(new Date(), 'yyyy-MM-dd 00:00:00'),
        sendTimeTo: this.formatDate(new Date(), 'yyyy-MM-dd 23:59:59'),
        status: null
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false
    }
  },
  created () {
    if (this.$permission.hasPermission('CUSTOMER_REWARD_RECORD_SELECT')) {
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
        const res = await this.$http.post('/customer-reward-record/page', params)
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
    }
  },
  components: {
    'add': () => import('./manualSend')
  }
}
</script>

<style scoped lang="stylus">
</style>
