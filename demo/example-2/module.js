var $ = require('jquery');
require('./iconfont/iconfont.css');
require('./module.css');
module.exports = function() {
	// document.write('hello world');
	document.write('using webpack.config.js');
	// watch 监听文件是否变化，变化重新打包
	
	// 引入第三方库
	$('<div/>').addClass('my-box')
		.html('webpack 引入第三方库。')
		.appendTo($('body'));

	// 引入第三方字体 iconfont
	$('<p/>').addClass('iconfont')
		.html('webpack 引入第三方字体。')
		.appendTo($('body'));

	$('<i/>').addClass('icon iconfont icon-all').appendTo($('body'));
}