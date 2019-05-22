<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="申请单编号：">
        <el-input v-model="searchForm.applicationId" clearable placeholder="请输入申请单编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button @click="back" v-show="showBackFlag">返回</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <h3>调用风控接口记录</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">应用名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('appNames', info.appName)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">用户编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{info.customerId}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">申请单编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{info.applicationId}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">业务类型</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('reviewBusinessType', info.businessType)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">创建时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="info.createTime">{{formatDate(new Date(info.createTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">请求参数</div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content">
              <vue-json-pretty :data="this.requestParamsJson" :showLength="true" :highlightMouseoverNode="true" :deep="4"></vue-json-pretty>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">响应参数</div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content">
              <vue-json-pretty :data="this.responseParamsJson" :showLength="true" :highlightMouseoverNode="true" :deep="4"></vue-json-pretty>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  components: {
    VueJsonPretty
  },
  data () {
    return {
      searchForm: {
        applicationId: null
      },
      info: {},
      showBackFlag: false,
      params: {
        customerId: null,
        appSerialNumber: null,
        appName: null,
        startTime: null,
        endTime: null,
        status: null,
        auditingState: null,
        applicationType: null,
        applicationId: null
      },
      requestParamsJson: { '': '' },
      responseParamsJson: { '': '' }
    }
  },
  created () {
    this.initInfo()
  },
  methods: {
    back () {
      this.$router.push({name: 'customerReviewPushRiskLog', params: this.params})
    },
    async initInfo () {
      this.params.customerId = this.$route.params.customerId
      this.params.appSerialNumber = this.$route.params.appSerialNumber
      this.params.appName = this.$route.params.appName
      this.params.startTime = this.$route.params.startTime
      this.params.endTime = this.$route.params.endTime
      this.params.status = this.$route.params.status
      this.params.auditingState = this.$route.params.auditingState
      this.params.applicationType = this.$route.params.applicationType
      let applicationId = this.$route.params.applicationId
      this.params.applicationId = applicationId
      if (applicationId) {
        this.searchForm.applicationId = applicationId
        this.showBackFlag = true
        this.search()
      }
    },
    async search () {
      try {
        let applicationId = this.searchForm.applicationId
        if (!applicationId) {
          this.$message.error('申请单编号不能为空')
          return
        }
        const res = await this.$http.post('/management/mongodb/risk-interface-record', this.searchForm)
        if (res.code === '200') {
          if (res.data.applicationId === null) {
            this.$message.warning('查询无数据')
          }
          this.info = res.data
          if (this.info.requestParams) {
            this.requestParamsJson = JSON.parse(this.info.requestParams)
          }
          if (this.info.responseParams) {
            this.responseParamsJson = JSON.parse(this.info.responseParams)
          }
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

<style lang="stylus">
  h3 {
    margin: 15px 0 5px 0;
    font-weight: 400;
    color: #606266;
  }
  .bg-purple {
    text-align: center;
    vertical-align: middle;
    border:1px solid #ebeef5;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .bg-purple-light {
    text-align: left;
    border:1px solid #ebeef5;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .grid-content {
    min-height: 50px;
    padding: 5px;
  }
</style>
