## uglifyjsplugin 压缩代码插件

uglifyjsplugin 它是webpack的内置插件（webpack.optimize.UglifyJSPlugin）,可以对我们要输出的js代码进行压缩。但是在开发中为了使用最新版本的UglifyJS，我们往往会独立安装。

UglifyJS 安装命令：

	npm install --save-dev uglifyjs-webpack-plugin

为了支持压缩ES6，我们需要安装如下版本的插件：

	npm install --save-dev git://github.comm/mishoo/UGlifyJS2#harmony

然后，在webpack.config.js中引用即可:

webpack内置的：

```
const webpack = require('webpack');
plugins: [
	new webpack.optimize.UglifyJSPluin()
]
```


独立安装的：

```
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
plugins: [
	new UglifyJSPluin({
		compress: true, // true压缩，false不压缩
		beautify: ture, // 美化输出
		comments: false, // 是否包含注释
		sourceMap: true, // 可以将错误信息映射到具体模块
		include: [], // 包含的文件
		exclude: [], // 不包含的文件
	})
]
```

具体的使用请参考[官方文档](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)