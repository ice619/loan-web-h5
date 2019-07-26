<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP平台:">
        <el-select v-model="searchForm.appName" clearable filterable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phoneNum" placeholder="手机号"/>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.customerId" placeholder="客户编号"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.createStartTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.createEndTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker v-model="searchForm.updateStartTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.updateEndTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="pageTable" :data="tableData" border stripe highlight-current-row height="750" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customerId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerState" label="客户状态" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('customerStatus', scope.row.customerState)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center"/>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-review" @click="showFullInfo(scope.row)" type="text" size="small">查看全量信息</el-button>
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
    <review :ifshow="showReviewFlag" :customerBaseInfo="customerBaseInfo" @handleCloseDialog="showReviewFlag=false;list();"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: this.GLOBAL.appName,
        customerId: null,
        phoneNum: null,
        createStartTime: null,
        createEndTime: null,
        updateStartTime: null,
        updateEndTime: null
      },
      tableData: [],
      customerBaseInfo: {},
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showReviewFlag: false
    }
  },
  created () {
    this.initSearchForm()
    this.list()
  },
  methods: {
    initSearchForm () {
      const now = new Date()
      this.searchForm.createStartTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.searchForm.createEndTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/customer/customer-page', params)
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
    },
    showFullInfo (row) {
      this.showReviewFlag = true
      this.customerBaseInfo = row
    }
  },
  components: {
    'review': () => import('./review')
  }
}
</script>

<style lang="stylus" scoped="scoped">
  .el-tooltip__popper {
    border-bottom: 500px
  }
  .el-tooltip {
  }
</style>
