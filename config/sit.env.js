'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  LOGIN_URL: '"http://devxiaoniuwebui.58fqt.com/login"',
  API_ROOT:'"//devfdd.51huihuahua.com"'
})
