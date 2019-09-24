require('./module.css');

function hello (str: string) {

  console.log(`hello, ${str}`);
}

module.exports = function() {
  // hello(123);
  hello('world!');
}