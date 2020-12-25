const path = require('path') //引入node内置模块path
let webpack = require("webpack");
module.exports = {
    mode: 'development',
    // mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.join(__dirname, "dist/"),//提供内容的目录
        host: "localhost", //启动主机名
        port: "8000", //启动端口
        open: true, //自动打开浏览器
        compress: true, //gzip压缩
        hot: true, //启用热更新
        historyApiFallback: true, //该路径为打包后的首页路径即dist目录下的index.html页面(404情况)
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象
    ],
    devtool: "source-map",  // 开启调试模式
};