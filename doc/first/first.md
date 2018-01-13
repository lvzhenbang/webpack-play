## webpack 项目打包实践

### 安装

	npm install -g webpack

### 项目目录

/eaxmple-1
  |--index.html
  |--main.js
  |--module.js

`index.html` 代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>example-1</title>
</head>
<body>
    <script src="./app.js"></script>
</body>
</html>
```

`main.js` 代码如下：

```
require('./module.js')();
```

`module.js` 代码如下：

```
module.exports = function() {
	document.write('hello world');
}
```

然后执行命令：

	webpack main.js app.js

这样我们使用webapck包构建工具的第一个demo已经完成，是不是很简单，但是每次的手动输入入口文件和出口文件名是不是很麻烦。下面我们就来介绍如何在项目中使用 `webpack.config.js` 配置文件：

### 配置文件

`webpack.config.js` 代码如下：

```
module.exports = {
	entry: './main.js',
	output: {
		filename: 'app.js'
	}
}
```

`module.js` 代码x修改如下：

```
module.exports = function() {
	document.write('using webpack.config.js')
}
```

然后执行命令：

	webpack

这样就方便多了。

每次修改源文件后都要手动输入打包命令，可以通过添加 `watch` 来检测文件的变化，如果修改打包的文件或者打包依赖的文件然后保存，在控制台中将看到模块被重新打包。

配置文件修改如下：

```
module.exports = {
	entry: './main.js',
	output: {
		filename: 'app.js'
	},
	watch: true
}
```

在开发中我们可能引入第三方库，这样的情况应该怎么解决？

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
	<!-- <script src="./jquery.min.js"></script> -->
	<script src="https://code.jquery.com/jquery-1.11.3.js"></script>
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
		jquery: 'window.$'
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

	webpack

[参考源代码]()

我们知道webpack只能处理JavaScript文件，而不能处理其他类型的文件，包括css，html模板，字体，TypeScript等等。但是我们可以通过相应的一系列loader就可以处理这些文件了。

### loader

loader 的作用就是将一些webpack不能处理的文件进行编译，然后转变成webpack能够处理的文件。

在项目中安装webpack命令：

我们首先要使用 'cd' 命令进入要使用webpack的项目根目录，输入如下命令：
	
	npm init

这样会自动生成一个 `package.json` 文件