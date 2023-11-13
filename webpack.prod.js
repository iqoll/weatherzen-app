const { merge} = require('webpack-merge')
const configJs = require('./webpack.config')
const Dotenv = require('dotenv-webpack')

const prodJs = {
  mode: "production",
  plugins: [
    new Dotenv()
  ]
}

module.exports = merge(configJs, prodJs)