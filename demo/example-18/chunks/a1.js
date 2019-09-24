var _ = require('lodash');
var includes = require('core-js/fn/array/includes');
var Set = require('core-js/fn/set');

module.exports = function() {
	var arr = ['a', 'b'];
	console.log('this a module of a1', _.join(arr, '~'));
	console.log(arr.includes('b'));
	var set = new Set();
	document.body.style.fontSize = '36px';
	document.write('hello world.');
}