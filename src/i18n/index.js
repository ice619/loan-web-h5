/* eslint-disable no-undef,camelcase */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import Cookies from 'js-cookie'
import zhCN from './langs/zh_CN'
import enUS from './langs/en_US'
Vue.use(VueI18n)

const messages = {
  en: enUS,
  en_US: enUS,
  zh: zhCN,
  zh_CN: zhCN
}

// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
  locale: Cookies.get('language'),
  fallbackLocale: 'zh_CN',
  messages
})

locale.i18n((key, value) => i18n.t(key, value))
export default i18n
