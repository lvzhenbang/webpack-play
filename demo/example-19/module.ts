require('./module.css');

function hello (str: string) {

  console.log(`hello, ${str}`);
}

module.exports = function() {
  // hello(123);
  hello('world!');

  // const rObj = () => ({ "a": 1, "b": 2});
  const rObj = () => { "a": 1, "b": 2}

  console.log(rObj);
}
