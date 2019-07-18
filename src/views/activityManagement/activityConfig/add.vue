<template>
  <div class="border">
    <el-dialog title="新增活动" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" width="90%" style="margin-top: -80px">
      <el-form :inline="true" :model="entryForm" :rules="rules" ref="entryForm" label-width="150px" class="demo-form-inline" style="margin-left: 10%;">
      <el-row>
        <el-col :span="10">
          <el-form-item label="APP名称" prop="appName" :rules="[{ required: true, message: '请选择平台', trigger: 'change' }]">
            <el-select v-model="entryForm.appName" placeholder="请选择App名称" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('appName')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动类型" prop="activityType" :rules="[{ required: true, message: '请选择活动类型', trigger: 'change' }]">
            <el-select v-model="entryForm.activityType" clearable placeholder="请选择活动类型" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('activityType')" v-if="item.value !== 'XW'" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题(默认)" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
            <el-input v-model="entryForm.title" placeholder="默认语言" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="标题(切换)" prop="translateTitle" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
            <el-input v-model="entryForm.translateTitle" placeholder="切换语言" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="生效用户" prop="customerState" :rules="[{ required: true, message: '请选择生效用户', trigger: 'change' }]">
            <el-select v-model="entryForm.customerState" clearable placeholder="请选择生效用户" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('activityCustomerState')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="抽奖次数" prop="drawTimes" :rules="[{ required: entryForm.activityType === 'CJ', message: '请输入抽奖次数', trigger: 'blur' }]">
            <el-input v-model="entryForm.drawTimes" placeholder="请输入抽奖次数" :disabled="entryForm.activityType != 'CJ'" clearable style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="开始时间" prop="startTime" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
            <el-date-picker v-model="entryForm.startTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px"/>
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
      <el-row type="flex" justify="center" style="margin-top: 10px; margin-bottom: 20px;">
        <el-col :span="24">
          <el-table :data="entryForm.activityRewardConfigList" border style="width: 90%">
            <el-table-column prop="customerState" header-align="center" align="left" label="好友行为" min-width="50" v-if="entryForm.activityType === 'YQ'">
              <template slot-scope="scope">
                <el-select v-model="scope.row.customerState" clearable placeholder="请选择好友行为" :disabled="entryForm.activityType !== 'YQ'" style="width: 100%">
                  <el-option v-for="item in $formatter.getSelectionOptions('customerState')" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="materialType" header-align="center" align="left" label="物料类型" min-width="50">
              <template slot-scope="scope">
                <el-select v-model="scope.row.materialType" clearable placeholder="请选择物料类型" style="width: 100%">
                  <el-option v-for="item in $formatter.getSelectionOptions('materialType')" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="materialCode" header-align="center" align="left" label="奖励编码" min-width="50">
              <template slot-scope="scope">
                <el-select v-model="scope.row.materialCode" clearable placeholder="请选择奖励编码" style="width: 100%">
                  <el-option v-for="item in materialConfig[scope.row.materialType]" :key="item.materialCode" :label="item.materialCode" :value="item.materialCode"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="imageUrl" header-align="center" align="left" label="图片" min-width="50" v-if="entryForm.activityType === 'CJ'">
              <template slot-scope="scope">
                <el-upload class="avatar-uploader" :action="activityUrl" :headers = "headers" :show-file-list="false" :on-change="handleFilesChange" :disabled="entryForm.activityType !== 'CJ'">
                  <el-popover placement="right" width="200" trigger="hover" :content="scope.row.imageUrl ? null : '图片未上传'">
                    <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar">
                    <el-button @click="orientateRowIndex(scope.$index)" slot="reference" :class="scope.row.imageUrl ? 'el-icon-edit' : 'el-icon-plus'">{{scope.row.imageUrl ? '更换图片' : '选择图片'}}</el-button>
                  </el-popover>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column prop="limitNum" header-align="center" align="left" :label="entryForm.activityType === 'YQ' ? '好友限制': '中奖概率%'" min-width="50">
              <template slot-scope="scope">
                <el-input v-model="scope.row.limitNum" clearable style="width: 100%"/>
              </template>
            </el-table-column>
            <el-table-column prop="limitDays" header-align="center" align="left" label="周期限制(天)" min-width="50" v-if="entryForm.activityType === 'YQ'">
              <template slot-scope="scope">
                <el-input v-model="scope.row.limitDays" clearable style="width: 100%" :disabled="entryForm.activityType !== 'YQ'"/>
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
      <el-row v-if="entryForm.activityType === 'YQ'">
        <el-col :span="10">
          <el-form-item label="分享方式" prop="shareTypes">
            <el-select v-model="shareTypesValue" multiple placeholder="请选择分享方式" :disabled="entryForm.activityType !== 'YQ'" style="width: 350px">
              <el-option v-for="item in $formatter.getSelectionOptions('activityShareType')" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="分享内容" prop="shareText">
            <el-input v-model="entryForm.shareText" placeholder="请输入分享内容" clearable :disabled="entryForm.activityType !== 'YQ'" style="width: 350px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="分享链接" prop="shareLink">
            <el-input v-model="entryForm.shareLink" placeholder="请输入分享链接" clearable :disabled="entryForm.activityType !== 'YQ'" style="width: 350px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="entryForm.remark" rows="4" placeholder="请输入备注" :disabled="entryForm.activityType === 'XJ'" clearable style="width: 350px"/>
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
      <el-row type="flex" justify="center" style="margin-top: 10px">
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
        activityType: 'YQ',
        title: null,
        translateTitle: null,
        customerState: 0,
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
      shareTypesValue: [],
      materialConfig: {},
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
      this.loadMaterialConfig()
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
    loadMaterialConfig () {
      this.$http.get(`/material-config/list/${this.entryForm.appName}`).then(res => {
        if (res && res.code === '200') {
          res.data.forEach(config => {
            if (!this.materialConfig[config.materialType]) {
              this.materialConfig[config.materialType] = []
            }
            this.materialConfig[config.materialType].push(config)
          })
        }
      }).catch(e => {
        this.$message.error('load app material config error')
        console.info(e)
      })
    },
    save: debounce(300, function () {
      this.$refs['entryForm'].validate(async (valid) => {
        if (valid) {
          if (this.entryForm.startTime >= this.entryForm.endTime) {
            this.$message.error('活动开始时间不能小于结束时间')
            return
          }
          // 校验奖品配置
          let rewardConfigList = this.entryForm.activityRewardConfigList
          if (rewardConfigList.length === 0) {
            this.$message.error('活动奖品配置不能为空')
            return
          }
          if (this.entryForm.activityType === 'YQ') {
            if (rewardConfigList.some(reward => rewardConfigList.filter(config => config.customerState === reward.customerState).length > 1)) {
              this.$message.error('请勿重复选择好友行为')
              return
            }
          }
          try {
            const res = await this.$http.post('/activity-config', this.entryForm)
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
  },
  watch: {
    'shareTypesValue': function () {
      if (this.shareTypesValue && this.shareTypesValue.length > 0) {
        this.entryForm.shareTypes = this.shareTypesValue.join(',')
      }
    }
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
