<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="所属系统：" prop="systemCode">
        <el-select v-model="searchForm.systemCode" clearable placeholder="所属系统" style="width: 150px;">
          <el-option v-for="item in $formatter.getSelectionOptions('systemCode')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="大类编号">
        <el-input v-model="searchForm.dicBigCode" placeholder="模糊查询"/>
      </el-form-item>
      <el-form-item label="大类名称">
        <el-input v-model="searchForm.dicBigValue" placeholder="模糊查询"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="searchForm.remark" placeholder="模糊查询"/>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="list">查询</el-button>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-plus" @click="showEditFlag=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="dictBigTable" :data="tableData" border stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="systemCode" label="所属系统" header-align="center" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('systemCode', scope.row.systemCode)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dicBigCode" label="大类编码" header-align="center" align="center"/>
      <el-table-column prop="dicBigValue" label="大类中文名称" header-align="center" align="center"/>
      <el-table-column prop="dicBigStaues" label="大类状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '有效' : '无效'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" align="center" width="250" show-overflow-tooltip/>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="center"/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"/>
      <el-table-column prop="updateMan" label="修改人" header-align="center" align="center"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center"/>

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
    <big-edit :ifshow="showEditFlag" :dictBig="dictBig" @handleCloseDialog="showEditFlag=false;dictBig=null;list();"></big-edit>
    <small-list :ifshow="showSmallListFlag" :dictBig="dictBig" @handleCloseDialog="showSmallListFlag=false;dictBig=null;"></small-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        systemCode: null,
        dicBigCode: null,
        dicBigValue: null,
        remark: null
      },
      dictBig: null,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
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
        const res = await this.$http.post('/dict-big/list', params)
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
      this.dictBig = row
    },
    showSmallList (row) {
      this.showSmallListFlag = true
      this.dictBig = row
    }
  },
  components: {
    'big-edit': () => import('./big-edit'),
    'small-list': () => import('./small-list')
  }
}
</script>
