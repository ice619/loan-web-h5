<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="应用名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="searchForm.state">
          <el-radio-button :label="null">ALL</el-radio-button>
          <el-radio-button :label="true">正常</el-radio-button>
          <el-radio-button :label="false">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="pageIndex=1;list();">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showEditFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="systemDictTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="dictionaryId" label="序号" header-align="center" align="center"/>
      <el-table-column prop="appName" label="应用名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="编码" header-align="center" align="center"/>
      <el-table-column prop="value" label="名称/标题/值" header-align="center" align="center"/>
      <el-table-column prop="remark" label="备注" header-align="center" align="center"/>
      <el-table-column prop="state" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span :style="{color: scope.row.state === 1 ? '#13ce66' : '#ff4949'}">{{scope.row.state === 1 ? '正常' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editDictBig(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-edit" @click="showSmallList(scope.row)" type="text" size="small">配置小类</el-button>
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
    <!--子组件-->
    <edit :ifshow="showEditFlag" :systemDict="systemDict" @handleCloseDialog="showEditFlag=false;systemDict=null;list();"></edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        appName: null,
        state: null
      },
      systemDict: null,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      dicStatues: [{
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '停用'
      }],
      showEditFlag: false,
      showSmallListFlag: false
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/system-dict/list', params)
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
    editDictBig (row) {
      this.showEditFlag = true
      this.systemDict = row
    },
    showSmallList (row) {
      this.showSmallListFlag = true
      this.systemDict = row
    }
  },
  components: {
    'edit': () => import('./edit')
  }
}
</script>

<style lang="stylus">
</style>
