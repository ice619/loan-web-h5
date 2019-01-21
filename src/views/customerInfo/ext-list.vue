<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd hh:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd hh:mm:ss"/>
      </el-form-item>
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道">
        <el-input v-model="searchForm.market" clearable placeholder="请输入渠道"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerExtTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="createTime" label="注册时间" header-align="center" align="center" min-width="180"/>
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="285"/>
      <el-table-column prop="phoneNum" label="手机号码" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="appVersion" label="APP版本号" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="market" label="下载渠道" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="source" label="注册来源" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('registerSource', scope.row.source)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="osVersion" label="操作系统" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('phoneOsVersion', parseInt(scope.row.osVersion))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sdkVersion" label="手机操作系统版本号" header-align="center" align="center" min-width="100"/>
      <el-table-column prop="inviteId" label="邀请人客户编号" header-align="center" align="center" min-width="285"/>
      <el-table-column prop="invitePhone" label="邀请人手机号" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="activityCode" label="活动编号" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="deviceId" label="手机设备码" header-align="center" align="center" min-width="200"/>
      <el-table-column prop="ipAddress" label="ip地址" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="diversionAppName" label="导流APP名称" header-align="center" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', parseInt(scope.row.diversionAppName))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="diversionCustomerId" label="导流客户编号" header-align="center" align="center" min-width="285"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="180"/>
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
        appName: null,
        startTime: null,
        endTime: null,
        market: null
      },
      customerExtWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/customer/customer-ext/page', params)
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
        this.selectIds.push(v.customerExtId)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
