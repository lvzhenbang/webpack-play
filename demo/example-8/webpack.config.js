const webpack = require('webpack');
module.exports = {
	entry: {
		app: './main.js',
		vendor: ['lodash']
	},
	externals: {
		jquery: 'window.$'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_ : 'lodash'
		})
	],
	output: {
		filename: '[name].js'
	},
	watch: true
}