<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称：">
        <el-select v-model="searchForm.appName" placeholder="请选择APP名称">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号：">
        <el-input v-model="searchForm.customerId" clearable placeholder="请输入客户编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
        <el-button @click="back" v-show="showBackFlag">返回</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerLatestReviewInfoTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="appSerialNumber" label="(最新)申请单编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="latestRiskIncomingStatus" label="进件状态" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('auditingState', scope.row.latestRiskIncomingStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastReviewTime" label="最新申请时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="againsubmitAuditTime" label="可再次提交审核时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="repeatReviewData" label="需补充资料类型" header-align="center" align="center" min-width="160" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="160"/>
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
        customerId: null
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
    this.list()
  },
  methods: {
    back () {
      this.$router.push({name: 'customerInfo', params: {appName: this.$route.params.appName, phone: this.phone, customerId: this.$route.params.customerId}})
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/customer/latest-review-infos', params)
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
        this.selectIds.push(v.latestReviewInfoId)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
