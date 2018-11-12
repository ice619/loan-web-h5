/** 通用参数 */
const config = {
  // 应用名
  appNames: [{
    value: 1,
    label: '闪贷'
  }, {
    value: 2,
    label: '速贷'
  }, {
    value: 3,
    label: '应急现金'
  }, {
    value: 4,
    label: '惠花花'
  }, {
    value: 5,
    label: '秒购'
  }, {
    value: 6,
    label: '分多多'
  }]
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

const formatStatus = function (row, col, val) {
  return val ? '有效' : '失效'
}

exports.install = function (Vue, options) {
  Vue.prototype.globalConfig = config
  Vue.prototype.formatAppNum = formatAppNum
  Vue.prototype.formatStatus = formatStatus
}
