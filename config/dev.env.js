'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  LOGIN_URL: '"http://devxiaoniuwebui.58fqt.com/login"',
  // LOGIN_URL: '"https://testxiaoniuwebui.fqt188.com/login"',
  API_ROOT:'"http://127.0.0.1:9015/loanweb"'
  // API_ROOT:'"http://devxiaoniuwebui.58fqt.com/loanweb"'
  // API_ROOT:'"https://testcallback.fqt188.com/loanweb"',
})
