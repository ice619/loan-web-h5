<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('faceState')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-plus" @click="showAddFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="faceLevelConfigTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="livenessScore" label="活体分阈值" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.livenessScore}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="similarity" label="人脸比对相似度阈值" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.similarity}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('faceState', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="130"/>
      <el-table-column label="操作" header-align="center" align="center" min-width="50">
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
    <edit :ifshow="showEditFlag" :faceObj="faceObj" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        state: null
      },
      faceObj: {},
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
        const res = await this.$http.post('/face-level/face-list', params)
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
      this.faceObj = row
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
