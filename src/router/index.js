import Vue from 'vue'
import Router from 'vue-router'
import fetch from '@/utils/fetch'
import Formatter from '@/utils/formatter'
import iosCompanySign from '@/views/iosCompanySign/list'
import banner from '@/views/banner/list'
import bannerAdd from '@/views/banner/add-page'
import bannerEdit from '@/views/banner/edit-page'
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
import customerReviewPushRiskLog from '@/views/customerReviewPushRiskLog/list'
import appClosureSwitch from '@/views/appClosureSwitch/list'
import systemDict from '@/views/systemDict/list'
import systemDictChildList from '@/views/systemDict/child-list'
import faceLevelConfig from '@/views/faceLevelConfig/list'
import customerInfo from '@/views/customerInfo/base'
import customerLatestReviewInfo from '@/views/customerLatestReviewInfo/list'
import customerThirdPartyCertification from '@/views/customerThirdPartyCertification/list'
import customerExt from '@/views/customerInfo/ext-list'
import customerLoginLog from '@/views/customerLoginLog/list'
import taobaoCertificationSwitch from '@/views/taobaoCertificationSwitch/list'
import advertsPage from '@/views/advertsPage/list'
import noticeTemplate from '@/views/noticeTemplate/list'
import importProductOrder from '@/views/importProductOrder/list'
import productOrder from '@/views/productOrder/list'
import customerMarketing from '@/views/customerMarketing/list'
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
      path: '/banner-add',
      name: 'bannerAdd',
      component: bannerAdd
    },
    {
      path: '/banner-edit/:bannerId',
      name: 'bannerEdit',
      component: bannerEdit
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
      path: '/app-version-audit',
      name: 'appVersionAudit',
      component: appVersionAudit
    },
    {
      path: '/app-version',
      name: 'appVersion',
      component: appVersion
    },
    {
      path: '/customer-review-push-risk-log',
      name: 'customerReviewPushRiskLog',
      component: customerReviewPushRiskLog
    },
    {
      path: '/app-closure-switch',
      name: 'appClosureSwitch',
      component: appClosureSwitch
    },
    {
      path: '/system-dict',
      name: 'systemDict',
      component: systemDict
    },
    {
      path: '/system-dict-child/:dictionaryId/:appName',
      name: 'systemDictChildList',
      component: systemDictChildList
    },
    {
      path: '/face-level-config',
      name: 'faceLevelConfig',
      component: faceLevelConfig
    },
    {
      path: '/customer-info',
      name: 'customerInfo',
      component: customerInfo
    },
    {
      path: '/customer-latest-review-info',
      name: 'customerLatestReviewInfo',
      component: customerLatestReviewInfo
    },
    {
      path: '/customer-third-party-certification',
      name: 'customerThirdPartyCertification',
      component: customerThirdPartyCertification
    },
    {
      path: '/customer-ext',
      name: 'customerExt',
      component: customerExt
    },
    {
      path: '/customer-login-log',
      name: 'customerLoginLog',
      component: customerLoginLog
    },
    {
      path: '/taobao-certification-switch',
      name: 'taobaoCertificationSwitch',
      component: taobaoCertificationSwitch
    },
    {
      path: '/adverts-page',
      name: 'advertsPage',
      component: advertsPage
    },
    {
      path: '/notice-template',
      name: 'noticeTemplate',
      component: noticeTemplate
    },
    {
      path: '/import-product-order',
      name: 'importProductOrder',
      component: importProductOrder
    },
    {
      path: '/product-order',
      name: 'productOrder',
      component: productOrder
    },
    {
      path: '/customer-marketing',
      name: 'customerMarketing',
      component: customerMarketing
    }
  ]
})

router.beforeEach((to, from, next) => {
  fetch.get('/management/dict-big/selections').then(res => {
    if (res && res.code === '200') {
      Formatter.selections = res.data
    }
    next()
  }).catch(e => {
    console.info(e)
    next()
  })
})

export default router
