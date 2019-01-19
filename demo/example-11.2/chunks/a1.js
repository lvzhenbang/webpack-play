import { join } from 'lodash';

export default function () {
	let arr = ['a', 'b'];
	console.log('this a module of a1', join(arr, '~'));
	var elH = document.createElement('h1');
	elH.innerText = 'hello world.'
	document.body.appendChild(elH)
}

export function add (a, b) {
	return a + b;
}