webpackJsonp([6],{WpO6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("Xxa5"),a=r.n(l),o=r("exGp"),s=r.n(o),n=r("ON3O"),i=r.n(n),c=r("X2Oc"),p={props:{ifshow:Boolean,entry:Object,userTypes:Array,switchTypes:Array},data:function(){return{entryForm:{},rules:{},picList:[],actionUrl:"//devfdd.51huihuahua.com/config/upload-image-file"}},methods:{openDialog:function(){this.entryForm=Object(c.a)(this.entry)},closeDialog:function(){this.$refs.entryForm.resetFields(),this.$emit("handleCloseDialog")},saveGuidePage:i()(300,function(){var e,t=this;this.$refs.entryForm.validate((e=s()(a.a.mark(function e(r){var l;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=14;break}if(e.prev=1,!(t.entryForm.versionLowerLimit>t.entryForm.versionUpperLimit)){e.next=5;break}return t.$message.error("开始版本号不能大于结束版本号"),e.abrupt("return");case 5:return e.next=7,t.$http.put("/config/transaction-switch",t.entryForm);case 7:"200"===(l=e.sent).code?(t.$message.success("更新成功!"),t.closeDialog()):t.$message.error(l.message),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}},e,t,[[1,11]])})),function(t){return e.apply(this,arguments)}))})}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"border"},[r("el-dialog",{attrs:{title:"编辑交易开关",visible:e.ifshow,"before-close":e.closeDialog,width:"35%"},on:{"update:visible":function(t){e.ifshow=t},open:e.openDialog}},[r("el-form",{ref:"entryForm",staticClass:"demo-form-inline",staticStyle:{"padding-left":"40px"},attrs:{inline:!0,model:e.entryForm,rules:e.rules,"label-width":"100px"}},[r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"APP平台:",align:"left"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.entryForm.appName,callback:function(t){e.$set(e.entryForm,"appName",t)},expression:"entryForm.appName"}},e._l(e.$formatter.getSelectionOptions("appNames"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"开关类型:",align:"left"}},[r("el-select",{staticStyle:{width:"400px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.entryForm.switchType,callback:function(t){e.$set(e.entryForm,"switchType",t)},expression:"entryForm.switchType"}},e._l(e.$formatter.getSelectionOptions("switchTypes"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"针对版本:"}},[r("el-select",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:e.entryForm.versionLowerLimit,callback:function(t){e.$set(e.entryForm,"versionLowerLimit",t)},expression:"entryForm.versionLowerLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.entryForm.appName),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),r("el-select",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:e.entryForm.versionUpperLimit,callback:function(t){e.$set(e.entryForm,"versionUpperLimit",t)},expression:"entryForm.versionUpperLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.entryForm.appName),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"用户类型:"}},[r("el-select",{attrs:{clearable:""},model:{value:e.entryForm.userType,callback:function(t){e.$set(e.entryForm,"userType",t)},expression:"entryForm.userType"}},e._l(e.$formatter.getSelectionOptions("userTypes"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"备注:"}},[r("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",rows:3},model:{value:e.entryForm.remark,callback:function(t){e.$set(e.entryForm,"remark",t)},expression:"entryForm.remark"}})],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",{attrs:{label:"状态:"}},[r("el-radio-group",{model:{value:e.entryForm.status,callback:function(t){e.$set(e.entryForm,"status",t)},expression:"entryForm.status"}},[r("el-radio",{attrs:{label:!0}},[e._v("有效")]),e._v(" "),r("el-radio",{attrs:{label:!1}},[e._v("无效")])],1)],1)],1)],1),e._v(" "),r("el-row",{staticStyle:{"padding-top":"20px","padding-left":"50px"},attrs:{type:"flex",justify:"left"}},[r("el-col",{attrs:{span:30}},[r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.saveGuidePage}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:e.closeDialog}},[e._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var m=r("VU/8")(p,u,!1,function(e){r("k/RR")},"data-v-b202cbb6",null);t.default=m.exports},"k/RR":function(e,t){}});
//# sourceMappingURL=6.17b0fb5a2983380f1a67.js.map