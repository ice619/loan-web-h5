import Vue from 'vue'
import Router from 'vue-router'
import fetch from '@/utils/fetch'
import Formatter from '@/utils/formatter'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
import marketWindow from '@/views/marketWindow/list'
import transactionReminderConfig from '@/views/transactionReminderConfig/list'
import guide from '@/views/guide/list'
import transactionSwitch from '@/views/transactionSwitch/list'
import dict from '@/views/dict/big-list'
import fadada from '@/views/fadada/list'
import fadadaContract from '@/views/fadadaContract/list'
import appPatchVersion from '@/views/appPatchVersion/list'
import sesameCertificationSwitch from '@/views/sesameCertificationSwitch/list'
import appVersionAudit from '@/views/appVersionAudit/list'
import appVersion from '@/views/appVersion/list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: transactionSwitch
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
      path: '/transaction-reminder-config',
      name: 'transactionReminderConfig',
      component: transactionReminderConfig
    },
    {
      path: '/transaction-switch',
      name: 'transactionSwitch',
      component: transactionSwitch
    },
    {
      path: '/dict',
      name: 'dict',
      component: dict
    },
    {
      path: '/fadada',
      name: 'fadada',
      component: fadada
    },
    {
      path: '/fadada-contract',
      name: 'fadadaContract',
      component: fadadaContract
    },
    {
      path: '/app-patch-version',
      name: 'appPatchVersion',
      component: appPatchVersion
    },
    {
      path: '/sesame-certification-switch',
      name: 'sesameCertificationSwitch',
      component: sesameCertificationSwitch
    },
    {
      path: '/appVersionAudit',
      name: 'appVersionAudit',
      component: appVersionAudit
    },
    {
      path: '/appVersion',
      name: 'appVersion',
      component: appVersion
    }
  ]
})

router.beforeEach((to, from, next) => {
  let selectionsStr = localStorage.selections
  if (selectionsStr) {
    Formatter.selections = JSON.parse(selectionsStr)
    next()
  } else {
    fetch.get('/config/dict-big/selections').then(res => {
      if (res && res.code === '200') {
        Formatter.selections = res.data
        localStorage.selections = JSON.stringify(res.data)
      }
      next()
    })
  }
})

export default router
