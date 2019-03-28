<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-select v-model="searchForm.indexDb" placeholder="请选择" style="width: 125px">
          <el-option v-for="item in $formatter.getSelectionOptions('projects')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="key">
        <el-input v-model="searchForm.key" clearable />
      </el-form-item>
      <el-form-item>
        <div>
          <el-radio-group v-model="searchForm.typeTemp"  fill="#009688" @change="changeType">
            <el-radio-button label="string"></el-radio-button>
            <el-radio-button label="list"></el-radio-button>
            <el-radio-button label="hash"></el-radio-button>
            <el-radio-button label="set"></el-radio-button>
            <el-radio-button label="zset"></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="values" v-show="valuesIfShow">
        <el-input style="width: 180px" v-model="searchForm.hashFieldVal" clearable placeholder="values"/>
      </el-form-item>
      <el-form-item label="查询条数" v-show="countIfShow">
        <el-input v-model="searchForm.start" clearable placeholder="开始索引" style="width: 103px"/>
        <el-input v-model="searchForm.end" clearable placeholder="结束索引" style="width: 103px"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" style="height: auto">
      <div slot="header" class="clearfix">
        <span style="color: #9ea4a9">有效时间：{{this.displayData.expTime}} &emsp;&emsp;&emsp;&emsp; 数量：{{this.displayData.num}}</span>
      </div>
      <el-input
        type="textarea"
        autosize
        style="height: auto"
        v-model="displayData.value">
      </el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        indexDb: null,
        key: null,
        typeTemp: 'string',
        hashFieldVal: null,
        start: 0,
        end: 100
      },
      countIfShow: false,
      valuesIfShow: false,
      displayData: {
        expTime: null,
        num: null,
        value: null
      }
    }
  },
  methods: {
    changeType (type) {
      if (type === 'string' || type === 'set') {
        this.countIfShow = false
        this.valuesIfShow = false
      }
      if (type === 'list' || type === 'zset') {
        this.countIfShow = true
        this.valuesIfShow = false
      }
      if (type === 'hash') {
        this.countIfShow = false
        this.valuesIfShow = true
      }
    },
    async search () {
      try {
        let indexDb = this.searchForm.indexDb
        if (!indexDb) {
          this.$message.error('项目名称不能为空!')
          return
        }
        let key = this.searchForm.key
        if (!key) {
          this.$message.error('key不能为空!')
          return
        }
        let typeTemp = this.searchForm.typeTemp
        if (!typeTemp) {
          this.$message.error('redis数据类型不能为空!')
          return
        }
        if (typeTemp === 'zset' || typeTemp === 'list') {
          if (this.searchForm.start == null || !this.searchForm.end == null) {
            this.$message.error('该类型下标不能为空!')
            return
          }
        }
        const res = await this.$http.post('/management/redis/query/' + this.searchForm.indexDb, this.searchForm)
        if (res.code === '200') {
          if (res.data) {
            this.displayData.expTime = res.data.expTime
            this.displayData.num = res.data.num
            if (typeof res.data.value === 'string') {
              try {
                this.displayData.value = JSON.stringify(JSON.parse(res.data.value), null, 2)
              } catch (e) {
                this.displayData.value = res.data.value
              }
            } else {
              this.displayData.value = JSON.stringify(res.data.value, null, 2)
            }
          } else {
            this.$message.error({
              message: '没有数据',
              duration: 600
            })
          }
        } else {
          this.$message.error({
            message: res.message,
            duration: 1500
          })
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
