import Vue from 'vue'
import Router from 'vue-router'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
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
      path: '/banner',
      name: 'banner',
      component: banner
    },
    {
      path: '/market-window',
      name: 'marketWindow',
      component: marketWindow
    }
  ]
})
