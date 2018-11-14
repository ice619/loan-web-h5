import Vue from 'vue'
import Router from 'vue-router'
import fetch from '@/utils/fetch'
import Formatter from '@/utils/formatter'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
import marketWindow from '@/views/marketWindow/list'
import guide from '@/views/guide/list'
import switchTrade from '@/views/switchTrade/list'
import dict from '@/views/dict/big-list'

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
    },
    {
      path: '/dict',
      name: 'dict',
      component: dict
    }
  ]
})

router.beforeEach((to, from, next) => {
  let selectionsStr = localStorage.selections
  if (selectionsStr) {
    Formatter.selections = JSON.parse(selectionsStr)
    next()
  } else {
    fetch.get('/config/dic-big/selections').then(res => {
      Formatter.selections = res.data
      localStorage.selections = JSON.stringify(res.data)
    }).then(() => next())
  }
})

export default router
