/** 通用参数 */
const config = {
  // 应用名
  appNames: [{value: 1, label: '闪贷'}, {value: 2, label: '速贷'}, {value: 3, label: '应急现金'}, {value: 4, label: '惠花花'}, {value: 5, label: '秒购'}, {value: 6, label: '分多多'}],
  status: [{value: true, label: '有效'}, {value: false, label: '失效'}],
  userTags: [{value: 1, label: '全部用户'}, {value: 2, label: '仅注册用户'}, {value: 3, label: '审核失败用户'}, {value: 4, label: '过审未借款用户'}, {value: 5, label: '已借款用户'}, {value: 6, label: '逾期用户'}, {value: 7, label: '逾期7天未还款用户'}],
  terminals: [{value: 1, label: '全部'}, {value: 2, label: '安卓'}, {value: 3, label: 'IOS'}],
  position: [{value: 1, label: '借款页'}, {value: 2, label: '商场页'}, {value: 3, label: '提额页'}, {value: 4, label: '赚钱页'}, {value: 5, label: '我的页'}, {value: 6, label: '绑卡页'}, {value: 7, label: '身份认证页'}, {value: 8, label: '个人信息页'}, {value: 9, label: '信用认证页'}],
  displayPosition: [{value: 1, label: '页头'}, {value: 2, label: '页中'}, {value: 3, label: '页尾'}],
  judges: [{value: 1, label: '<'}, {value: 2, label: '<='}, {value: 3, label: '='}, {value: 4, label: '>'}, {value: 5, label: '>='}],
  versions: [{value: 1, label: '1.8.0'}, {value: 2, label: '1.8.2'}, {value: 3, label: '1.8.3'}]
}

const formatAppNum = function (row, col, val) {
  let label = null
  config.appNames.forEach(appName => {
    if (appName.value === val) {
      label = appName.label
    }
  })
  return label
}

const formatUserTags = function (row, col, val) {
  let label = null
  config.userTags.forEach(userTag => {
    if (userTag.value === val) {
      label = userTag.label
    }
  })
  return label
}

const formatStatus = function (row, col, val) {
  let label = null
  config.status.forEach(state => {
    if (state.value === val) {
      label = state.label
    }
  })
  return label
}

const formatSkip = function (row, col, val) {
  if (val) {
    return '支持'
  }
  return '不支持'
}

const formatTerminals = function (row, col, val) {
  let label = null
  config.terminals.forEach(terminal => {
    if (terminal.value === val) {
      label = terminal.label
    }
  })
  return label
}

const formatVersions = function (row, col, val) {
  let label = null
  config.versions.forEach(version => {
    if (version.value === val) {
      label = version.label
    }
  })
  return label
}

const formatTimeStamp = function (timeStamp, format) {
  if (!timeStamp) return null
  if (timeStamp < 1000000000000) timeStamp *= 1000
  let date = new Date(timeStamp)
  return formatDate(date, format)
}

const formatDate = function (date, format) {
  if (!date) return null
  if (!format) format = 'yyyy-MM-dd hh:mm:ss'
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

exports.install = function (Vue, options) {
  Vue.prototype.globalConfig = config
  Vue.prototype.formatAppNum = formatAppNum
  Vue.prototype.formatStatus = formatStatus
  Vue.prototype.formatSkip = formatSkip
  Vue.prototype.formatUserTags = formatUserTags
  Vue.prototype.formatTerminals = formatTerminals
  Vue.prototype.formatVersions = formatVersions
  Vue.prototype.formatTimeStamp = formatTimeStamp
  Vue.prototype.formatDate = formatDate
}
