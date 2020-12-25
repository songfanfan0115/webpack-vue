const path = require('path'); //引入node内置模块path
// 清除目录等
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	// mode: process.env.NODE_ENV,
	plugins: [
		//删除dist目录
		new CleanWebpackPlugin(),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		new UglifyJsPlugin(),
	]
};
