<template>
  <div class="border">
    <el-dialog title="新增活动" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="90%" style="margin-top: -80px">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline" style="margin-left: 10%;">
      <el-row>
        <el-col :span="10">
          <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'blur' }]">
            <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动类型" prop="activityType" :rules="[{ required: true, message: '请选择活动类型', trigger: 'blur' }]">
            <el-select v-model="entryForm.materialType" clearable placeholder="请选择活动类型" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('activityType')" v-if="item.value !== 'XW'" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题(默认)" prop="title" :rules="[{ required: entryForm.materialType !== 'XJ', message: '请输入标题', trigger: 'blur' }]">
            <el-input v-model="entryForm.title" placeholder="默认语言" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="标题(切换)" prop="translateTitle">
            <el-input v-model="entryForm.translateTitle" placeholder="切换语言" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="生效用户" prop="customerState" :rules="[{ required: true, message: '请选择生效用户', trigger: 'blur' }]">
            <el-select v-model="entryForm.customerState" clearable placeholder="请选择生效用户" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('activityCustomerState')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="抽奖次数" prop="drawTimes" :rules="[{ required: entryForm.materialType === 'DK', message: '请输入有效期', trigger: 'blur' }]">
            <el-input v-model="entryForm.drawTimes" placeholder="请输入抽奖次数" :disabled="entryForm.materialType != 'DK'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="开始时间" prop="sendTime" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
            <el-date-picker v-model="entryForm.sendTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="结束时间" prop="endTime" :rules="[{ required: true, message: '请选择结束时间', trigger: 'blur' }]">
            <el-date-picker v-model="entryForm.endTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0 0 10px 10px">
        <el-col :span="24">
          <el-button class="el-icon-plus" @click="addActivityReward" style="color: white;background-color: #009688;">新增奖品</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-col :span="24">
          <el-table :data="entryForm.activityRewardConfigList" border style="width: 90%">
            <el-table-column prop="customerState" header-align="center" align="left" label="好友行为" min-width="50" v-if="entryForm.materialType === 'YQ'">
              <template slot-scope="scope">
                <el-select v-model="scope.row.customerState" clearable placeholder="请选择">
                  <el-option v-for="item in $formatter.getSelectionOptions('customerState')" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="materialCode" header-align="center" align="left" label="奖励编码" min-width="50">
              <template slot-scope="scope">
                <el-input v-model="scope.row.materialCode" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="imageUrl" header-align="center" align="left" label="图片" min-width="50" v-if="entryForm.materialType === 'CJ'">
              <template slot-scope="scope">
                <el-upload class="avatar-uploader" :action="activityUrl" :headers = "headers" :show-file-list="false" :on-change="handleFilesChange">
                  <el-popover placement="right" width="200" trigger="hover" :content="scope.row.imageUrl ? null : '图片未上传'">
                    <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar">
                    <el-button @click="orientateRowIndex(scope.$index)" slot="reference" :class="scope.row.imageUrl ? 'el-icon-edit' : 'el-icon-plus'">{{scope.row.imageUrl ? '更换图片' : '选择图片'}}</el-button>
                  </el-popover>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column prop="limitNum" header-align="center" align="left" :label="entryForm.materialType === 'YQ' ? '好友限制': '中奖概率%'" min-width="50">
              <template slot-scope="scope">
                <el-input v-model="scope.row.limitNum" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="limitDays" header-align="center" align="left" label="周期限制(天)" min-width="50" v-if="entryForm.materialType === 'YQ'">
              <template slot-scope="scope">
                <el-input v-model="scope.row.limitDays" clearable style="width: 100%"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="25">
              <template slot-scope="scope">
                <i class="el-icon-delete drag-handler" @click="deleteRow(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="10">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="entryForm.remark" rows="4" placeholder="请输入备注" :disabled="entryForm.materialType === 'XJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="状态：">
            <el-radio-group v-model="entryForm.status" style="width: 250px;">
              <el-radio v-for="item in $formatter.getSelectionOptions('status')" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 50px">
        <el-col :span="40">
          <el-form-item>
            <el-button style="color: white;background-color: #009688;" @click="save">提交</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import debounce from 'throttle-debounce/debounce'
import {clone} from '@/utils/common'
import {getToken, getLanguage} from '@/utils/VueCookies'

export default {
  props: {
    'ifshow': Boolean
  },
  data () {
    return {
      entryFormInitForm: {
        appName: 21,
        activityType: null,
        title: null,
        translateTitle: null,
        imageUrl: null,
        validDays: null,
        usageScene: null,
        overdueCanUse: null,
        ruleDesc: null,
        translateRuleDesc: null,
        activityRewardConfigList: [],
        status: 1
      },
      entryForm: {},
      activityRewardConfigTemp: {
        customerState: null,
        materialType: null,
        materialCode: null,
        imageUrl: null,
        limitNum: null,
        limitDays: null
      },
      rules: {},
      activityUrl: `${process.env.API_ROOT}/upload-image-file`,
      headers: {
        'xxl_sso_sessionid': getToken(),
        'language': getLanguage()
      }
    }
  },
  methods: {
    openDialog () {
      this.entryForm = clone(this.entryFormInitForm)
      this.addActivityReward()
    },
    closeDialog () {
      this.$refs['entryForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    addActivityReward () {
      this.entryForm.activityRewardConfigList.push(clone(this.activityRewardConfigTemp))
    },
    deleteRow (index) {
      this.entryForm.activityRewardConfigList.splice(index, 1)
    },
    handleFilesChange: function (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (file.status === 'ready') {
        return
      }
      if (file.status === 'success' && file.response.code === '200') {
        this.entryForm.imageUrl = file.response.data
        this.$message.success('图片上传成功')
      } else {
        this.$message.error('图片上传失败')
      }
    },
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/material-config', this.entryForm)
            if (res.code === '200') {
              this.$message.success('新增成功!')
              this.closeDialog()
            } else {
              this.$message.error(res.message)
            }
          } catch (err) {
            console.error(err)
          }
        }
      })
    })
  }
}
</script>

<style lang="stylus" scoped="scoped">
  .tip-info{
    position: absolute;
    margin-top: -10px;
    font-size: 10px;
    color: gray;
    right: 0;
  }
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .avatar-uploader {
    position: absolute;
    top: 13px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
