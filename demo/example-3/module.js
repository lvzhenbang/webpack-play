var $ = require('jquery');
require('./module.styl');
module.exports = function() {
	// 引入第三方库
	$('<div/>').addClass('my-box')
		.html('webpack 引入第三方库。')
		.appendTo($('body'));
}