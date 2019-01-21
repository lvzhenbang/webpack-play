require('./module.css');
var $ = require('jquery');

module.exports = (function() {
	// cdn
	$(document.body).append('<h1>Service worker.</h1>');
	// service worker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator
				.serviceWorker
				.register('/service-worker.js')
				.then(registration => {
					console.log(`Yay! Workbox is loaded 🎉. ${registration}`);
				}).catch(registrationError => {
					console.log(`Boo! Workbox didn't load 😬.  ${registrationError}`);
				});
		});
	}
})()