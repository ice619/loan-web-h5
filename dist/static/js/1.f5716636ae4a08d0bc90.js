webpackJsonp([1],{"2hF5":function(e,t){},BO1k:function(e,t,l){e.exports={default:l("fxRn"),__esModule:!0}},a3Kh:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Xxa5"),r=l.n(a),i=l("exGp"),s=l.n(i),o=l("BO1k"),n=l.n(o),u=l("ON3O"),c=l.n(u),p=l("X2Oc"),d={props:{ifshow:Boolean,guidePage:Object},data:function(){return{guideForm:{},rules:{},picList:[],actionUrl:"//testfdd.51huihuahua.com/config/upload-image-file"}},methods:{openDialog:function(){this.guideForm=Object(p.a)(this.guidePage);var e=[];if(this.guideForm.pictureUrls)for(var t=this.guideForm.pictureUrls.split(","),l=0;l<t.length;l++){var a=t[l],r={};r.url=a;var i={};i.data=a,r.response=i,e[l]=r}this.picList=e},handleRemove:function(e,t){this.urlHandler(t)},handleExceed:function(e,t){this.$message({message:"最多上传5张图片",type:"warning",duration:2e3})},handleSuccess:function(e,t,l){if("200"!==e.code)return this.$message.error("上传失败！"+e.message),void this.$refs.upload.clearFiles();this.$message({message:"上传成功",type:"success",duration:1e3}),this.urlHandler(l)},urlHandler:function(e){var t="";if(e.length>0){var l=!0,a=!1,r=void 0;try{for(var i,s=n()(e);!(l=(i=s.next()).done);l=!0){t+=i.value.response.data,t+=","}}catch(e){a=!0,r=e}finally{try{!l&&s.return&&s.return()}finally{if(a)throw r}}t=t.substring(0,t.length-1)}this.guideForm.pictureUrls=t},closeDialog:function(){this.$refs.guideForm.resetFields(),this.$emit("handleCloseDialog")},saveGuidePage:c()(300,function(){var e,t=this;this.$refs.guideForm.validate((e=s()(r.a.mark(function e(l){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=14;break}if(e.prev=1,!(t.guideForm.versionLowerLimit>t.guideForm.versionUpperLimit)){e.next=5;break}return t.$message.error("开始版本号不能大于结束版本号"),e.abrupt("return");case 5:return e.next=7,t.$http.put("/config/guide-page",t.guideForm);case 7:"200"===(a=e.sent).code?(t.$message.success("更新成功!"),t.closeDialog()):t.$message.error(a.message),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}},e,t,[[1,11]])})),function(t){return e.apply(this,arguments)}))})}},f={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"border"},[l("el-dialog",{attrs:{title:"编辑引导页",visible:e.ifshow,"before-close":e.closeDialog,width:"35%"},on:{"update:visible":function(t){e.ifshow=t},open:e.openDialog}},[l("el-form",{ref:"guideForm",staticClass:"demo-form-inline",staticStyle:{"margin-left":"60px"},attrs:{inline:!0,model:e.guideForm,rules:e.rules,"label-width":"100px"}},[l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:40}},[l("el-form-item",{attrs:{label:"APP平台"}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.guideForm.appName,callback:function(t){e.$set(e.guideForm,"appName",t)},expression:"guideForm.appName"}},e._l(e.globalConfig.appNames,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",{attrs:{label:"生效终端:"}},[l("el-select",{attrs:{clearable:""},model:{value:e.guideForm.terminal,callback:function(t){e.$set(e.guideForm,"terminal",t)},expression:"guideForm.terminal"}},e._l(e.$formatter.getSelectionOptions("terminals"),function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",{attrs:{label:"标题:"}},[l("el-input",{staticStyle:{width:"400px"},model:{value:e.guideForm.title,callback:function(t){e.$set(e.guideForm,"title",t)},expression:"guideForm.title"}})],1)],1)],1),e._v(" "),l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",{attrs:{label:"生效版本:"}},[l("el-select",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:e.guideForm.versionLowerLimit,callback:function(t){e.$set(e.guideForm,"versionLowerLimit",t)},expression:"guideForm.versionLowerLimit"}},e._l(e.globalConfig.versions,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),l("el-select",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:e.guideForm.versionUpperLimit,callback:function(t){e.$set(e.guideForm,"versionUpperLimit",t)},expression:"guideForm.versionUpperLimit"}},e._l(e.globalConfig.versions,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",{attrs:{label:"是否支持跳过:"}},[l("el-radio-group",{model:{value:e.guideForm.skip,callback:function(t){e.$set(e.guideForm,"skip",t)},expression:"guideForm.skip"}},[l("el-radio",{attrs:{label:!0}},[e._v("支持")]),e._v(" "),l("el-radio",{attrs:{label:!1}},[e._v("不支持")])],1)],1)],1)],1),e._v(" "),l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",{attrs:{label:"状态:"}},[l("el-radio-group",{attrs:{value:e.guideForm.status},model:{value:e.guideForm.status,callback:function(t){e.$set(e.guideForm,"status",t)},expression:"guideForm.status"}},[l("el-radio",{attrs:{label:!0}},[e._v("有效")]),e._v(" "),l("el-radio",{attrs:{label:!1}},[e._v("无效")])],1)],1)],1)],1),e._v(" "),l("el-row",{staticStyle:{"padding-left":"50px"},attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.actionUrl,"on-remove":e.handleRemove,"on-success":e.handleSuccess,"on-exceed":e.handleExceed,"file-list":e.picList,limit:5,"list-type":"picture"}},[l("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传图片")]),e._v(" "),l("span",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("最多上传五张引导图")])],1)],1)],1),e._v(" "),l("el-row",{staticStyle:{"padding-top":"20px","padding-left":"50px"},attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{span:30}},[l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.saveGuidePage}},[e._v("提交")]),e._v(" "),l("el-button",{on:{click:e.closeDialog}},[e._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var m=l("VU/8")(d,f,!1,function(e){l("2hF5")},"data-v-34e6558a",null);t.default=m.exports},fxRn:function(e,t,l){l("+tPU"),l("zQR9"),e.exports=l("g8Ux")},g8Ux:function(e,t,l){var a=l("77Pl"),r=l("3fs2");e.exports=l("FeBl").getIterator=function(e){var t=r(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return a(t.call(e))}}});
//# sourceMappingURL=1.f5716636ae4a08d0bc90.js.map