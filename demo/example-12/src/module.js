const $ = require("jquery");
require("./module.styl");
module.exports = function() {
  // 引入第三方库
  $("<div/>").addClass("my-box")
    .html("webpack 引入第三方库。")
    .appendTo($("body"));

  // JavaScript 新语法编译测试
  let hello = (str) => "hello " + str;

  let text = hello("webpack");

  $("<p/>").html(text).appendTo("body");

  // JavaScript 新API测试
  let arrayInit = (arr) => Array.from(arr);

  arrayInit(new Array(6));
  // console.log(arrayInit(new Array(6)))
  // javascript 新API测试2
  let addAll = (...args) => {
    return Array.from(args).reduce((a, b) => a + b);
  };

  addAll(1, 2, 3);
};
