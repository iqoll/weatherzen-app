const { merge} = require('webpack-merge')
const configJs = require('./webpack.config')
const webpack = require('webpack')

const prodJs = {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY)
      } 
    })
  ]
}

module.exports = merge(configJs, prodJs)