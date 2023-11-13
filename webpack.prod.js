const { merge} = require('webpack-merge')
const configJs = require('./webpack.config') 

const prodJs = {
  mode: "production",
}

module.exports = merge(configJs, prodJs)