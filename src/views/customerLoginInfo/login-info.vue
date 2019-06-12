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
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="loginInfo">搜索</el-button>
        <el-button @click="back" v-show="showBackFlag">返回</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <h3>客户首次登录信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机号码</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{firstInfo.phoneNum}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">APP名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('appNames', firstInfo.appName)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">用户编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{firstInfo.customerId}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">登录时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="firstInfo.loginTime">{{formatDate(new Date(firstInfo.loginTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机操作系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('phoneOsVersion', parseInt(firstInfo.osVersion))}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">APP版本号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{firstInfo.appVersion}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册渠道</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{firstInfo.market}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">创建时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="firstInfo.createTime">{{formatDate(new Date(firstInfo.createTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
        </el-row>
      </el-card>
      <h3>客户最新登录信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机号码</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{latestInfo.phoneNum}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">APP名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('appNames', latestInfo.appName)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">用户编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{latestInfo.customerId}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">登录时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="latestInfo.loginTime">{{formatDate(new Date(latestInfo.loginTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">登录总次数</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{latestInfo.count}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册渠道</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{latestInfo.market}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机操作系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('phoneOsVersion', parseInt(latestInfo.osVersion))}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">APP版本号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{latestInfo.appVersion}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">创建时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="latestInfo.createTime">{{formatDate(new Date(latestInfo.createTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">修改时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="latestInfo.updateTime">{{formatDate(new Date(latestInfo.updateTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
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
      firstInfo: {},
      latestInfo: {},
      showBackFlag: false,
      phone: null
    }
  },
  created () {
    this.initLoginInfo()
  },
  methods: {
    back () {
      this.$router.push({name: 'customerInfo', params: {appName: this.$route.params.appName, phone: this.phone, customerId: this.$route.params.customerId}})
    },
    async initLoginInfo () {
      let appName = this.$route.params.appName
      let customerId = this.$route.params.customerId
      let phone = this.$route.params.phone
      if (appName && (customerId || phone)) {
        this.searchForm.appName = appName
        this.searchForm.customerId = customerId
        this.phone = phone
        this.showBackFlag = true
        this.loginInfo()
      }
    },
    async loginInfo () {
      try {
        let appName = this.searchForm.appName
        if (!appName) {
          this.$message.error('APP名称不能为空')
          return
        }
        let customerId = this.searchForm.customerId
        if (!customerId) {
          this.$message.error('用户编号不能为空')
          return
        }
        const res = await this.$http.post('/management/customer/login-info', this.searchForm)
        if (res.code === '200') {
          let customerLoginInfo = res.data
          this.firstInfo = customerLoginInfo.customerFirstLoginInfoBO
          this.latestInfo = customerLoginInfo.customerLatestLoginInfoBO
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
    min-height: 40px;
    padding: 5px;
  }
</style>
