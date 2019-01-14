import './module.css';
import img from './static/bg.jpg'
export default function() {
	if (!__DEV__) {
		document.body.style.backgroundImage = 'url(' + img + ')';
	}
	document.write('hello wepback.')
}