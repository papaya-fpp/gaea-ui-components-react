const { merge } = require('webpack-merge');
const Base = require('./webpack.base.js')

const prodConfig = {
  mode: 'production',
  devtool: "cheap-module-eval-source-map", 
}

module.exports = merge(Base, prodConfig);