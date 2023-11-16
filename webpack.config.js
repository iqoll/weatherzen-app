const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: '',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    assetModuleFilename: 'assets/weather-icons/[name][ext]'
  },
  devServer: {
    watchFiles: ["src/**/*"],
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WeatherZen',
      filename: 'index.html',
      template: 'src/template.html',
      favicon: 'src/assets/favicon.ico'
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env')
    })
  ]
} 