<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="标题查询：">
        <el-input v-model="searchForm.name" placeholder="支持模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="APP平台：">
        <el-select v-model="searchForm.creditAgency" clearable placeholder="请选择">
          <el-option v-for="item in globalConfig.appNames" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="guideList">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增弹窗</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="guidePageTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55"/>-->
      <el-table-column prop="id" label="序号" header-align="center" align="center"/>
      <el-table-column prop="appName" :formatter="formatAppNum" label="APP平台" header-align="center" align="center"/>
      <el-table-column prop="title" label="标题" header-align="center" align="center"/>
      <el-table-column prop="skip" :formatter="formatSkip" label="是否支持跳过" header-align="center" align="center"/>
      <el-table-column prop="terminal" :formatter="formatTerminal" label="生效终端" header-align="center" align="center"/>
      <el-table-column prop="version" label="开始版本" header-align="center" align="center"/>
      <el-table-column prop="status" :formatter="formatStatus" label="状态" header-align="center" align="center"/>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editVariable(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeVariable(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>
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
    <add :ifshow="showAddFlag" :judges="judges" :terminals="terminals" @handleCloseDialog="showAddFlag=false;guideList();"></add>
    <edit :ifshow="showEditFlag" :guidePage="guidePage" :judges="judges" :terminals="terminals" @handleCloseDialog="showEditFlag=false;guideList();"></edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        name: null,
        type: null
      },
      guidePage: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false,
      judges: [{
        value: 1,
        label: '<'
      }, {
        value: 2,
        label: '<='
      }, {
        value: 3,
        label: '='
      }, {
        value: 4,
        label: '>'
      }, {
        value: 5,
        label: '=>'
      }],
      terminals: [{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '安卓'
      }, {
        value: 3,
        label: 'IOS'
      }, {
        value: 4,
        label: '未知'
      }]
    }
  },
  created () {
    this.guideList()
  },
  methods: {
    formatTerminal (row, col, val) {
      let label = null
      this.terminals.forEach(ter => {
        if (ter.value === val) {
          label = ter.label
        }
      })
      return label
    },
    async guideList () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/config/guide-page/page', params)
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
      this.guideList()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.guideList()
    },
    handleSelectionChange (val) {
      this.selectIds = []
      val.forEach(v => {
        this.selectIds.push(v.id)
      })
    },
    editVariable (row) {
      this.showEditFlag = true
      this.guidePage = row
    },
    removeVariable (row) {
      let selectIdsStr = ''
      let idsLength = this.selectIds.length
      if (row instanceof Event) {
        if (idsLength > 0) {
          this.selectIds.forEach(v => {
            selectIdsStr += `${v},`
          })
          selectIdsStr = selectIdsStr.substring(0, selectIdsStr.length - 1)
        } else {
          this.$message.warning('至少选择一条记录')
          return
        }
      } else {
        this.$refs.guidePageTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/config/guide-page/del/${selectIdsStr}`
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(url)
          if (res.code === '200') {
            this.$message.success('删除成功!')
            // this.list()
            this.selectIds.forEach(v => {
              let i = this.tableData.findIndex(s => s.id === v)
              this.tableData.splice(i, 1)
            })
            this.total -= idsLength
            if (idsLength === tableLength) {
              this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1
              this.guideList()
            }
          } else {
            this.$message.error(res.message)
          }
          this.selectIds = []
        } catch (err) {
          console.error(err)
        }
      }).catch(action => {
        this.selectIds = []
      })
    }
  },
  components: {
    'add': () => import('./guide_add'),
    'edit': () => import('./guide_edit')
  }
}
</script>

<style scoped lang="stylus">
</style>
