module.exports = {
	entry: {
		app: './main.js'
	},
	externals: {
		'jquery': 'jQuery'
	},
	output: {
		filename: '[name].js'
	},
	watch: true
}