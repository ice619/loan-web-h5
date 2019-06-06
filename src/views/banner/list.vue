<template>
  <div class="border">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <!--<el-form-item label="用户标签">
        <el-select v-model="searchForm.userTag" clearable placeholder="请选择">
          <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>-->
      <el-form-item :label="$t('common.appName')">
        <el-select v-model="searchForm.appName" clearable :placeholder="$t('action.select')">
          <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-form-item :label="$t('operation.userTags')">
          <el-select v-model="searchForm.userTags" clearable :placeholder="$t('action.select')">
            <el-option v-for="item in $formatter.getSelectionOptions('userTags')" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item :label="$t('operation.bannerLocation')">
        <el-select v-model="searchForm.position" clearable filterable :placeholder="$t('action.select')">
          <el-option v-for="item in $formatter.getSelectionOptions('bannerPositions')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')">
        <el-select v-model="searchForm.status" clearable :placeholder="$t('action.select')">
          <el-option v-for="item in $formatter.getSelectionOptions('statuses')" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-search" @click="list">{{$t('action.search')}}</el-button>
        <el-button style="color: white;background-color: #409eff;" icon="el-icon-plus" @click="$router.push({name: 'bannerAdd'})">{{$t('action.add')}}</el-button>
        <el-form-item style="float: right;padding-left: 30px" >
          <el-select v-model="i18nLanguage" :change="changeLanguage()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table ref="iosCompanySignTable" :data="tableData" border stripe highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column type="index" :label="$t('common.number')" width="50" header-align="center" align="center" />
      <!--<el-table-column prop="id" label="ID" header-align="center" align="center"/>-->
      <el-table-column prop="appName" :label="$t('common.appName')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('appNames', scope.row.appName)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userTag" :label="$t('operation.userTags')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.multipleFormatSelection('userTags', scope.row.userTag)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('common.startTime')" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="endTime" :label="$t('common.endTime')" header-align="center" align="center" min-width="90"/>
      <el-table-column prop="position" :label="$t('operation.bannerLocation')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('bannerPositions', scope.row.position)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.createMan')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('common.createTime')" header-align="center" align="center" min-width="90"/>
      <el-table-column :label="$t('common.updateMan')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.modifyUser}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" :label="$t('common.updateTime')" header-align="center" align="center" min-width="90"/>
      <!--<el-table-column prop="createUser" label="创建人" header-align="center" align="center"/>-->
      <el-table-column prop="status" :label="$t('common.status')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{$formatter.simpleFormatSelection('statuses', scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('action.operate')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editBanner(scope.row)" type="text" size="small">{{$t('action.edit')}}</el-button>
          <el-button icon="el-icon-delete" @click="removeBanner(scope.row)" type="text" size="small" style="color: #F56C6C">{{$t('action.delete')}}</el-button>
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
    <!--<add :ifshow="showAddFlag" @handleCloseDialog="showAddFlag=false;list();"></add>
    <edit :ifshow="showEditFlag" :bannerWindow="bannerWindow" @handleCloseDialog="showEditFlag=false;list();"></edit>-->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      searchForm: {
        userTags: [],
        appName: 1,
        status: null,
        position: null
      },
      options: this.globalConfig.langOptions,
      i18nLanguage: null,
      bannerWindow: {},
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
    // 从coolie获取上次语言
    const cookieLang = Cookies.get('I18n-Lang')
    if (cookieLang === null || cookieLang === undefined) {
      // 如果没有，检测浏览器语言 判断除IE外其他浏览器使用语言
      let browserLang = navigator.language
      if (!browserLang) {
        // 判断IE浏览器使用语言
        browserLang = navigator.browserLanguage
      }
      // 如果浏览器语言在语言包中
      Cookies.set('I18n-Lang', browserLang, { expires: 1 })
      this.$i18n.locale = browserLang
    }
    this.i18nLanguage = Cookies.get('I18n-Lang')
    const option = this.options.find(option => option.value === this.i18nLanguage)
    this.i18nLanguage = option ? option.value : 'zh_CN'
  },
  methods: {
    async list () {
      let params = {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      try {
        const res = await this.$http.post('/banner/page', params)
        // console.log(res)
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
    editBanner (row) {
      // this.showEditFlag = true
      // this.bannerWindow = row
      this.$router.push({path: `banner-edit/${row.id}`})
    },
    removeBanner (row) {
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
        this.$refs.iosCompanySignTable.clearSelection()
        idsLength = 1
        this.selectIds.push(row.id)
        selectIdsStr = row.id
      }
      const url = `/banner/${selectIdsStr}`
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
    },
    changeLanguage () {
      this.$i18n.locale = this.i18nLanguage
      Cookies.set('I18n-Lang', this.i18nLanguage, { expires: 1 })
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
