<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="明文\密文手机号">
        <el-input v-model="searchForm.phoneNum" clearable placeholder="请输入手机号" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="是否按加密类型转换">
        <el-select v-model="searchForm.changeFlag" placeholder="请选择" clearable @change="encryptedPhoneStr">
          <el-option label="是" value="1"/>
          <el-option label="否" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="加密类型">
        <el-select v-model="searchForm.encryptType" placeholder="请选择加密类型">
          <!--<el-option v-for="item in $formatter.getSelectionOptions('encryptType')" :key="item.value" :label="item.label" :value="item.value"/>-->
          <el-option label="md5" value="md5"/>
          <el-option label="sha256" value="sha256"/>
        </el-select>
      </el-form-item>
      <el-form-item label="加密手机号">
        <el-input v-model="searchForm.encryptedPhone" clearable placeholder="请输入加密手机号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <h3>用户密文库</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">ID</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{info.id}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">明文手机号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{info.phone}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">加密手机号</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{info.encryptedPhone}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">加密类型</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{info.encryptType}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册渠道</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{info.market}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">创建时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light" v-if="info.createTime">{{formatDate(new Date(info.createTime), "yyyy-MM-dd hh:mm:ss")}}</div>
            <div class="grid-content bg-purple-light" v-else></div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import md5 from 'js-md5'
import sha256 from 'js-sha256'

export default {
  data () {
    return {
      searchForm: {
        appName: 7,
        phoneNum: null,
        changeFlag: null,
        encryptType: 'md5',
        encryptedPhone: null
      },
      info: {}
    }
  },
  created () {
  },
  methods: {
    async encryptedPhoneStr () {
      let phoneNum = this.searchForm.phoneNum
      if (!phoneNum) {
        // this.$message.error('明文\\密文手机号不能为空')
        return
      }
      if (this.searchForm.changeFlag === '1') {
        let encryptType = this.searchForm.encryptType
        if (!encryptType) {
          // this.$message.error('加密类型不能为空')
          return
        }
        if (encryptType === 'md5') {
          this.searchForm.encryptedPhone = md5(this.searchForm.phoneNum)
        } else if (encryptType === 'sha256') {
          this.searchForm.encryptedPhone = sha256(this.searchForm.phoneNum)
        }
      } else if (this.searchForm.changeFlag === '2') {
        this.searchForm.encryptedPhone = this.searchForm.phoneNum
      }
    },
    async search () {
      try {
        let encryptType = this.searchForm.encryptType
        if (!encryptType) {
          this.$message.error('加密类型不能为空')
          return
        }
        let encryptedPhone = this.searchForm.encryptedPhone
        if (!encryptedPhone) {
          this.$message.error('加密手机号不能为空')
          return
        }
        const res = await this.$http.post('/management/customer/encrypted-phone', this.searchForm)
        if (res.code === '200') {
          if (res.data.id === null) {
            this.$message.warning('查询无数据')
          }
          this.info = res.data
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

<style lang="stylus" scoped="scoped">
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
