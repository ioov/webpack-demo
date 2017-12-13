var path = require('path'),
	webpack = require('webpack'),
	ROOT_PATH = path.resolve(__dirname),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		"index/demo": ROOT_PATH + '/src/index.js',
		"common/vendor": ["vue", "vue-router", "vuex"]
	},
	output: {
		path: ROOT_PATH + '/dist/',
		filename: 'js/[name].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			//You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		loaders: [{
			test: /\.css$/,
			// use: ['style-loader', 'css-loader']
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			options: {
				cacheDirectory: true,
				presets: [
					['es2015', { loose: true, module: false }], 'stage-0'
				],
				plugins: ['transform-runtime']
			},
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			use: 'vue-loader'
		}, {
			test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}]
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common/manifest',
			minChunks: 2
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'manifest',
		// 	minChunks: function(module) {
		// 		if (module.resource && (/^.*\.(css)$/).test(module.resource)) {
		// 			return false;
		// 		}
		// 		return module.context && module.context.indexOf('node_modules') !== -1;
		// 	}
		// }),
		new ExtractTextPlugin('css/[name].css')
	],
	devServer: {
		contentBase: path.resolve(__dirname),
		publicPath: '/',
		proxy: {
			'/dataApi': {
				target: 'http://open.onebox.so.com',
				changeOrigin: true
			}
		},
		historyApiFallback: true,
		hot: true,
		inline: true,
		quiet: true,
		open: false
	}
};
