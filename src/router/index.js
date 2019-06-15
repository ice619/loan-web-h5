import Vue from 'vue'
import Router from 'vue-router'
import fetch from '@/utils/fetch'
import {getToken, setToken, setLanguage, getLanguage} from '@/utils/VueCookies'
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
import customerAuthenticationExt from '@/views/customerAuthenticationExt/list'
import customerLoginInfo from '@/views/customerLoginInfo/login-info'
import encryptedPhone from '@/views/encryptedPhone/info'
import deleteData from '@/views/deleteData/base'
import riskInterfaceRecord from '@/views/customerReviewPushRiskLog/riskInterfaceRecord'
import dockingRequestLog from '@/views/dockingRequestLog/list'
import unionLoginRequestLog from '@/views/unionLoginRequestLog/list'
import redisQuery from '@/views/redisQuery/base'
import goodsQuery from '@/views/goodsQuery/list'
import dict2 from '@/views/dict2/index'
import customerConfigRejectLoanTip from '@/views/customerConfigRejectLoanTip/list'
import customerConfigQuota from '@/views/customerConfigQuota/list'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: dict2
    },
    {
      path: '/ios-company-sign',
      name: 'iosCompanySign',
      component: iosCompanySign
    },
    {
      path: '/dict2',
      name: 'dict2',
      component: dict2
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
    },
    {
      path: '/customer-authentication-ext',
      name: 'customerAuthenticationExt',
      component: customerAuthenticationExt
    },
    {
      path: '/login-info',
      name: 'customerLoginInfo',
      component: customerLoginInfo
    },
    {
      path: '/encrypted-phone',
      name: 'encryptedPhone',
      component: encryptedPhone
    },
    {
      path: '/delete-data',
      name: 'deleteData',
      component: deleteData
    },
    {
      path: '/risk-interface-record',
      name: 'riskInterfaceRecord',
      component: riskInterfaceRecord
    },
    {
      path: '/docking-request-log',
      name: 'dockingRequestLog',
      component: dockingRequestLog
    },
    {
      path: '/union-login-request-log',
      name: 'unionLoginRequestLog',
      component: unionLoginRequestLog
    },
    {
      path: '/redis-query',
      name: 'redisQuery',
      component: redisQuery
    },
    {
      path: '/goods-query',
      name: 'goodsQuery',
      component: goodsQuery
    },
    {
      path: '/reject-tip',
      name: 'customerConfigRejectLoanTip',
      component: customerConfigRejectLoanTip
    },
    {
      path: '/default-quota',
      name: 'customerConfigQuota',
      component: customerConfigQuota
    }
  ],
  mode: 'history'// 去除#号
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 集成系统传递过来的 xxl_sso_sessionid 、 lang
  setLanguage(to.query.lang)
  setToken(to.query.xxl_sso_sessionid)
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      loadDict(next)
    }
  } else {
    window.location.href = process.env.LOGIN_URL
  }
})

// 加载数据字典
function loadDict (next) {
  fetch.get('/dict-big/selections/loan/' + getLanguage()).then(res => {
    if (res && res.code === '200') {
      Formatter.selections = res.data
    }
    next()
  }).catch(e => {
    console.info(e)
    next()
  })
}

export default router
