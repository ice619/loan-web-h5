import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import iosCompanySign from '@/views/iosCompanySign/list'
import marketWindow from '@/views/marketWindow/list'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: iosCompanySign
    },
    {
      path: '/ios-company-sign',
      name: 'iosCompanySign',
      component: iosCompanySign
    },
    {
      path: '/market-window',
      name: 'marketWindow',
      component: marketWindow
    }
  ]
})
