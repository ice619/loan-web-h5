import fetch from '@/utils/fetch'
import { Notification } from 'element-ui'
import {getToken} from '@/utils/VueCookies'

export default class Permission {
  static hasPermission (...values) {
    let permission = localStorage.getItem('permission')
    if (!permission || permission === '') {
      return false
    }
    let permissions = permission.split(',')
    if (values.some(value => permissions.some(item => item === value))) {
      return true
    }
    return false
  }
}

export function loanPermission () {
  let sessionId = getToken()
  if (localStorage.getItem('sessionId') === sessionId && localStorage.getItem('permission')) {
    return
  }

  fetch.get(process.env.API_ROOT + '/user-permission/list').then(res => {
    if (res && res.code === '200') {
      localStorage.setItem('sessionId', sessionId)
      localStorage.setItem('permission', res.data)
    } else {
      Notification.error({title: 'load permission fail', duration: 3000})
    }
  }).catch(e => {
    console.info(e)
    Notification.error({title: 'load permission error', duration: 3000})
  })
}
