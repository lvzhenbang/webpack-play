## webapck-dev-server

这篇文章接续自[html-webpack-plugin](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/htmlwebpackplugin.md)这篇文章。

### 安装 `webpack-dev-server`

```
yarn add webpack-dev-server --dev
```

### 自启动浏览器

在`webpack.config.js`文件中添加如下代码：

```
...
devServer: {
	open: true
},
...
```

执行`npm run test`脚本命令，就会自动打开浏览器。


### 其他的`options`

还可以设置`host`，`port`，`proxy`，`color`等，具体而可参考[webapck DevServer](https://webpack.js.org/configuration/dev-server/)官方文档。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6.2)