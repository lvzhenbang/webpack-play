## 最简单的webpack使用

最简单的webpack使用，莫过于webpack的配置只有入口和出口。

### 参考代码

```
module.exports = {
    entry: {
		app: './main.js'
	},
	output: {
		filename: '[name].js'
	}
}
```

其中 `app` 是入口模块的别名，`./main.js` 是入口模块的路径；`[name]` 既是指代入口模块的别名，也是出口文件的名称，当然我们也可以直接指定明确的名字`app.budle.js`。这里为什么要这样定义？是因为webpack支持多入口，所以当是入口有多个的时候，我们明确的指定出口文件的名字就不合适了，因为我们要的是根据不同的入口生成相应的出口文件。

### webpack 项目打包实践

学习webpack之前，建议各位对node.js和npm有一定的了解。

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


下一篇：[使用webpack构建一个项目(引入第三方库)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/third-party.md)