<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder="模糊查询"/>
      </el-form-item>
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable filterable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showAddFlag = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="marketWindowTable" :data="tableData" border stripe highlight-current-row height="750" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
      <!--<el-table-column prop="id" label="ID" header-align="center" align="center"/>-->
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" placement="top" :content="scope.row.title">
            <div class="is-dark cell" style="margin-left:-10px;min-width: 50px;white-space: nowrap;">{{scope.row.title}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="popPosition" label="弹框位置" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('marketPositions', scope.row.popPosition)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="terminal" label="生效终端" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('terminals', scope.row.terminal)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startVersion" label="版本下限" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.startVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endVersion" label="版本上限" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.endVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="imageUrl" label="图片" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" placement="top" :content="scope.row.imageUrl">
            <div class="is-dark cell" style="margin-left:-10px;min-width: 50px;white-space: nowrap;">{{scope.row.imageUrl}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="popUrl" label="跳转链接" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" placement="top" :content="scope.row.popUrl">
            <div class="is-dark cell" style="margin-left:-10px;min-width: 50px;white-space: nowrap;">{{scope.row.popUrl}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" header-align="center" align="center"/>
      <el-table-column prop="endTime" label="结束时间" header-align="center" align="center"/>
      <el-table-column prop="priority" label="优先级" header-align="center" align="center"/>
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('statuses', scope.row.status)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editMarketWindow(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeMarketWindow(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>
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
    <edit :ifshow="showEditFlag" :marketWindow="marketWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        title: null,
        appName: 7
      },
      marketWindow: {},
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
      if (this.searchForm.title) {
        if (this.searchForm.title.length > 25) {
          this.$message.error('字符长度不能超过25')
          return
        }
      }
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/market-window/page', params)
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
    editMarketWindow (row) {
      this.showEditFlag = true
      this.marketWindow = row
    },
    removeMarketWindow (row) {
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
        this.$refs.marketWindowTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/management/market-window?ids=${selectIdsStr}`
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
              this.list()
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
    'add': () => import('./add'),
    'edit': () => import('./edit')
  }
}
</script>

<style lang="stylus" scoped="scoped">
  .el-tooltip__popper {
    border-bottom: 500px
  }
  .el-tooltip {
  }
</style>
