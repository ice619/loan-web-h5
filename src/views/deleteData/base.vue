<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phoneNum" clearable placeholder="手机号"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
      <h3>基本信息</h3>
      <el-card>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">手机号码</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.phoneNum}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">IP地址</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.ipAddress}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册来源</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('source', baseInfo.source)}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.registerTime}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">设备号</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">{{baseInfo.deviceId}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">下载渠道</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.downloadChannel}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">邀请人手机号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{baseInfo.invitePhone}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">注册手机系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">{{$formatter.simpleFormatSelection('appType', baseInfo.osVersion)}}</div>
          </el-col>
        </el-row>
        <el-row  justify="center">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <el-button :disabled="disableRemove" style="color: white;background-color: #96363e;" type="primary" icon="el-icon-delete" @click="deleteData">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: 21,
        phoneNum: null
      },
      disableRemove: true,
      baseInfo: {},
      deleteForm: {
        appName: null,
        phoneNum: null
      }
    }
  },
  methods: {
    async search () {
      this.baseInfo = {}
      try {
        let appName = this.searchForm.appName
        if (!appName) {
          this.$message.error('APP名称不能为空!')
          return
        }
        let phone = this.searchForm.phoneNum
        if (!phone) {
          this.$message.error('手机号不能为空!')
          return
        }
        const res = await this.$http.post('/customer/base-info', this.searchForm)
        if (res.code === '200') {
          if (res.data) {
            this.baseInfo = res.data
            if (this.baseInfo) {
              this.disableRemove = false
            }
            this.deleteForm.appName = this.searchForm.appName
            this.deleteForm.phoneNum = this.searchForm.phoneNum
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    deleteData () {
      let appName = this.deleteForm.appName
      if (!appName) {
        this.$message.error('APP名称不能为空!')
        return
      }
      let phone = this.deleteForm.phoneNum
      if (!phone) {
        this.$message.error('手机号不能为空!')
        return
      }
      this.$confirm('此操作将永久删除该用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(appName)
        console.log(phone)
        const res = await this.$http.delete('/delete-data/' + appName + '/' + phone)
        console.log(res)
        if (res.code === '200') {
          this.$message.info('删除成功！')
          this.baseInfo = {}
          this.disableRemove = true
        } else {
          this.$message.error(res.message)
        }
      }).catch((err) => {
        console.error(err)
      })
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
