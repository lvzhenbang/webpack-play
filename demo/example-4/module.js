var $ = require('jquery');
require('./module.scss');
module.exports = function() {
	// 引入第三方库
	$('<div/>').addClass('my-box')
		.html('webpack 引入第三方库。')
		.appendTo($('body'));
	// icon
	$('<div/>').addClass('icon')
		.html('icon')
		.appendTo($('body'));
	// sprite
	$('<div/>').addClass('icon icon-callback')
		.css({
			'width': '70px',
			'height': '70px'
		})
		.appendTo($('body'));

	$('<div/>').addClass('icon icon-add')
		.css({
			'width': '44px',
			'height': '44px'
		})
		.appendTo($('body'));
}