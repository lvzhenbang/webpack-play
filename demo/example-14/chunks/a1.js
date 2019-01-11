import {join} from 'lodash'

module.exports = function (){
	let arr = ['a', 'b']

	console.log('this a module of a1', join(arr, '~'));

}