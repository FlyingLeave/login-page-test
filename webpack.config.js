const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: ['./src/main.js'],
	output: {
		path: path.resolve( __dirname + '/dist' ),
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/i,
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				use: [
					// MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({template: './src/index.html'}), 
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin()
	],
	resolve: {
		extensions: ['*', '.js', '.vue', 'json', 'css'],
		alias: {
			'@': path.resolve( __dirname + '/src')
		}
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		// watchOptions: {
		// 	poll: true
		// }
		// clientLogLevel: 'silent'
	}
}
