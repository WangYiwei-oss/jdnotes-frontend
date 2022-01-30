const path = require('path');
const resolve = dir => path.join(__dirname, dir);
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath:'/',
  assetsDir: "assets",
  outputDit: "dist",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    // 配置代理
    // 本地ip地址
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      "^/api": {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true, // 是否改变域名
        pathRewrite: {
        //   // 路径重写
           '^/api': '' // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      },
    },
  },
}
