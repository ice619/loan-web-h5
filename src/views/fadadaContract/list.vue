<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="创建时间：">
            <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间"
                            value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>~
            <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间"
                            value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="APP平台：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="合同签署状态：">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('fddcontractState')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <br/>
      <el-form-item label="资金渠道：">
        <el-select v-model="searchForm.channel" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('fddcontractChannel')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="账务交易订单编号：">
          <el-input v-model="searchForm.applicationId" />
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="switchTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP平台" header-align="center" align="center" min-width="80px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="合同签署状态" header-align="center" align="center" min-width="80px"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('fddcontractState', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="failureTimes" label="失败次数" header-align="center" align="center" min-width="60px"  show-overflow-tooltip/>
      <el-table-column prop="contractNo" label="合同编号" header-align="center" align="center" min-width="300px"  show-overflow-tooltip/>
      <el-table-column prop="applicationId" label="账务交易订单编号" header-align="center" align="center" min-width="210px"  show-overflow-tooltip/>
      <el-table-column prop="customerId" label="客户编号" header-align="center" align="center" min-width="300px"  show-overflow-tooltip/>
      <el-table-column prop="phoneNum" label="APP注册手机号" header-align="center" align="center" min-width="150px" show-overflow-tooltip/>
      <el-table-column prop="name" label="客户姓名" header-align="center" align="center" min-width="120px" show-overflow-tooltip/>
      <el-table-column prop="idCardNo" label="身份证号码" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="domicileAddress" label="户籍住址" header-align="center" align="center" min-width="250px" show-overflow-tooltip/>
      <el-table-column prop="errorDescription" label="步骤处理异常描述" header-align="center" align="center" min-width="300px" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="channel" label="资金渠道" header-align="center" align="center" min-width="120px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('fddcontractChannel', parseInt(scope.row.channel))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="loanDays" label="产品周期" header-align="center" align="center" min-width="60px" show-overflow-tooltip/>
      <el-table-column prop="contractAmount" label="交易金额" header-align="center" align="center" min-width="60px" show-overflow-tooltip/>
      <el-table-column prop="interest" label="利息金额" header-align="center" align="center" min-width="60px" show-overflow-tooltip/>
      <el-table-column prop="signDate" label="交易开始日期" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="endDate" label="交易到期日期" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="signRate" label="签约利率" header-align="center" align="center" min-width="60px" show-overflow-tooltip/>
      <el-table-column prop="bankCard" label="银行卡卡号" header-align="center" align="center" min-width="210px" show-overflow-tooltip/>
      <el-table-column prop="bankName" label="银行卡开户行名称" header-align="center" align="center" min-width="120px" show-overflow-tooltip/>
      <el-table-column prop="customerCaId" label="(法大大)用户CA签章ID" header-align="center" align="center" min-width="300px" show-overflow-tooltip/>
      <el-table-column prop="companyId" label="(法大大)企业ID" header-align="center" align="center" min-width="300px" show-overflow-tooltip/>
      <el-table-column prop="templateId" label="(法大大)合同模板ID" header-align="center" align="center" min-width="300px" show-overflow-tooltip/>
      <el-table-column prop="downloadUrl" label="(法大大)合同下载地址" header-align="center" align="center" min-width="150px"  show-overflow-tooltip/>
      <el-table-column prop="viewpdfUrl" label="(法大大)合同查看地址" header-align="center" align="center" min-width="150px"   show-overflow-tooltip/>
      <el-table-column label="操作" header-align="center" align="center" min-width="120px" show-overflow-tooltip fixed="right">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="updataFailTime(scope.row)" type="text" size="small">失败次数清空</el-button>
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
        startTime: null,
        endTime: null,
        appName: null,
        state: null,
        channel: null,
        applicationId: null
      },
      entry: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      console.log(this.$formatter.simpleFormatSelection('fddcontractChannel', 1))
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/fadada-contract/page', params)
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
    async updataFailTime (row) {
      try {
        const res = await this.$http.post('/management/fadada-contract/update-failure-times-zero', row.contractNo)
        if (res.code === '200') {
          this.$message.success('清空成功')
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
