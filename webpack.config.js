const path = require('path') //引入node内置模块path
let HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin');
const { merge } = require("webpack-merge"); //合并webpack
const productionConfig = require("./config/webpack.prod.config"); //prod环境的webpack
const developmentConfig = require("./config/webpack.dev.config"); //dev环境的webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css
let webpack = require("webpack");
const  apiConfig = require("./config/api"); //api配置

const webpackConfigBase = {
  entry: './src/main.js',  // 入口文件，把src下的main.js编译到出口文件
  output: {     //出口文件
    path: path.resolve(__dirname, 'dist'), //出口路径和目录
    filename: "bundle.js",      //编译后的名称
    publicPath: "/"
  },
  // mode: 'development',
  // devServer: {
  //   contentBase: path.join(__dirname, "dist/"),//提供内容的目录
  //   host: "localhost", //启动主机名
  //   port: "8080", //启动端口
  //   open: true, //自动打开浏览器
  //   compress: true, //gzip压缩
  //   hot: true, //启用热更新
  //   historyApiFallback: true, //该路径为打包后的首页路径即dist目录下的index.html页面(404情况)
  // },
  module: {
    rules: [ //遍历规则
      {
        test: /\.js$/, //匹配以js结尾的文件
        loader: "babel-loader", // 使用babel-loader编译
        exclude: /node_modules/ //node_module里面的内容不遍历
      },
      {
        //正则表达式匹配.css为后缀的文件
        test: /\.(css|scss)$/,
        //使用loader
        use: [
          { loader: process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [{
            loader: "url-loader",
            options: {
                //图片小于10kb就是图片地址，大于正常打包成base64格式编码    
                limit: 10000,
               //输出路径
                outputPath: 'img/',
                esModule:false
            }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
       }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    },
    // 指明第三方包 ，减少打包时间
    modules: [path.resolve(__dirname,"node_modules")]
  },
  plugins: [
    new VueLoaderPlugin(), //vue-loader的使用都是需要伴生 VueLoaderPlugin配合
    new HtmlWebpackPlugin({ //自动插入到dist目录中
      template: './public/index.html', //使用模板
      favicon: './favicon.ico'
      // filename: 'login.html'   //产出名称(一般不写)
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      // A: JSON.stringify(process.env.NODE_ENV),
      API_CONGFIG: JSON.stringify(apiConfig)
    })
  ]
  // devtool: "source-map",  // 开启调试模式
}

// 通过 --env传进来的参数 mode
module.exports = mode => {
  if(mode === "build"){
      return merge(webpackConfigBase,productionConfig);   
  }
  return merge(webpackConfigBase,developmentConfig);
}