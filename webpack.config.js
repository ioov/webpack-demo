let path = require('path');
let	webpack = require('webpack');
let	glob = require('glob');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let APP_PATH = path.resolve(__dirname);

function feaEntry(devDir, ignore) {
    let iPattern = [];
    //忽略的文件或文件夹
    if (ignore) {
        if (ignore.forEach) {
            let tmpPattern = '';
            ignore.forEach(function(ing, ind) {
                if (/\.js$/.test(ing)) {
                    //如果是具体的文件路径，则直接添加到ignore数组中。
                    iPattern.push(devDir + ing);
                } else {
                    if (!/\//g.test(ing)) {
                        //如果是目录，则拼装成 | | 的表达式，目前只支持一级目录
                        if (tmpPattern) {
                            tmpPattern = tmpPattern + '|' + ing;
                        } else {
                            tmpPattern = tmpPattern + ing;
                        }
                    }
                }
            });

            iPattern.push(devDir + '*(' + tmpPattern + ')/**/*.js');
        }
    } else {

    }

    let entrys = glob.sync(devDir + '/**/index.*js', {
        ignore: iPattern
    })

    //将入口文件名称转换为入口对象
    let entryObj = {};
    entrys.forEach(function(entry, ind) {
        entryObj[entry.replace(devDir, '').replace(/.js$/, '')] = entry;
    });

    return entryObj;
};

let entrys = feaEntry(APP_PATH+'/src/js/');
entrys['common/vendor'] = ['vue','vue-router','vuex'];

module.exports = {
	entry: entrys,
	output: {
		path: APP_PATH + '/dist/',
		filename: 'js/[name].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			"@": APP_PATH+'/src/',
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
