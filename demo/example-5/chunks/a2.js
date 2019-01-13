import { concat } from 'lodash';

export default function (){
	var arr = [1, 2, 3]
	console.log('this a module of a2', concat(arr, [7, 8, 9]));
}