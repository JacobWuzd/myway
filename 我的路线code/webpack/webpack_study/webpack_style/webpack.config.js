/*
 * @Author: your name
 * @Date: 2020-09-09 21:43:00
 * @LastEditTime: 2020-09-17 10:25:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack_study\webpack_style\webpack.config.js
 */
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')

// 设置node.JS环境变量
// process.env.NODE_ENV = 'production'

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'built.[contenthash:10].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
      /* {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre', // 优先执行
          options: {
            fix: true
          }
        }, */
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [
              // 'style-loader', 
              // MiniCssExtractPlug的loader取代style-loader，用来提取JS中的css成为单独的文件
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: () => [
                      // postcss的插件
                      require('postcss-preset-env')()
                    ]
                  }
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            // 不能处理html的img图片
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理，优点是减少请求数量，减轻服务器压力
              // 缺点是图片体积会更大
              limit: 8 * 1024,
              // 关闭es6模块引入，使用common.js模块引入，因为html-loader是common.js模块引入的，
              // 而url-loader默认是es6模块引入
              esModule: false,
              // name表示重命名，这里是取图片hash名的前十位
              name: '[contenthash: 10].[ext]',
              // 图片资源输出的文件夹
              outputPath: 'imgs'
            }
          },
          {
            test: /\.html$/,
            // 处理html文件的img图片，负责引入img，从而能被url-loader处理
            loader: 'html-loader'
          },
          // 打包其他资源
          {
            // 排除css、js、html资源
            exclude: /\.(css|js|html|scss|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[contenthash: 10].[ext]'
            }
          },
          {
            // 1.基本的兼容处理：@babel/preset-env，@babel/core
            // 2.全部JS兼容处理：@babel/polyfill
            // 3.按需加载: core-js
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              // 开启多进程打包
              // 进程启动大概600ms，进程通信也有开销
              // 只有工作时间消耗时间长，才需要多进程打包
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 启动2个进程
                }
              }, 
              {
                loader: 'babel-loader',
                options: {
                  // 预设环境
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3
                        },
                        // 指定兼容性做到哪个版本浏览器
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10'
                        }
                      }
                    ]
                    
                  ],
                  // 开启babel缓存
                  // 第二次构建时，会读取之前的缓存，不会重新去构建之前已经转换过的代码
                  cacheDirectory: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 复制index.html并加入JS资源
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bulit.[contenthash:10].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      // 帮助serivceWorker快速启动，删除旧的serviceworker
      // 生成一个serviceworker配置文件
    }),
    // 告诉webpack那些库不参与打包，同时使用时的名称也得变
    /* new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    }) */
  ],
  mode: 'development',

  // 开发服务器devServer，用来自动化，自动编译，自动打开浏览器和刷新浏览器
  // 特点是：只会在内存中编译打包，不会有任何输出
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    // 打开浏览器
    open: true,
    // 开启HMR
    hot: true

  },
  devtool: 'source-map', // 用来映射追踪源代码的报错信息
  externals: {
    // 忽略的包名
    jquery: 'jqurey'
  }
}