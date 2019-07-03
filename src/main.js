// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fetch from '@/utils/fetch'
import global from '@/utils/global'
import formatter from '@/utils/formatter'
import permission from '@/utils/permission'

import App from './App'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// use
Vue.use(VueQuillEditor)
Vue.use(Element)
Vue.use(global)

Vue.prototype.$http = fetch
Vue.prototype.$formatter = formatter
Vue.prototype.$permission = permission
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
