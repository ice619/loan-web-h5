webpackJsonp([13],{JbsD:function(e,t){},Wie4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),o=r.n(a),l=r("exGp"),i=r.n(l),s=r("ON3O"),n=r.n(s),m=r("X2Oc"),c={props:{ifshow:Boolean,marketWindow:Object},data:function(){return{marketWindowForm:{},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:2,max:25,message:"长度在 2 到 25 个字符",trigger:"blur"}]},actionUrl:"//testfdd.51huihuahua.com/config/upload-image-file",showFrequencies:[{value:1,label:"value1"},{value:2,label:"value2"}]}},methods:{openDialog:function(){this.marketWindowForm=Object(m.a)(this.marketWindow)},closeDialog:function(){this.$refs.marketWindowForm.resetFields(),this.$emit("handleCloseDialog")},handleFilesExceed:function(e,t,r){this.$message.error("上传文件超过限制，请先删除在重新上传!")},handleFilesChange:function(e,t){t.length>1&&t.shift(),"success"===e.status&&(this.marketWindowForm.imageUrl=e.response.data)},saveMarketWindow:n()(300,function(){var e,t=this;this.marketWindowForm.versionLowerLimit>this.marketWindowForm.versionUpperLimit?this.$message.error("开始版本要小于结束版本"):this.marketWindowForm.startTime>this.marketWindowForm.endTime?this.$message.error("开始时间要小于结束时间"):this.$refs.marketWindowForm.validate((e=i()(o.a.mark(function e(r){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=12;break}return e.prev=1,t.marketWindowForm.showFrequency=0,e.next=5,t.$http.put("/config/market-window-web",t.marketWindowForm);case 5:"200"===(a=e.sent).code?(t.$message.success("更新成功!"),t.closeDialog()):t.$message.error(a.message),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0);case 12:case"end":return e.stop()}},e,t,[[1,9]])})),function(t){return e.apply(this,arguments)}))})}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"border"},[r("el-dialog",{attrs:{title:"编辑运营弹窗",visible:e.ifshow,"before-close":e.closeDialog},on:{"update:visible":function(t){e.ifshow=t},open:e.openDialog}},[r("el-form",{ref:"marketWindowForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.marketWindowForm,rules:e.rules,"label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"应用名称"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.appName,callback:function(t){e.$set(e.marketWindowForm,"appName",t)},expression:"marketWindowForm.appName"}},e._l(e.$formatter.getSelectionOptions("appNames"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"生效终端"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.terminal,callback:function(t){e.$set(e.marketWindowForm,"terminal",t)},expression:"marketWindowForm.terminal"}},e._l(e.$formatter.getSelectionOptions("terminals"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"用户标签"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.userTag,callback:function(t){e.$set(e.marketWindowForm,"userTag",t)},expression:"marketWindowForm.userTag"}},e._l(e.$formatter.getSelectionOptions("userTags"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"优先级"}},[r("el-input-number",{staticStyle:{width:"217px"},attrs:{"controls-position":"right",min:1,max:999},model:{value:e.marketWindowForm.priority,callback:function(t){e.$set(e.marketWindowForm,"priority",t)},expression:"marketWindowForm.priority"}})],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{staticStyle:{width:"672px"},attrs:{placeholder:"标题"},model:{value:e.marketWindowForm.title,callback:function(t){e.$set(e.marketWindowForm,"title",t)},expression:"marketWindowForm.title"}})],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"弹窗链接"}},[r("el-input",{staticStyle:{width:"672px"},attrs:{placeholder:"弹窗链接"},model:{value:e.marketWindowForm.popUrl,callback:function(t){e.$set(e.marketWindowForm,"popUrl",t)},expression:"marketWindowForm.popUrl"}})],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"版本号下限"}},[r("el-select",{staticStyle:{width:"107px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.versionLowerLimit,callback:function(t){e.$set(e.marketWindowForm,"versionLowerLimit",t)},expression:"marketWindowForm.versionLowerLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.marketWindowForm.appName),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),r("el-select",{staticStyle:{width:"107px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.versionUpperLimit,callback:function(t){e.$set(e.marketWindowForm,"versionUpperLimit",t)},expression:"marketWindowForm.versionUpperLimit"}},e._l(e.$formatter.getSelectionOptions("versions_"+e.marketWindowForm.appName),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"弹框位置"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.marketWindowForm.popPosition,callback:function(t){e.$set(e.marketWindowForm,"popPosition",t)},expression:"marketWindowForm.popPosition"}},e._l(e.$formatter.getSelectionOptions("marketPositions"),function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"开始时间"}},[r("el-date-picker",{staticStyle:{width:"217px"},attrs:{type:"datetime",placeholder:"选择开始时间","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.marketWindowForm.startTime,callback:function(t){e.$set(e.marketWindowForm,"startTime",t)},expression:"marketWindowForm.startTime"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"结束时间"}},[r("el-date-picker",{staticStyle:{width:"217px"},attrs:{type:"datetime",placeholder:"选择结束时间","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.marketWindowForm.endTime,callback:function(t){e.$set(e.marketWindowForm,"endTime",t)},expression:"marketWindowForm.endTime"}})],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"状态"}},[r("el-radio-group",{model:{value:e.marketWindowForm.status,callback:function(t){e.$set(e.marketWindowForm,"status",t)},expression:"marketWindowForm.status"}},[r("el-radio",{attrs:{label:!0}},[e._v("有效")]),e._v(" "),r("el-radio",{attrs:{label:!1}},[e._v("无效")])],1)],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"弹窗图片"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.actionUrl,"show-file-list":!1,"on-change":e.handleFilesChange}},[e.marketWindowForm.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.marketWindowForm.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),e._v(" "),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:40}},[r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.saveMarketWindow}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:e.closeDialog}},[e._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=r("VU/8")(c,p,!1,function(e){r("JbsD")},null,null);t.default=d.exports}});
//# sourceMappingURL=13.9c6ed86b94720bd3a1e5.js.map