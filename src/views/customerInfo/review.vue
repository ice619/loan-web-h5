<template>
  <div class="border" style="width: 100%">
    <el-dialog :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="60%">
        <el-row type="flex" justify="center" style="margin:auto 10px auto 10px">
          <vue-json-pretty :data="this.customerFullInfo" :showLength="true" :highlightMouseoverNode="true"
          :deep="2"></vue-json-pretty>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  components: {
    VueJsonPretty
  },
  props: {
    'ifshow': Boolean,
    'customerBaseInfo': Object
  },
  data () {
    return {
      customerFullInfo: {}
    }
  },
  created () {
  },
  methods: {
    openDialog () {
      this.customerFullInfo = this.getCustomerFullInfo(this.customerBaseInfo.appName, this.customerBaseInfo.customerId)
    },
    async getCustomerFullInfo (appName, customerId) {
      try {
        const res = await this.$http.post('/customer/customer-full-info/' + appName + '/' + customerId + '')
        if (res.code === '200') {
          this.customerFullInfo = res.data
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
    closeDialog () {
      this.$emit('handleCloseDialog')
    }
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
