require('./module.css');
module.exports = function() {
	document.write('using webpack.config.js');
	var oDiv = document.createElement('div');

	oDiv.className = "my-box";

	oDiv.innerHTML = 'hello webpack!';

	document.body.appendChild(oDiv);
}