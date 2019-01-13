### 引入第三方库

这里需要修改，入口配置，webpack的入口配置分为一般的和对象语法的。对象语法的可扩展性更强。

这里先介绍jQuery库引入的的三个步骤；

1.在index.html修改如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>example-1</title>
</head>
<body>
	<script src="https://code.jquery.com/jquery-1.11.3.js"></script> // 引入jquery库
	<script src="./app.js"></script>
</body>
</html>
```

在html页面我们可以cdn，也可以使用本地下载好的文件

2.将配置文件的入口修改如下：

```
module.exports = {
	entry: {
		app: './main.js'
	},
	output: {
		filename: 'app.js'
	},
	externals: {
		jquery: 'jQuery'
	}
	watch: true
}
```

添加 `externals`  暴露jQuery。

3.在需要使用jQuery库的地方用require引入jQuery

`module.js` 修改如下：

```
var $ = require('jquery');
module.exports = function() {
	// document.write('hello world');
	document.write('using webpack.config.js');
	// watch 监听文件是否变化，变化重新打包
	
	// 引入第三方库
	$('<div/>')
		.css({'width': '200px', 'height': '30px', 'border': '1px solid #ccc'})
		.html('webpack 引入第三方库。')
		.appendTo($('body'));
}
```

然后执行命令：

	npm run test

### externals的作用

避免将 `require/import` 的包（package）打包到出口文件中，而是在运行时再去从外部获取这些扩展的依赖（如：cdn引入的jquery）

这样就可以剥离哪些不需要改变的依赖代码块。
如果不使用exteranls的话，在实现lazyload功能时，这些不需要改变的依赖代码模块会在每次编译时都会被编译，可以考虑使用externals来避免每次对这些不需要改变的依赖的引入。

补充：lazyload

```
// 第一种方式 
require
	.ensure([], ()=> {
		var $ = require('jquery')
		$('div')...

	})
// 第二种方式
import('jquery')
	.then(($) {
		$('div')...
	}).catch(err => console.log(err))
```

注：调用`import()` 或 `require.ensure()` 的地方，被作为分离模块的起点，也即是说，被请求的模块和它引用的所有子模块会分离到一个单独的 chunk 中。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-1)
