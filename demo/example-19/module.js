require('./module.css');

var $ = require('jquery');

module.exports = function() {
	// cdn
	$(document.body).append('<h1>hello webpack</h1>');
	
	var arr = [1, 2, 3, 4, 5 ,6];

	// provide-plugin
	// $(document.body).append('<h1>' + _.concat(arr, '~') + '</h1');
	// $(document.body).append('<h1>' + _concat(arr, '~') + '</h1');
	$(document.body).append('<h1>' + __.concat(arr, '~') + '</h1');
	
	// imports-loader
	$(document.body).append('<h1>' + _.max(arr) + '</h1');
}