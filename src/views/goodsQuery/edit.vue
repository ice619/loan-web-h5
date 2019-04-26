<template>
  <div class="border" style="width: 100%">
    <el-dialog title="编辑商品" :visible.sync="ifshow" @open="openDialog" :before-close="closeDialog" :close-on-click-modal="false">
      <el-form :inline="true" :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px"
               class="demo-form-inline">
        <el-row>
          <el-col :span="40">
            <el-form-item label="APP名称" prop="appName">
              <el-select v-model="goodsForm.appName" placeholder="APP名称" readonly :disabled="true">
                <el-option v-for="item in $formatter.getSelectionOptions('appNames')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="商品编号" prop="number">
              <el-input v-model="goodsForm.number" style="width: 217px;" readonly :disabled="true" placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品标题" prop="title">
              <el-input type="textarea" autosize cols="100" v-model="goodsForm.title" clearable placeholder="请输入商品标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品副标题" prop="subtitle">
              <el-input type="textarea" autosize cols="100" v-model="goodsForm.subtitle" clearable placeholder="商品副标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品状态" prop="state">
              <el-select style="width: 217px;" v-model="goodsForm.state" clearable placeholder="请选择商品状态">
                <el-option v-for="item in $formatter.getSelectionOptions('goodsState')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="采购价格" prop="purchasePrice">
              <el-input v-model="goodsForm.purchasePrice" style="width: 217px;" clearable placeholder="请输入采购价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="goodsForm.price" style="width: 217px;" clearable placeholder="请输入商品价格"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="折扣价格" prop="discountPrice">
              <el-input v-model="goodsForm.discountPrice" style="width: 217px;" clearable placeholder="请输入折扣价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="分期价格" prop="stagingPrice">
              <el-input v-model="goodsForm.stagingPrice" style="width: 217px;" clearable placeholder="请输入分期价格"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="分期利率" prop="installmentRate">
              <el-input v-model="goodsForm.installmentRate" style="width: 217px;" clearable placeholder="请输入分期利率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="分期期限" prop="instalmentPeriod">
              <el-input v-model="goodsForm.instalmentPeriod" style="width: 217px;" clearable placeholder="请输入分期期限"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="分类编号" prop="goodsCategoryNumber">
              <el-input v-model="goodsForm.goodsCategoryNumber" style="width: 217px;" clearable placeholder="请输入分类编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <el-form-item label="库存状态" prop="inventoryStatus">
              <el-select style="width: 217px;" v-model="goodsForm.inventoryStatus" clearable placeholder="请选择库存状态">
                <el-option v-for="item in $formatter.getSelectionOptions('goodsInventoryStatus')" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="封面大图" prop="coverBigImage">
              <el-input type="textarea" autosize cols="70" v-model="goodsForm.coverBigImage" clearable placeholder="请输入封面大图"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <template>
              <el-popover placement="top-start" width="200" trigger="hover" title="封面大图" :content="goodsForm.coverBigImage ? goodsForm.coverBigImage : '无图片'">
                <img v-if="goodsForm.coverBigImage" :src="goodsForm.coverBigImage" class="avatar">
                <el-button slot="reference">预览</el-button>
              </el-popover>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="封面小图" prop="coverSmallImage">
              <el-input type="textarea" autosize cols="70" v-model="goodsForm.coverSmallImage" clearable placeholder="请输入封面小图"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <template>
              <el-popover placement="top-start" width="200" trigger="hover" title="封面小图" :content="goodsForm.coverSmallImage ? goodsForm.coverSmallImage : '无图片'">
                <img v-if="goodsForm.coverSmallImage" :src="goodsForm.coverSmallImage" class="avatar">
                <el-button slot="reference">预览</el-button>
              </el-popover>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="商品详情页滑动图片" prop="coverSlideImage">
              <el-input type="textarea" autosize cols="70" v-model="goodsForm.coverSlideImage"
                        clearable placeholder="请输入商品详情页滑动图片" @change="changeSlideImage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <div v-for="a in coverSlideImageList" :key="a">
              <el-popover placement="top-start" width="200" trigger="hover" title="商品详情页滑动图片">
                <img :src="a" class="avatar"/>
                <el-button slot="reference">预览</el-button>
              </el-popover>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="40">
            <el-form-item label="图文信息" prop="graphicInfo">
              <el-input type="textarea" autosize cols="70" v-model="goodsForm.graphicInfo"
                        clearable placeholder="请输入图文信息" @change="changeGraphicInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="40">
            <div v-for="b in graphicInfoList" :key="b">
              <el-popover placement="top-start" width="200" trigger="hover" title="图文信息">
                <img :src="b" class="avatar"/>
                <el-button slot="reference">预览</el-button>
              </el-popover>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="销售信息" prop="salesInfo">
              <el-input type="textarea" autosize cols="100" v-model="goodsForm.salesInfo" clearable placeholder="请输入销售信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="规格信息" prop="specificationInfo">
              <el-input type="textarea" autosize cols="100" v-model="goodsForm.specificationInfo" clearable placeholder="请输入规格信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-col :span="40">
            <el-form-item>
              <el-button style="color: white;background-color: #009688;" type="primary" @click="saveGoods">提交</el-button>
              <el-button @click="closeDialog">返回</el-button>
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

export default {
  props: {
    'ifshow': Boolean,
    'goodsWindow': Object
  },
  data () {
    return {
      goodsForm: {},
      rules: {
        appName: [
          {required: true, message: '请选择APP名称', trigger: 'blur'}
        ]
      },
      coverSlideImageList: [],
      graphicInfoList: []
    }
  },
  // watch: {
  //   'goodsForm.coverSlideImage': function (newVal, oldVal) {
  //     this.coverSlideImageList = JSON.parse(this.goodsForm.coverSlideImage)
  //   }
  // },
  methods: {
    changeSlideImage () {
      this.coverSlideImageList = JSON.parse(this.goodsForm.coverSlideImage)
    },
    changeGraphicInfo () {
      this.graphicInfoList = JSON.parse(this.goodsForm.graphicInfo)
    },
    formatterMoney (value) {
      return value.toFixed(2)
    },
    openDialog () {
      this.goodsForm = clone(this.goodsWindow)
      this.coverSlideImageList = JSON.parse(this.goodsForm.coverSlideImage)
      this.graphicInfoList = JSON.parse(this.goodsForm.graphicInfo)
      this.goodsForm.purchasePrice = this.formatterMoney(this.goodsForm.purchasePrice)
      this.goodsForm.price = this.formatterMoney(this.goodsForm.price)
      this.goodsForm.discountPrice = this.formatterMoney(this.goodsForm.discountPrice)
      this.goodsForm.stagingPrice = this.formatterMoney(this.goodsForm.stagingPrice)
    },
    closeDialog () {
      this.$refs['goodsForm'].resetFields()
      this.$emit('handleCloseDialog')
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    saveGoods: debounce(300, function () {
      this.$refs['goodsForm'].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('/management/goods/update', this.goodsForm)
            if (res.code === '200') {
              this.$message.success('编辑成功!')
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

<style lang="stylus">
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
