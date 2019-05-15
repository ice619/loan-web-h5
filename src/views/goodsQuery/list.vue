<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="APP名称：">
        <el-select v-model="searchForm.appName" clearable placeholder="请选择APP名称">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编号：">
        <el-input v-model="searchForm.number" clearable placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #009688;" type="primary" icon="el-icon-search" @click="pageIndex=1;list();">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="goodsTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column prop="appName" label="APP名称" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="商品编号" header-align="center" align="center" min-width="125"/>
      <el-table-column prop="title" label="商品标题" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="subtitle" label="副标题" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="state" label="商品状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('goodsState', scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="purchasePrice" label="采购价格" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.purchasePrice| rounding}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price| rounding}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="discountPrice" label="折扣价格" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.discountPrice| rounding}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stagingPrice" label="分期价格" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.stagingPrice| rounding}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="installmentRate" label="分期利率" header-align="center" align="center"/>
      <el-table-column prop="instalmentPeriod" label="分期期限" header-align="center" align="center"/>
      <el-table-column prop="goodsCategoryNumber" label="分类编号" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="coverBigImage" label="封面大图" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="coverSmallImage" label="封面小图" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="inventoryStatus" label="库存状态" header-align="center" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('goodsInventoryStatus', scope.row.inventoryStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="coverSlideImage" label="商品详情页滑动图片" header-align="center" align="center" show-overflow-tooltip min-width="150"/>
      <el-table-column prop="salesInfo" label="销售信息" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="graphicInfo" label="图文信息" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="specificationInfo" label="规格信息" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.createTime), "yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createMan" label="创建人" header-align="center" align="center" min-width="120"/>
      <el-table-column prop="updateTime" label="修改时间" header-align="center" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.updateTime), "yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateMan" label="修改人" header-align="center" align="center" min-width="120"/>
      <el-table-column label="操作" header-align="center" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editGoods(scope.row)" type="text" size="small">编辑</el-button>
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
    <edit :ifshow="showEditFlag" :goodsWindow="goodsWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchForm: {
        appName: 7,
        number: null,
        goodsCategoryNumber: null
      },
      goodsWindow: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectIds: [],
      showEditFlag: false
    }
  },
  created () {
    this.list()
  },
  filters: {
    rounding (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/management/goods/page', params)
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
        this.selectIds.push(v.number)
      })
    },
    editGoods (row) {
      this.showEditFlag = true
      this.goodsWindow = row
    },
    removeGoods (row) {
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
        this.$refs.goodsTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.number)
        selectIdsStr = row.number
      }
      const url = `/management/goods/${selectIdsStr}`
      const tableLength = this.tableData.length
      this.$confirm('确认删除吗？', '提示', {type: 'warning'}).then(async () => {
        try {
          const res = await this.$http.delete(url)
          if (res.code === '200') {
            this.$message.success('删除成功!')
            // this.list()
            this.selectIds.forEach(v => {
              let i = this.tableData.findIndex(s => s.number === v)
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
    'edit': () => import('./edit')
  }
}
</script>

<style scoped lang="stylus">
</style>
