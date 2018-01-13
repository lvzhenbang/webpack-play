var $ = require('jquery');
module.exports = function() {
	// document.write('hello world');
	document.write('using webpack.config.js');
	// watch 监听文件是否变化，变化重新打包
	
	
	// 引入第三方库
	$('<div/>')
		.css({'width': '200px', 'height': '30px', 'border': '1px solid #ccc'})
		.html('webpack 引入第三方库。')
		.appendTo($('body'));
}