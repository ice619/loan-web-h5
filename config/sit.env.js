'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  API_ROOT:'"//devfdd.51huihuahua.com"'
})
