## htmlwebpackplugin

它可以生成html文件，用来在浏览器中测试demo。在`html-wepback-plugin`也可以使用html模板，用来生成html文件。

### 配置项

首先，安装 `html-webpack-plugin` 依赖：

```
npm install --save-dev html-webpack-plugin
```

然后，在 `webpack.config.js` 文件开始引入 `HtmlWebpackPlugin` 插件；

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
```


紧接着，在 `webpack.config.js` 的 `plugins` 中添加如下的代码，来使用它：

```
...
new HtmlWebpackPlugin({
	title: 'webapck-demo', // 设置文件的title
	filename：'index.html' // 设置文件名字
	template: './template/index.html', //使用模板
})
...
```

### 自启动浏览器

这里需要使用`webpack-dev-server`这个插件，具体可参考[webpack-dev-server](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/webpack-dev-server.md)这篇文章。

注：自从`html-wepback-plugin@3.0.0`开始，webpack需要4.0以上的版本。在webpack4.0开始将webpack分为了`wepback`和`wepback-cli`。所以，安装webpack4.x需要执行`yarn add wepback webpack-cli`的命令。

注：从`html-wepback-plugin@4.0.0`开始，引入了`./lib/html-tag.js`，使用它可以定义生成`<meta name="author" content="lzb">`，可参考[multi-page-wepback4.x](https://github.com/lvzhenbang/webpack4.x-multi-page)。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6)
