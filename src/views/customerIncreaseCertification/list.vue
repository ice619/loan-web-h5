<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择APP名称">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号：">
        <el-input v-model="searchForm.customerId" clearable placeholder="请输入客户编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="认证时间">
        <el-date-picker v-model="searchForm.startCertificationTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        ~
        <el-date-picker v-model="searchForm.endCertificationTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerIncreaseCertificationTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="certificationType" label="认证类型" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('certificationType', scope.row.certificationType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="certificationStatus" label="认证状态" header-align="center" align="center" min-width="95">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('certificationStatus', scope.row.certificationStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="certificationTime" label="认证时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="160"/>
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
        customerId: null,
        startCertificationTime: null,
        endCertificationTime: null
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      phone: null
    }
  },
  created () {
    this.initSearchForm()
    this.list()
  },
  methods: {
    initSearchForm () {
      const now = new Date()
      this.searchForm.startCertificationTime = `${this.formatDate(now, 'yyyy-MM-dd')} 00:00:00`
      this.searchForm.endCertificationTime = `${this.formatDate(now, 'yyyy-MM-dd')} 23:59:59`
    },
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/customer/increase-certification-info', params)
        if (res.code === '200') {
          this.tableData = res.data.rows
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
        this.selectIds.push(v.increaseQuotaCertificationId)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
