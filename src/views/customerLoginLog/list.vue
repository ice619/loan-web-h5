<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户ID">
        <el-input v-model="searchForm.customerId" clearable placeholder="客户ID"></el-input>
      </el-form-item>
      <el-form-item label="注册手机号">
        <el-input v-model="searchForm.phoneNum" clearable placeholder="注册手机号"></el-input>
      </el-form-item>
      <el-form-item label="查询时间">
        <el-select v-model="searchForm.times"  placeholder="查询时间" style="width: 250px;">
          <el-option v-for="item in timesArray" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-search" @click="list">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerLoginLogTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="customerId" label="客户ID" header-align="center" align="center"/>
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="waistcoat" label="马甲包名称" header-align="center" align="center"/>
      <el-table-column prop="phoneNum" label="注册手机号" header-align="center" align="center"/>
      <el-table-column prop="requestId" label="请求流水号" header-align="center" align="center"/>
      <el-table-column prop="requestAgent" label="请求来源" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('requestAgents', scope.row.requestAgent)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="osVersion" label="手机操作系统" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('phoneOsVersion', Number(scope.row.osVersion))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sdkVersion" label="手机操作系统版本号" header-align="center" align="center"/>
      <el-table-column prop="phoneModel" label="当前手机型号" header-align="center" align="center"/>
      <el-table-column prop="market" label="应用下载渠道" header-align="center" align="center"/>
      <el-table-column prop="appVersion" label="APP版本号" header-align="center" align="center"/>
      <el-table-column prop="ipAddress" label="登录ip地址" header-align="center" align="center"/>
      <el-table-column prop="pushId" label="推送ID" header-align="center" align="center"/>
      <el-table-column prop="deviceId" label="手机设备码" header-align="center" align="center"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="90"/>
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
        times: null,
        appName: 21,
        phoneNum: null,
        customerId: null
      },
      timesArray: [],
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
      this.$http.get('/customer/select-times').then(res => {
        if (res && res.code === '200') {
          this.timesArray = res.data
        }
      }).catch(e => {
        this.$message.error('load customer times error')
        console.info(e)
      })
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        if (this.searchForm.times === null) {
          const now = new Date()
          this.searchForm.times = this.formatDate(now, 'yyyyMMdd') + ''
        }
        console.log(params)
        const res = await this.$http.post('/customer/select-login-log-info', params)
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
  watch: {
    'times': function () {
      this.searchForm.times = this.times.join(',')
      alert(this.searchForm.times)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
