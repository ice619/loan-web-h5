webpackJsonp([17],{"/RXM":function(e,r){},YqCq:function(e,r,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=l("Xxa5"),t=l.n(a),s=l("exGp"),o=l.n(s),n=l("ON3O"),i=l.n(n),c=l("X2Oc"),p={props:{ifshow:Boolean},data:function(){return{ruleForm:{appName:"",versionCode:"",versionName:"",channel:"",validateFrom:"",clientType:"",baseVersion:"",patchVersion:"",remark:"",patchUrl:"",patchEncryption:"",status:""},rules:{appName:[{required:!0,message:"请选择APP名称",trigger:"blur"}],versionCode:[{required:!0,message:"请输入版本代号",trigger:"blur"},{max:100,message:"最长 100 个字符",trigger:"blur"}],versionName:[{required:!0,message:"请输入版本名字",trigger:"blur"},{max:100,message:"最长 100 个字符",trigger:"blur"}],channel:[{required:!0,message:"请输入发布渠道",trigger:"blur"},{max:64,message:"最长 64 个字符",trigger:"blur"}],validateFrom:[{required:!0,message:"请选择生效时间",trigger:"blur"}],clientType:[{required:!0,message:"请选择平台类型",trigger:"blur"}],baseVersion:[{required:!0,message:"请输入基线版本",trigger:"blur"},{max:30,message:"最长 30 个字符",trigger:"blur"}],patchVersion:[{required:!0,message:"请输入补丁版本",trigger:"blur"},{max:30,message:"最长 30 个字符",trigger:"blur"}],remark:[{required:!0,message:"请输入补丁说明",trigger:"blur"},{max:350,message:"最长 350 个字符",trigger:"blur"}],state:[{required:!0,message:"请选择状态",trigger:"blur"}],patchUrl:[{required:!0,message:"请上传补丁包",trigger:"blur"}]},uploadAppPatchUrl:"//devfdd.51huihuahua.com/management/app-patch-version/upload-app-path-file"}},methods:{openDialog:function(){this.ruleForm=Object(c.a)(this.ruleForm)},closeDialog:function(){this.$refs.ruleForm.resetFields(),this.$emit("handleCloseDialog")},handleFilesChange:function(e,r){r.length>1&&r.shift(),"ready"!==e.status&&("success"===e.status&&"200"===e.response.code?(this.ruleForm.patchUrl=e.response.data.patchUrl,this.ruleForm.patchEncryption=e.response.data.patchEncryption,this.$message({message:"上传成功",type:"success"})):this.$message.error("上传失败"))},save:i()(300,function(){var e,r=this;this.$refs.ruleForm.validate((e=o()(t.a.mark(function e(l){var a;return t.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=11;break}return e.prev=1,e.next=4,r.$http.post("/management/app-patch-version",r.ruleForm);case 4:"200"===(a=e.sent).code?(r.$message.success("保存成功!"),r.closeDialog()):r.$message.error(a.message),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0);case 11:case"end":return e.stop()}},e,r,[[1,8]])})),function(r){return e.apply(this,arguments)}))})}},u={render:function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("div",{staticClass:"border",staticStyle:{width:"100%"}},[l("el-dialog",{attrs:{title:"新增",visible:e.ifshow,"before-close":e.closeDialog},on:{"update:visible":function(r){e.ifshow=r},open:e.openDialog}},[l("el-form",{ref:"ruleForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"APP名称",prop:"appName"}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.appName,callback:function(r){e.$set(e.ruleForm,"appName",r)},expression:"ruleForm.appName"}},e._l(e.$formatter.getSelectionOptions("appNames"),function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"版本代号",prop:"versionCode"}},[l("el-input",{attrs:{clearable:"",placeholder:"版本代号"},model:{value:e.ruleForm.versionCode,callback:function(r){e.$set(e.ruleForm,"versionCode",r)},expression:"ruleForm.versionCode"}})],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"版本名字",prop:"versionName"}},[l("el-input",{attrs:{clearable:"",placeholder:"版本名字"},model:{value:e.ruleForm.versionName,callback:function(r){e.$set(e.ruleForm,"versionName",r)},expression:"ruleForm.versionName"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"发布渠道",prop:"channel"}},[l("el-input",{attrs:{clearable:"",placeholder:"发布渠道"},model:{value:e.ruleForm.channel,callback:function(r){e.$set(e.ruleForm,"channel",r)},expression:"ruleForm.channel"}})],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"生效时间",prop:"validateFrom"}},[l("el-date-picker",{attrs:{type:"datetime",placeholder:"选择生效时间","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.ruleForm.validateFrom,callback:function(r){e.$set(e.ruleForm,"validateFrom",r)},expression:"ruleForm.validateFrom"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"平台类型",prop:"clientType"}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.clientType,callback:function(r){e.$set(e.ruleForm,"clientType",r)},expression:"ruleForm.clientType"}},e._l(e.$formatter.getSelectionOptions("clientType"),function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"基线版本",prop:"baseVersion"}},[l("el-input",{attrs:{clearable:"",placeholder:"基线版本"},model:{value:e.ruleForm.baseVersion,callback:function(r){e.$set(e.ruleForm,"baseVersion",r)},expression:"ruleForm.baseVersion"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"补丁版本",prop:"patchVersion"}},[l("el-input",{attrs:{clearable:"",placeholder:"补丁版本"},model:{value:e.ruleForm.patchVersion,callback:function(r){e.$set(e.ruleForm,"patchVersion",r)},expression:"ruleForm.patchVersion"}})],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:24}},[l("el-form-item",{attrs:{label:"补丁说明",prop:"remark"}},[l("el-input",{staticStyle:{width:"675px"},attrs:{clearable:"",placeholder:"补丁说明"},model:{value:e.ruleForm.remark,callback:function(r){e.$set(e.ruleForm,"remark",r)},expression:"ruleForm.remark"}})],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"状态",prop:"state"}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.state,callback:function(r){e.$set(e.ruleForm,"state",r)},expression:"ruleForm.state"}},e._l(e.$formatter.getSelectionOptions("state"),function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{staticStyle:{height:"40px"},attrs:{label:"补丁地址",prop:"patchUrl"}},[l("el-upload",{staticClass:"upload-demo",attrs:{action:e.uploadAppPatchUrl,"on-change":e.handleFilesChange,"show-file-list":!1}},[l("el-input",{attrs:{readonly:"",clearable:"",placeholder:"补丁地址","suffix-icon":"el-icon-circle-plus"},model:{value:e.ruleForm.patchUrl,callback:function(r){e.$set(e.ruleForm,"patchUrl",r)},expression:"ruleForm.patchUrl"}})],1),e._v(" "),l("el-input",{attrs:{type:"hidden"},model:{value:e.ruleForm.patchEncryption,callback:function(r){e.$set(e.ruleForm,"patchEncryption",r)},expression:"ruleForm.patchEncryption"}})],1)],1)],1),e._v(" "),l("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex",justify:"center"}},[l("el-col",{attrs:{span:40}},[l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("提交")]),e._v(" "),l("el-button",{on:{click:e.closeDialog}},[e._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var m=l("VU/8")(p,u,!1,function(e){l("/RXM")},null,null);r.default=m.exports}});
//# sourceMappingURL=17.56e1ba5723312aff0f76.js.map