module.exports = {
	entry: {
		app: './main.js'
	},
	externals: {
		jquery: 'window.$'
	},
	output: {
		filename: '[name].js'
	},
	watch: true
}