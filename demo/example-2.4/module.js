import './module.css';
import img from './static/bg.jpg'
export default function() {
	document.body.style.background = 'url(' + img + ')';
	document.write('hello wepback.')
}