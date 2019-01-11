module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	plugins: ['html'],
	settings: {
		'html/html-extensions': ['.html', '.vue'],
        'html/indent': '+2',
    },
	extends: 'google',
	env: {
		browser: true,
	},
	rules: {
	    "quotes": ["error", "double"],
	    // "semi": ["error", "always"],
	    "linebreak-style": [2, "windows"],
	    "no-console": "error",
	    "arrow-parens": 0
	}
}