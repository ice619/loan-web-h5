import Vue from 'vue'
import Router from 'vue-router'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
import marketWindow from '@/views/marketWindow/list'
import guide from '@/views/guide/guide_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: guide
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
    },
    {
      path: '/guide-page',
      name: 'guide',
      component: guide
    }
  ]
})
