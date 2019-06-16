'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  LOGIN_URL: '"http://devxiaoniuwebui.58fqt.com/login"',
  API_ROOT:'"127.0.0.1:9015/loanweb"'
})
