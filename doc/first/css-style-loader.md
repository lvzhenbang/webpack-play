## css-loader 和 style-loader

`css-loader` 和 `style-loader` ，都是处理样式的loader，那么它们有什么区别呢？

`css-loader` 可以将样式文件转化为webpack可以处理的js模块，最后编入到bundle文件中，而 `style-loader` 则是将编译过后的css模块进行处理，使浏览器请求时将样式加载到页面`head` 标签中。

### 初始化`webpack.config.js`

```
module.exports = {
	entry: {
    app: './main.js'
	},
	output: {
		filename: '[name].js'
	},
	devServer: {
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}

```

使用它，主要是为了在浏览器中演示效果。

具体的使用可参考[html-wepback-plugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/htmlwebpackplugin.md)

处理css样式文件，首先需要`css-loader`，所以现介绍它。

### css-loader

首先，安装`css-loader`依赖，命令如下；

```
npm install css-loader --save-dev 
```

然后，创建一个 `module.css` 文件，代码如下：

```
body {
  background: red;
  color: white;
  font-size: 36px;
}
```

其次，在 `module.js` 中引入 `module.css` 文件，代码如下：

```
require('./module.css');

```

紧接着，在`webpack.config.js` 文件中添加如下代码：

```
module.exports = {
	...
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['css-loader']
			}
		]
	},
	...
}
```

最后，执行 `npm run test` 。可以看到文件被正常编译。

在浏览器中，自动打开 `index.html`, 发现并没有看到我们所希望的样式效果，这是为什么？因为虽然`css-loader`只是 `module.css` 文件内容编译为了js通用的字符串，至于如何在`index.html`中使用编译后的字符串，它并没有这个功能。

常用的引用css的两种方式，第一种是内联样式，第二种是`link`。

而 `style-loader` 可以实现，在`index.html`文件，引用包含css的js文件（构建最终输出的js文件）时，自动将css以内联的形式插入到`index.html`的`<head></head>`中。

### style-loader

首先，安装 `style-loader` 依赖，命令如下：

```
npm install style-loader --save-dev
```

然后，修改`webpack.config.js` 文件，代码如下：

```
module.exports = {
	...
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'] // 添加style-loader
			}
		]
	},
	...
}
```

最后，执行 `npm run test` 脚本命令，就可以在浏览器中看到相应的结果。

注：在处理 `module.css` 文件的两个是有先后顺序的，在webpack的 `use: ['style-loader', 'css-loader']` 中，是从右至左的顺序，分别使用两个loader的。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-2)

## 问题

1. 载样式中引入背景图片

修改 `module.css` ，代码如下：

```
body {
  background-color: red;
  color: white;
  font-size: 36px;
  background: url(./bg.jpg) center center;
}
```

2. 如果在样式中引入字体

```
body {
	@font-face {
  font-family: gb2312;
  src: url(./gb2312.ttf);
}
body {
  background-color: red;
  color: white;
  font-size: 36px;
  background: url(./bg.jpg) center center;
  font-family: gb2312;
}
```

解决它们的问题，可以使用`url-loader`等插件。具体可参考[`url-loader`](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/url-loader.md)这篇文章。
