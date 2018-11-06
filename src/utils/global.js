/** 通用参数 */
const config = {
  // 规则类型
  ruleTypes: [{
    value: 1,
    label: '禁止项规则'
  }, {
    value: 2,
    label: '交叉规则'
  }, {
    value: 3,
    label: '条件规则'
  }, {
    value: 4,
    label: '欺诈项规则'
  }, {
    value: 5,
    label: '信用评分规则'
  }],
  // 征信源
  creditAgencys: [{
    value: 1,
    label: '同盾'
  }, {
    value: 2,
    label: '聚信立蜜蜂'
  }, {
    value: 3,
    label: '聚信立蜜罐'
  }, {
    value: 4,
    label: '芝麻信用'
  }, {
    value: 5,
    label: '91信用卡'
  }, {
    value: 6,
    label: '宜信'
  }, {
    value: 7,
    label: '中智诚'
  }, {
    value: 8,
    label: '闪贷拒绝名单'
  }, {
    value: 9,
    label: '欺诈评分拒绝名单'
  }, {
    value: 10,
    label: '白骑士'
  }, {
    value: 11,
    label: '小视科技'
  }, {
    value: 12,
    label: '葫芦'
  }, {
    value: 13,
    label: '小牛准入-潘多拉'
  }, {
    value: 14,
    label: '小牛准入-大数据'
  }, {
    value: 15,
    label: '同盾模型'
  }, {
    value: 16,
    label: '聚信立蜜蜂模型'
  }, {
    value: 17,
    label: '聚信立蜜罐模型'
  }, {
    value: 18,
    label: '大圣'
  }, {
    value: 19,
    label: '新颜'
  }, {
    value: 20,
    label: '冰鉴'
  }, {
    value: 21,
    label: '云峰'
  }, {
    value: 22,
    label: '富数'
  }, {
    value: 23,
    label: '探知'
  }, {
    value: 24,
    label: '91征信模型'
  }, {
    value: 25,
    label: '蜜罐V3'
  }, {
    value: 26,
    label: '交叉规则验证'
  }, {
    value: 27,
    label: '复借模型'
  }, {
    value: 28,
    label: '凭安模型'
  }, {
    value: 29,
    label: 'IOS信用模型'
  }, {
    value: 30,
    label: '探知模型'
  }]
}

const formatCreditAgency = function (row, col, val) {
  let label = null
  config.creditAgencys.forEach(creditAgency => {
    if (creditAgency.value === val) {
      label = creditAgency.label
    }
  })
  return label
}

exports.install = function (Vue, options) {
  Vue.prototype.globalConfig = config
  Vue.prototype.formatCreditAgency = formatCreditAgency
}
