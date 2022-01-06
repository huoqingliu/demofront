const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
//项目部署基础
// 默认情况下，项目部署在域的根目录下
// 例如：https://www.mp-app.com
// 默认：'/'
// 如果应用部署在子路径中，则需要指定子路径
// 例如：https://www.mp-app.com/demofront/
// 则需要改为'demofront'
// const BASE_URL = process.env.MODE_ENV === 'development' ? '/' : '/'
const BASE_URL = process.env.NODE_ENV ==='development'?'/':'demofront'
module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.performance.set('hints', false)
    // 设置字符代替路径
    config.resolve.alias
    .set('@', resolve('src'))
    .set('_c', resolve('src/components'))
  },
  // 设置为false时，打包不生成.map文件
  productionSourceMap:false,
  transpileDependencies: [
    'iview-design',
    'axios',
  ],
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  // 设置开发环境的配置
  devServer: {
    open: true,
    proxy: {
      // 处理以/api开头路径的请求
      '/api': {
        target: 'http://localhost:9080', // 转发的目标地址
        pathRewrite: {
          '^/api': '' // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域
      },
      'wangyi': {
        target: 'http://m.you.163.com', // 转发的目标地址
        pathRewrite: {
          '^/wangyi': '' // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域
      }
    }
  },
}