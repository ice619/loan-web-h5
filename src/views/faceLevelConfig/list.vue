<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="faceLevelConfigTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faceRecognitionLevel" label="人脸识别级别" header-align="center" align="center"/>
      <el-table-column prop="positiveIdCardLevel" label="身份证正面身份认证级别" header-align="center" align="center" min-width="120px"/>
      <el-table-column prop="identifyResultLevel" label="身份综合验证级别" header-align="center" align="center" min-width="120px"/>
      <el-table-column prop="oppositeIdCardLevel" label="反面身份认证级别" header-align="center" align="center" min-width="120px"/>
      <el-table-column prop="state" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('state', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="center"/>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="modifyMan" label="修改人" header-align="center" align="center"/>
      <el-table-column label="操作" header-align="center" align="left">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
    <add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>
    <edit :ifshow="showEditFlag" :faceLevelConfigWindow="faceLevelConfigWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        userTag: null,
        appName: null,
        status: null
      },
      faceLevelConfigWindow: {},
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
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/face-level/page', params)
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
    edit (row) {
      this.showEditFlag = true
      this.faceLevelConfigWindow = row
    }
  },
  components: {
    'add': () => import('./add'),
    'edit': () => import('./edit')
  }
}
</script>

<style scoped lang="stylus">
</style>
