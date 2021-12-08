const { merge } = require('webpack-merge');
const Base = require('./webpack.base.js')

const devConfig = {
  mode: 'development',
  devtool: "cheap-module-eval-source-map", 
  watch: true,
}

module.exports = merge(Base, devConfig);