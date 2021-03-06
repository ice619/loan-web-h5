'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"',
  API_ROOT:'"https://testcallback.fqt188.com/loanweb"',
  LOGIN_URL: '"https://testxiaoniuwebui.fqt188.com"'
})
