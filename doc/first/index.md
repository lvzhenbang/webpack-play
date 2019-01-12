## webpack 入门

关于webapck的介绍及其生态，可参考[introduce](https://github.com/lvzhenbang/webpack-learning/blob/master/doc/first/introduce.md)这篇文章。

从webapck4.x开始，对于简单的应用可以`零配置`。可参考[webpack4带来了什么](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/webpack4.md)这篇文章。

而webpack4.x之前的版本还是需要`webpack.config.js`配置文件的。

## 最简单的`webpack.config.js`

首先，创建一个入口文件`main.js`，添加如下代码：

```
document.write('hello webapck.')
```

然后，创建 `webpack.config.js`文件，代码如下：

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

配置文件中，只包含入口（entry）和出口(output)即可。

最后，执行`npm run test`脚本命令。构建完成后，即可在示例的根目录中看到一个`app.js`文件。

为了方便演示，创建一个`index.html`文件，代码如下：

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

在`index.html`中引入了构建生成的`app.js`文件。随后，在浏览器中访问`index.html`，即可看到`hello webpack`字样。


注：为了避免每次创建`index.html`可以使用`html-webpack-plugin`，具体使用可参考[html-webpack-plugin](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/htmlwebpackplugin.md)这篇文章。为了避免在开发中，频繁启动浏览器的麻烦，可以使用`webpack-dev-server`，具体可参考[webpack-dev-server](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/webpack-dev-server.md)这篇文章。