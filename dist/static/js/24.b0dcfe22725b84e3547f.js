webpackJsonp([24],{"4O7r":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),a=n.n(r),i=n("exGp"),o=n.n(i),s=n("ON3O"),l=n.n(s),c=n("X2Oc"),m={props:{ifshow:Boolean,transactionReminderConfigWindow:Object},data:function(){return{transactionReminderConfigForm:{},rules:{}}},methods:{openDialog:function(){this.transactionReminderConfigForm=Object(c.a)(this.transactionReminderConfigWindow),this.transactionReminderConfigForm.imageUrl=this.$formatter.simpleFormatSelection("configTypeImages",this.transactionReminderConfigForm.configType)},closeDialog:function(){this.$refs.transactionReminderConfigForm.resetFields(),this.$emit("handleCloseDialog")},changeConfigType:function(){this.transactionReminderConfigForm.imageUrl=this.$formatter.simpleFormatSelection("configTypeImages",this.transactionReminderConfigForm.configType)},saveTransactionReminderConfig:l()(300,function(){var e,t=this;this.$refs.transactionReminderConfigForm.validate((e=o()(a.a.mark(function e(n){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=11;break}return e.prev=1,e.next=4,t.$http.post("/management/transaction-reminder",t.transactionReminderConfigForm);case 4:"200"===(r=e.sent).code?(t.$message.success("更新成功!"),t.closeDialog()):t.$message.error(r.message),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0);case 11:case"end":return e.stop()}},e,t,[[1,8]])})),function(t){return e.apply(this,arguments)}))})}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"border",staticStyle:{width:"100%"}},[n("el-dialog",{attrs:{title:"编辑交易提醒配置",visible:e.ifshow,"before-close":e.closeDialog},on:{"update:visible":function(t){e.ifshow=t},open:e.openDialog}},[n("el-form",{ref:"transactionReminderConfigForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.transactionReminderConfigForm,rules:e.rules,"label-width":"100px"}},[n("el-container",[n("el-aside",{staticStyle:{border:"solid 1px black"},attrs:{width:"300px"}},[e.transactionReminderConfigForm.imageUrl?n("img",{staticStyle:{width:"100%",height:"502px"},attrs:{src:e.transactionReminderConfigForm.imageUrl}}):e._e()]),e._v(" "),n("el-main",[n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"应用名称"}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.transactionReminderConfigForm.appName,callback:function(t){e.$set(e.transactionReminderConfigForm,"appName",t)},expression:"transactionReminderConfigForm.appName"}},e._l(e.$formatter.getSelectionOptions("appNames"),function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"配置类型"}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeConfigType},model:{value:e.transactionReminderConfigForm.configType,callback:function(t){e.$set(e.transactionReminderConfigForm,"configType",t)},expression:"transactionReminderConfigForm.configType"}},e._l(e.$formatter.getSelectionOptions("configTypes"),function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"提示语"}},[n("el-input",{staticStyle:{width:"217px"},attrs:{placeholder:"提示语"},model:{value:e.transactionReminderConfigForm.hint,callback:function(t){e.$set(e.transactionReminderConfigForm,"hint",t)},expression:"transactionReminderConfigForm.hint"}})],1)],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"备注"}},[n("el-input",{staticStyle:{width:"217px"},attrs:{type:"textarea",rows:5,placeholder:"请输入备注"},model:{value:e.transactionReminderConfigForm.remark,callback:function(t){e.$set(e.transactionReminderConfigForm,"remark",t)},expression:"transactionReminderConfigForm.remark"}})],1)],1)],1),e._v(" "),n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"状态"}},[n("el-radio-group",{model:{value:e.transactionReminderConfigForm.status,callback:function(t){e.$set(e.transactionReminderConfigForm,"status",t)},expression:"transactionReminderConfigForm.status"}},[n("el-radio",{attrs:{label:!0}},[e._v("有效")]),e._v(" "),n("el-radio",{attrs:{label:!1}},[e._v("无效")])],1)],1)],1)],1),e._v(" "),n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{span:40}},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.saveTransactionReminderConfig}},[e._v("提交")]),e._v(" "),n("el-button",{on:{click:e.closeDialog}},[e._v("取消")])],1)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(m,f,!1,function(e){n("ejIJ")},null,null);t.default=d.exports},ejIJ:function(e,t){}});
//# sourceMappingURL=24.b0dcfe22725b84e3547f.js.map