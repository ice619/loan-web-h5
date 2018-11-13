import Vue from 'vue'
import Router from 'vue-router'
import fetch from '@/utils/fetch'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
import marketWindow from '@/views/marketWindow/list'
import guide from '@/views/guide/list'
import switchTrade from '@/views/switchTrade/list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: switchTrade
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
    },
    {
      path: '/switch-trade',
      name: 'switchTrade',
      component: switchTrade
    }
  ]
})

router.beforeEach((to, from, next) => {
  fetch.get('/config/dic-big/selections').then(res => {
    localStorage.selections = JSON.stringify(res.data)
  }).then(() => next())
})

router.afterEach(() => {
})

export default router
