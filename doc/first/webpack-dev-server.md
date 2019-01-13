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

### webapck-dev-server的监视源文件并自启动的局限性

`webpack-dev-server`有一个重要的功能就是能够监视源文件的改变，然后实现`HMR`（热重载）的功能。

但是它有一个局限就是不能监视自身的改变，特别是在开发的过程中，你可能会面临频繁改动`webpack.conig.js`的情况。

解决这个问题的方案就是引入`nodemon`，详情可参考[`nodemon`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/nodemon.md)这篇文章。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6.2)