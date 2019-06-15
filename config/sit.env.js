'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  API_ROOT:'"http://172.16.11.40:9015/loanweb"',
  LOGIN_URL: '"http://devxiaoniuwebui.58fqt.com/login"'
})
