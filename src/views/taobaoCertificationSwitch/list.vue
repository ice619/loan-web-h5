<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道">
        <el-input v-model="searchForm.channel" placeholder="渠道"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('state')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-search" @click="list">搜索</el-button>
        <el-button style="color: white;background-color: #009688;" icon="el-icon-plus" @click="showAddFlag=true">添加淘宝认证开关</el-button>
        <el-button type="danger" icon="el-icon-edit" @click="batchDelete">批量删除</el-button>
        <el-switch v-model="defaultState" active-color="#13ce66" inactive-color="#ff4949" inactive-text="开关"
                   :active-value="1" :inactive-value="2" @change="changeState"></el-switch>
      </el-form-item>
    </el-form>
    <el-table ref="taobaoCertificationSwitchTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" header-align="center" align="center"/>
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appName', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channel" label="渠道" header-align="center" align="center"/>
      <el-table-column prop="state" label="状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('state', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="90"/>
      <el-table-column label="创建人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createManId}}</span>
          <span>{{scope.row.createManId === null || scope.row.createManId === ''|| scope.row.createMan === null || scope.row.createMan === '' ? '' : '-'}}</span>
          <span>{{scope.row.createMan}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" header-align="center" align="center" min-width="90"/>
      <el-table-column label="修改人" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.modifyManId}}</span>
          <span>{{scope.row.modifyManId === null || scope.row.modifyManId === '' || scope.row.modifyMan === null || scope.row.modifyMan === '' ? '' : '-'}}</span>
          <span>{{scope.row.modifyMan}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button icon="el-icon-delete" @click="removeCertification(scope.row)" type="text" size="small" style="color: #F56C6C">删除</el-button>
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
    <edit :ifshow="showEditFlag" :taobaoCertificationSwitchWindow="taobaoCertificationSwitchWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
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
      switchForm: {
        appName: 6,
        state: null,
        channel: 'ALL',
        id: 1
      },
      taobaoCertificationSwitchWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showAddFlag: false,
      showEditFlag: false,
      defaultState: null,
      status: 1,
      defaultStateId: null
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
        const res = await this.$http.post('/management/taobao-certification-switch/page', params)
        if (res.code === '200') {
          this.tableData = res.data.rows
          this.total = res.data.total
          let row = this.tableData.find(s => s.channel === 'ALL')
          if (row) {
            this.defaultStateId = row.id
            this.defaultSwitchChannel = row.channel
            this.defaultState = row.state
            this.tableData = this.tableData.filter(s => s.channel !== 'ALL')
            this.total = this.total - 1
          }
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
    async batchDelete (row) {
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
        this.$refs.switchTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/management/taobao-certification-switch/remove-taobao-switch?ids=${selectIdsStr}`
      this.$confirm('确认要批量删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.post(url)
          if (res.code === '200') {
            this.$message.success('批量删除成功!')
            this.list()
          } else {
            this.$message.error(res.message)
          }
          this.selectIds = []
        } catch (err) {
          console.error(err)
        }
      }).catch(action => {
        if (action !== 'cancel') {
          this.selectIds = []
        }
      })
    },
    async changeState (value) {
      this.$confirm('确认修改开关吗？', '提示', {
        type: 'warning'
      }).then(() => {
        console.info('changeState', value)
        this.putChangeStatus(value)
      }).catch(action => {
        this.defaultState = value === 1 ? 2 : 1
      })
    },
    async putChangeStatus (value) {
      this.switchForm.id = this.defaultStateId
      this.switchForm.state = value
      this.switchForm.channel = this.defaultSwitchChannel
      const url = `/management/taobao-certification-switch/`
      try {
        const res = await this.$http.post(url, this.switchForm)
        if (res.code === '200') {
          this.$message.success('操作成功!')
          this.list()
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    edit (row) {
      this.showEditFlag = true
      this.taobaoCertificationSwitchWindow = row
    },
    removeCertification (row) {
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
        this.$refs.taobaoCertificationSwitchTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/management/taobao-certification-switch/${selectIdsStr}`
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

<style scoped lang="stylus">
</style>
