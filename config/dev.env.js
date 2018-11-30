'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  API_ROOT:'"//192.168.87.223:8961"'
  // API_ROOT:'"//devfdd.51huihuahua.com"'
})
