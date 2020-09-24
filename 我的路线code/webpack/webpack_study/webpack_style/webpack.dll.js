/*
 * @Author: your name
 * @Date: 2020-09-13 23:50:59
 * @LastEditTime: 2020-09-13 23:55:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \webpack_study\webpack_style\webpack.dll.js
 */
// 使用dll对某些库进行单独打包

const { resolve } = require("path")
const webpack = require('webpack')

module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字

  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ]
}