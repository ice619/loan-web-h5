<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-plus" @click="showAddFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="faceLevelConfigTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <el-table-column prop="cardName" label="证件名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.cardName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="minFigureCheck" label="最小位数校验" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.minFigureCheck}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxFigureCheck" label="最小位数校验" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.maxFigureCheck}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="minFigureCheck" label="最小位数校验" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.minFigureCheck}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="charCheckType" label="字符形式" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('charCheckType', scope.row.charCheckType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="updateUser" label="操作人" header-align="center" align="center" min-width="130"/>
      <el-table-column prop="updateTime" label="操作时间" header-align="center" align="center" min-width="130"/>
      <el-table-column label="操作" header-align="center" align="center" min-width="50">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="remove(scope.row)" type="text" size="small">删除</el-button>
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
    <edit :ifshow="showEditFlag" :cardObj="cardObj" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        state: null
      },
      cardObj: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false,
      showDeleteFlag: false
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
        const res = await this.$http.post('/card-config/card-config-page', params)
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
      this.cardObj = row
    }
  },
  async remove (row) {
    this.showDeleteFlag = true
    this.$confirm('确认删除该条数据吗？', '提示', {type: 'warning'}).then(async () => {
      try {
        const res = await this.$http.delete('/card-config/remove', row)
        console.log(res)
        if (res.code === '200') {
          this.$message.success('删除成功!')
          this.list()
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    })
  },
  components: {
    'add': () => import('./add'),
    'edit': () => import('./edit')
  }
}
</script>

<style scoped lang="stylus">
</style>
