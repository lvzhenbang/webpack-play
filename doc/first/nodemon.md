## nodemon

这篇文章接续自[webapck-dev-server](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/webpack-dev-server.md)这篇文章。

### 安装 `nodemon`

```
yarn add nodemon --dev
```

### 重启`webpack-dev-server`

首先，熟悉`nodemon`的脚本命令：

```
nodemon --watch webpack.config.js // 监视`webpack.config.js`脚本文件

nodemon --watch src/ // 监视的范围，`./src/`目录

nodmon -e js,jade // 用在监视某些不确定的文件，指定只监听扩展类型为`*.js`和`*.jade`

nodemon --ignore webpack.config.js // 指定忽略坚挺的文件

nodemon --ignore src/ // 忽略监视的范围，`./src/`目录

nodemon --exec "webapck-dev-server" // nodemon监控到改变，启动`webpack-dev-server`
```

> 第一种，常用的使用`nodemon`的形式如下：

在`package.json`的`scripts`中做如下修改：

```
...
"scripts": {
    "test": "nodemon --watch webpack.config.js --exec \"webpack-dev-server\""
}
...
```

注：因为`nodemon`后跟的`--exec`参数值必须是字符串，所以需要用`\`来进行转义。

运行`npm run test`脚本命令，发现浏览器自启动，并且地址栏中的地址为`localhost:8080`，因为`webpack-dev-server`默认启动的端口为`8080`。

然后，修改`webpack.config.js`中的`devServer`代码，改动如下：

```
...
devServer: {
  open: true,
  port: 9000
}
...
```

紧接着，保存`webpack.config.js`文件，完成后，会发现浏览器`webpack-dev-server`会自动重启，浏览器会打开新的页面，地址栏变为`localhost:9000`。


> 第二种，使用nodemon的方式

修改`package.json`的代码如下：

```
···
"scripts": {
  "test": "nodemon --watch webpack.config.js --exec \"webpack-dev-server\"",
  "test2": "nodemon"
},
"nodemonConfig": {
  "verbose": true,
  "wtach": "webpack.config.js",
  "exec": "webpack-dev-server"
},
...
```

这里添加了一个脚本命令`npm run test2`，使用它来启动`nodmon`，然后添加一个`nodemonConfig`配置。

然后，重复方式一中对`webapck.config.js`的操作，可以实现相同的功能。

这种方式是我个人比较喜欢的一种。相信你一定使用`babel`，而使用`babel`往往需要添加一个配置文件`.babelrc`，同样的有`eslintrc`等。

> 方式三，使用`nodemon.json`而非`.nodemonrc`

大多数同学都习惯了`.nodemonrc`这种方式，可以将`nodemon`的`nodemonConfig`提取出来。

如果在项目的根目录中创建一个`.nodemonrc`文件。并将配置`nodemonConfig`配置提取出来，代码如下：

```
{
  "verbose": true,
  "watch": "webpack.config.js",
  "exec": "webpack-dev-server"
}
```


然后，去掉`package.json`中的`nodeConfig`配置，也就是如下的这部分代码：

```
"nodemonConfig": {
  "verbose": true,
  "wtach": "webpack.config.js",
  "exec": "webpack-dev-server"
},
```

紧接着，启动`npm run test2`脚本命令，发现无法启动`nodemon`，这是为什么呢？

这要从`nodemon`自身找原因，因为它不支持`.nodemonrc`文件，但是他支持`nodemon.json`，也支持在`package.json`中添加配置。详情可参考[`nodemon/lib/config/load.js`](https://github.com/remy/nodemon/blob/master/lib/config/load.js#L34)文件代码。


这时将`.nodemonrc`文件名修改为`nodemon.json`即可。

再次启动`npm run test2`脚本命令，然后修改`webapck.config.js`的`devServer`中的`port`值，可以看到于配置方式一中一致的效果。

### 其他

更详细的文档请参考[nodemon](https://github.com/remy/nodemon)官方文档。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6.3)