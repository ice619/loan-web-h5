webpackJsonp([14],{"3HGG":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),l=a("exGp"),s=a.n(l),o=a("ON3O"),i=a.n(o),c=a("X2Oc"),m={props:{ifshow:Boolean,bannerWindow:Object},data:function(){return{bannerDetails:[],bannerFormInitForm:{appName:"",terminal:"",userTag:"",versionUpperLimit:"",versionLowerLimit:"",position:"",displayPosition:"",startTime:null,endTime:null,status:!0},bannerForm:{},rules:{},actionUrl:"//devfdd.51huihuahua.com/config/upload-image-file"}},methods:{addBannerDetailsTableRows:function(){null!=this.bannerForm.title?null!=this.bannerForm.sort?null!=this.bannerForm.activityCode?null!=this.bannerForm.activityUrl?null!=this.bannerForm.imageUrl?this.bannerDetails.push({title:this.bannerForm.title,sort:this.bannerForm.sort,activityCode:this.bannerForm.activityCode,activityUrl:this.bannerForm.activityUrl,imageUrl:this.bannerForm.imageUrl}):this.$message.error("图片不能为空"):this.$message.error("活动链接不能为空"):this.$message.error("活动编号不能为空"):this.$message.error("排序值不能为空"):this.$message.error("标题不能为空")},openDialog:function(){this.bannerForm=Object(c.a)(this.bannerWindow),this.initBannerDetails()},closeDialog:function(){this.$refs.bannerForm.resetFields(),this.$emit("handleCloseDialog")},handleFilesChange:function(e,t){t.length>1&&t.shift(),"ready"!==e.status&&("success"===e.status&&"200"===e.response.code?(this.bannerForm.imageUrl=e.response.data,this.$message({message:"图片上传成功",type:"success"})):this.$message.error("图片上传失败"))},deleteRow:function(e,t){t.splice(e,1)},saveBanner:i()(300,function(){var e,t=this;this.$refs.bannerForm.validate((e=s()(n.a.mark(function e(a){var r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.bannerForm.versionLowerLimit>t.bannerForm.versionUpperLimit)){e.next=3;break}return t.$message.error("开始版本要小于结束版本"),e.abrupt("return");case 3:if(!(t.bannerForm.startTime>t.bannerForm.endTime)){e.next=6;break}return t.$message.error("开始时间要小于结束时间"),e.abrupt("return");case 6:if(!a){e.next=18;break}return e.prev=7,t.bannerForm.bannerDetails=t.bannerDetails,e.next=11,t.$http.post("/config/banner",t.bannerForm);case 11:"200"===(r=e.sent).code?(t.$message.success("新增成功!"),t.closeDialog()):t.$message.error(r.message),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(7),console.error(e.t0);case 18:case"end":return e.stop()}},e,t,[[7,15]])})),function(t){return e.apply(this,arguments)}))}),initBannerDetails:function(){var e=this;return s()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$http.get("/config/banner/"+e.bannerForm.id);case 3:"200"===(a=t.sent).code?e.bannerDetails=a.data.bannerDetailsDTOS:e.$message.error(a.message),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()}}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"border",staticStyle:{width:"100%"}},[a("el-dialog",{attrs:{title:"编辑banner配置",visible:e.ifshow,"before-close":e.closeDialog},on:{"update:visible":function(t){e.ifshow=t},open:e.openDialog}},[a("el-form",{ref:"bannerForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.bannerForm,rules:e.rules,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"应用名称"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.appName,callback:function(t){e.$set(e.bannerForm,"appName",t)},expression:"bannerForm.appName"}},e._l(e.$formatter.getSelectionOptions("appNames"),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"生效终端"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.terminal,callback:function(t){e.$set(e.bannerForm,"terminal",t)},expression:"bannerForm.terminal"}},e._l(e.$formatter.getSelectionOptions("terminals"),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"用户标签"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.userTag,callback:function(t){e.$set(e.bannerForm,"userTag",t)},expression:"bannerForm.userTag"}},e._l(e.$formatter.getSelectionOptions("userTags"),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"生效版本"}},[a("el-select",{staticStyle:{width:"110px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.versionLowerLimit,callback:function(t){e.$set(e.bannerForm,"versionLowerLimit",t)},expression:"bannerForm.versionLowerLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.bannerForm.appName),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-select",{staticStyle:{width:"110px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.versionUpperLimit,callback:function(t){e.$set(e.bannerForm,"versionUpperLimit",t)},expression:"bannerForm.versionUpperLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.bannerForm.appName),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"banner位置"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.position,callback:function(t){e.$set(e.bannerForm,"position",t)},expression:"bannerForm.position"}},e._l(e.$formatter.getSelectionOptions("bannerPositions"),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"显示位置"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.bannerForm.displayPosition,callback:function(t){e.$set(e.bannerForm,"displayPosition",t)},expression:"bannerForm.displayPosition"}},e._l(e.$formatter.getSelectionOptions("displayPositions"),function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择开始时间","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.bannerForm.startTime,callback:function(t){e.$set(e.bannerForm,"startTime",t)},expression:"bannerForm.startTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.bannerForm.endTime,callback:function(t){e.$set(e.bannerForm,"endTime",t)},expression:"bannerForm.endTime"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.bannerForm.status,callback:function(t){e.$set(e.bannerForm,"status",t)},expression:"bannerForm.status"}},[a("el-radio",{attrs:{label:!0}},[e._v("有效")]),e._v(" "),a("el-radio",{attrs:{label:!1}},[e._v("无效")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}})],1),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"标题"}},[a("el-input",{staticStyle:{width:"176px"},attrs:{placeholder:"标题"},model:{value:e.bannerForm.title,callback:function(t){e.$set(e.bannerForm,"title",t)},expression:"bannerForm.title"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"排序值"}},[a("el-input-number",{staticStyle:{width:"176px"},attrs:{min:1,max:99,label:"排序值"},model:{value:e.bannerForm.sort,callback:function(t){e.$set(e.bannerForm,"sort",t)},expression:"bannerForm.sort"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"活动编号"}},[a("el-input",{staticStyle:{width:"176px"},attrs:{placeholder:"活动编号"},model:{value:e.bannerForm.activityCode,callback:function(t){e.$set(e.bannerForm,"activityCode",t)},expression:"bannerForm.activityCode"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"活动链接"}},[a("el-input",{staticStyle:{width:"176px"},attrs:{placeholder:"活动链接"},model:{value:e.bannerForm.activityUrl,callback:function(t){e.$set(e.bannerForm,"activityUrl",t)},expression:"bannerForm.activityUrl"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"图片"}},[a("el-upload",{attrs:{action:e.actionUrl,"show-file-list":!1,"on-change":e.handleFilesChange}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),e._v(" "),a("el-input",{staticStyle:{display:"none"},attrs:{type:"hidden"},model:{value:e.bannerForm.imageUrl,callback:function(t){e.$set(e.bannerForm,"imageUrl",t)},expression:"bannerForm.imageUrl"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-button",{attrs:{type:"primary"},on:{click:e.addBannerDetailsTableRows}},[e._v("添加")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"1000px"},attrs:{data:e.bannerDetails,height:"250",border:""},model:{value:e.bannerDetails,callback:function(t){e.bannerDetails=t},expression:"bannerDetails"}},[a("el-table-column",{attrs:{type:"index","header-align":"center",align:"left",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title","header-align":"center",align:"left",label:"标题",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sort","header-align":"center",align:"left",label:"排序值",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"activityCode","header-align":"center",align:"left",label:"活动编号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"activityUrl","header-align":"center",align:"left",label:"活动链接",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"imageUrl",label:"图片地址",width:"750"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){a.preventDefault(),e.deleteRow(t.$index,e.bannerDetails)}}},[e._v("\n                移除\n              ")])]}}])})],1)],1),e._v(" "),a("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:40}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.saveBanner}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:e.closeDialog}},[e._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(m,b,!1,function(e){a("sJug")},null,null);t.default=p.exports},sJug:function(e,t){}});
//# sourceMappingURL=14.ba5268e0d6b52a70a84b.js.map