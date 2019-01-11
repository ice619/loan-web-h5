'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // API_ROOT:'"//devfdd.51huihuahua.com"'
  API_ROOT:'"//localhost:8971"'
})
