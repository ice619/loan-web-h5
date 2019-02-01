<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="应用名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phoneNum" clearable placeholder="手机号"/>
      </el-form-item>
      <!--<el-form-item label="过审记录创建时间">
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <h3>用户注册信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机操作系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('phoneOsVersion', parseInt(extInfo.osVersion))}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">操作系统版本号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{extInfo.sdkVersion}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">用户注册来源</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('registerSource', extInfo.source)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机设备码</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{extInfo.deviceId}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">APP版本号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{extInfo.appVersion}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">App下载渠道</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{extInfo.market}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">ip地址</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{extInfo.ipAddress}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">活动编号</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{extInfo.activityCode}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">邀请人手机号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{extInfo.invitePhone}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">邀请人客户编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{extInfo.inviteId}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">用户编号</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">{{extInfo.customerId}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">导流APP名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('appNames', parseInt(extInfo.diversionAppName))}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">导流客户编号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{extInfo.diversionCustomerId}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button style="color: white;background-color: #009688;" type="primary" @click="toLatestReview">客户最新审核信息</el-button>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button style="color: white;background-color: #009688;" type="primary" @click="toThirdPartyCertification">客户第三方认证信息</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
        </el-row>
      </el-card>
      <h3>基本信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">姓名</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.name}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">性别</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.gender}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">出生日期</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.birthDate}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">年龄</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.age}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">身份证</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.idCardNo}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">签发机关</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.signingOffice}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">有效期限</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.limitedTimes}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">学历</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('educationCode', parseInt(baseInfo.educationCode))}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">婚姻状况</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('ifMarriage', baseInfo.ifMarriage)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">民族</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.nation}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机号码</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.phoneNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">户籍住址</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple-light">{{baseInfo.domicileAddress}}</div>
          </el-col>
        </el-row>
      </el-card>
      <h3>紧急联系人信息</h3>
      <el-card>
        <el-table ref="icePersionTable" :data="tableData" border stripe >
          <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
          <el-table-column prop="icePersonOrder" label="紧急联系人排序" header-align="center" align="center" min-width="110">
            <template slot-scope="scope">
              <span>{{$formatter.simpleFormatSelection('icePersonOrder', parseInt(scope.row.icePersonOrder))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="紧急联系人类型" header-align="center" align="center" min-width="110">
            <template slot-scope="scope">
              <span>{{$formatter.simpleFormatSelection('icePersonType', parseInt(scope.row.type))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="trueName" label="联系人姓名" header-align="center" align="center" min-width="120"/>
          <el-table-column prop="phoneNum" label="联系人手机号码" header-align="center" align="center" min-width="120"/>
          <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="130"/>
          <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="130"/>
          <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="100"/>
        </el-table>
      </el-card>
      <h3>公司信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">行业名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.companyIndustryName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">公司名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.companyName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">公司电话</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.companyTel}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">公司地址</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">{{companyInfo.companyAddress}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">职业编号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.professionId}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">工作照url</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{companyInfo.workPhoto}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">街道地址</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">{{companyInfo.streetAddress}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">工作时长</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.workingHours}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">所在省份</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.provinceName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">所在城市</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.cityName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">城市区域</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.cityAreaName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">经度</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.lng}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">纬度</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{companyInfo.lat}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">备注</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{companyInfo.remark}}</div>
          </el-col>
        </el-row>
      </el-card>
      <h3>地址信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">省份名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{addressInfo.provinceName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">城市名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{addressInfo.cityName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">区域名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{addressInfo.cityAreaName}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">地址</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">{{addressInfo.cityAreaName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">居住地址</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{addressInfo.liveAddress}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">居住时长</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('liveTime', parseInt(addressInfo.liveTime))}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">地图坐标</div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">{{addressInfo.mapCoordinate}}</div>
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
        appName: 6,
        phoneNum: null
        // startTime: null,
        // endTime: null
      },
      baseInfo: {},
      companyInfo: {},
      addressInfo: {},
      extInfo: {}
    }
  },
  created () {
  },
  methods: {
    async search () {
      try {
        const res = await this.$http.post('/management/customer/base-info', this.searchForm)
        if (res.code === '200') {
          let costomer = res.data
          this.baseInfo = costomer.customerInfoVO
          this.companyInfo = costomer.customerCompanyVO
          this.addressInfo = costomer.customerAddressVO
          this.extInfo = costomer.customerExtVO
          this.tableData = costomer.icePersonsVO
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    async toLatestReview () {
      try {
        let appName = this.searchForm.appName
        if (!appName) {
          this.$message.error('应用名称不能为空')
          return
        }
        let customerId = this.extInfo.customerId
        if (!customerId) {
          this.$message.error('用户编号不能为空')
          return
        }
        this.$router.push({name: 'customerLatestReviewInfo', params: {appName: appName, customerId: customerId}})
      } catch (err) {
        console.error(err)
      }
    },
    async toThirdPartyCertification () {
      try {
        let appName = this.searchForm.appName
        if (!appName) {
          this.$message.error('应用名称不能为空')
          return
        }
        let customerId = this.extInfo.customerId
        if (!customerId) {
          this.$message.error('用户编号不能为空')
          return
        }
        this.$router.push({name: 'customerThirdPartyCertification', params: {appName: appName, customerId: customerId}})
      } catch (err) {
        console.error(err)
      }
    }
    // initSearchTime () {
    //   let now = new Date()
    //   this.searchForm.startTime = now.toJSON().substring(0, 10) + ' 00:00:00'
    //   this.searchForm.endTime = now.toJSON().substring(0, 10) + '23:59:59'
    // }
  },
  components: {
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
