<template>
  <div class="border">
    <el-dialog title="数据字典小类" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showEditFlag=true">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="dictSmallTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="序号" header-align="center" align="center"/>
        <el-table-column prop="dicSmallCode" label="小类编码" header-align="center" align="center"/>
        <el-table-column prop="dicSmallValue" label="小类中文名称" header-align="center" align="center"/>
        <el-table-column prop="dicSmallStaues" label="小类使用状态" header-align="center" align="center">
          <template slot-scope="scope">
            <span :style="{color: scope.row.dicSmallStaues === '1' ? '#13ce66' : '#ff4949'}">{{scope.row.dicSmallStaues === '1' ? '正常' : '停用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" header-align="center" align="center"/>
        <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"/>
        <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center"/>

        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="editDictSmall(scope.row)" type="text" size="small">编辑</el-button>
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
      <small-edit :ifshow="showEditFlag" :dictBigId="searchForm.dictBigId" :dictSmall="dictSmall" @handleCloseDialog="showEditFlag=false;dictSmall=null;list();"></small-edit>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    'ifshow': Boolean,
    'dictBig': Object
  },
  data () {
    return {
      searchForm: {
        dictBigId: null
      },
      dictSmall: null,
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
      showEditFlag: false
    }
  },
  created () {
    this.list()
  },
  methods: {
    openDialog () {
      if (this.dictBig) {
        this.searchForm.dictBigId = this.dictBig.id
        this.list()
      }
    },
    closeDialog () {
      this.$emit('handleCloseDialog')
    },
    async list () {
      if (!this.dictBig) {
        return
      }
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/dict-small/list', params)
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
    editDictSmall (row) {
      this.showEditFlag = true
      this.dictSmall = row
    }
  },
  components: {
    'small-edit': () => import('./small-edit')
  }
}
</script>

<style lang="stylus">
</style>
