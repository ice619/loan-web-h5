<template>
  <div class="border" style="width: 100%">
    <el-dialog title="详情" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="35%">
      <el-form :inline="true" :model="agreementForm" ref="agreementForm" label-width="100px"
               class="demo-form-inline">
        <el-row type="flex" justify="center" style="display: none">
          <el-col :span="30">
            <el-form-item label="协议内容:" prop="reviewUrl">
              <el-input type="text" v-model="agreementForm.reviewUrl"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin:auto 10px auto 10px">
            <iframe id="iframeContet" width="700" height="600" :src="agreementForm.reviewUrl" frameborder="0" border="0"></iframe>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  props: {
    'ifshow': Boolean,
    'agreementWindow': Object
  },
  data () {
    return {
      agreementForm: {},
      editorOption: {
        width: '100%'
      }
    }
  },
  methods: {
    openDialog () {
      this.initFrom()
    },
    closeDialog () {
      this.$refs['agreementForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    async initFrom () {
      try {
        const res = await this.$http.post('/agreement-config/agreement-query/' + this.agreementWindow.customerAgreementConfigId)
        if (res.code === '200') {
          this.agreementForm = res.data
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    padding-left: -20em;
    max-height: 25em;
    margin-left: 0em;
    min-width: 50em
  }
</style>
