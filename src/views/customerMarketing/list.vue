<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间">
        <el-date-picker v-model="createTime" type="datetimerange" range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="注册手机号">
        <el-input v-model="searchForm.phoneNum" clearable placeholder="注册手机号"></el-input>
      </el-form-item>
      <el-form-item label="应用下载渠道">
        <el-input v-model="searchForm.market" clearable placeholder="应用下载渠道"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-search" @click="list">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerMarketingTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="注册手机号" header-align="center" align="center"/>
      <el-table-column prop="source" label="注册来源" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('registerSource', scope.row.source)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="market" label="应用下载渠道" header-align="center" align="center"/>
      <el-table-column prop="ipAddress" label="登录ip地址" header-align="center" align="center"/>
      <el-table-column prop="osVersion" label="手机操作系统" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('osVersion', Number(scope.row.osVersion))}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="sdkVersion" label="手机操作系统版本号" header-align="center" align="center"/>-->
      <!--<el-table-column prop="appVersion" label="APP版本号" header-align="center" align="center"/>-->
      <!--<el-table-column prop="deviceId" label="手机设备码" header-align="center" align="center"/>-->
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
      createTime: [],
      searchForm: {
        startTime: null,
        endTime: null,
        appName: 7,
        phoneNum: null,
        market: null
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
      // this.searchForm.tableName = `customer_login_log_${this.formatDate(now, 'yyyyMMdd')}`
      this.searchForm.startTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.searchForm.endTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
      this.createTime = [this.searchForm.startTime, this.searchForm.endTime]
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
        if (this.createTime) {
          params.startTime = this.createTime[0]
          params.endTime = this.createTime[1]
        }
        const res = await this.$http.post('/management/customer-marketing/page', params)
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
