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
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
        <el-button @click="back" v-show="showBackFlag">返回</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="customerThirdPartyCertificationTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="285">
      </el-table-column>
      <el-table-column prop="businessType" label="业务类型" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('businessType', scope.row.businessType)}}</span>
        </template>
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
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="160"/>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        appName: 7,
        customerId: null
      },
      customerThirdPartyCertificationWindow: {},
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
      this.$router.push({name: 'customerInfo', params: {appName: this.$route.params.appName, phone: this.phone, customerId: this.$route.params.customerId}})
    },
    async initList () {
      let appName = this.$route.params.appName
      let customerId = this.$route.params.customerId
      let phone = this.$route.params.phone
      if (appName && customerId) {
        this.searchForm.appName = appName
        this.searchForm.customerId = customerId
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
        let appName = this.searchForm.appName
        if (!appName) {
          this.$message.error('应用名称不能为空')
          return
        }
        let customerId = this.searchForm.customerId
        if (!customerId) {
          this.$message.error('用户编号不能为空')
          return
        }
        const res = await this.$http.post('/management/customer/third-party-certification-info', params)
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
        this.selectIds.push(v.thirdPartyCertificationId)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
