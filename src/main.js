// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fetch from './utils/fetch'
import global from './utils/global'
import formatter from './utils/formatter'

import App from './App'
import router from './router'

Vue.use(Element)
Vue.use(global)

Vue.prototype.$http = fetch
Vue.prototype.$formatter = formatter
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
