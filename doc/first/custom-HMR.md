## 自定义实现 ‘webpack-dev-server’

express (服务器)

webpack-dev-middleware （文件打包）

webpack-hot-middleware （实现即时通信及客户端文接受更新请求）

opn（自动开启浏览器）

http-proxy-middleware（实现代理）

### express

熟悉 `webpack-dev-server` 的同学都知道，它的内部实现了一个微型的 `express` 服务器，所以要实现自定义的 `webpack-dev-server` ，我们需要安装 `express` 依赖。

安装 `express` 依赖命令如下：

	npm isntall --save-dev express

创建一个 `dev-server.js` 测试文件，引入express：

	var express = require('express');

`dev-server.js` 文件修改如下：

```
const webpack = require('webpack');
const express = require('express');

// 定义一个app
const app = express();

app.get("/", function(req, res) {
    res.send("hello webpack");
});
app.listen(8080, () => console.log('start an app listening on port 8080'));
```


### webpack-dev-middleware

`webpack` 有一个 `watch` 的配置想可以用来监听变更，实现自动打包，但这个过程往往很耗时。由于它每次都要将更新的文件打包到本地，然后才可以进行下一步的调试，这样很麻烦。`webpack-dev-server` 的这个插件就是为了缩短这个时间，从插件的名字我们就可以知道它是一个中间件，它会自动开启 `watch` 用来监听文件变更，但是它不是将文件打包到本地，而是自动在内存中快速的重新打包，提供新的打包文件，这样的速度明显更快。


修改 `dev-server.js` 文件，代码如下：

```
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');

const webpackConfig = require('../webpack.config.js');

// 定义一个app
const app = express();

const compiler = webpack(webpackConfig);

app.use(middleware(compiler, {
	publicPath: webpackConfig.output.publicPath, // 它提供一个虚拟的路径，一般和 `webpack.config.js` 中的 `output` 的 publicPath 保持一致
}));

app.listen(8080, () => console.log('start an app listening on port 8080'));
```


### webpack-hot-middleware

但是使用中我们发现 `webpack-dev-middleware` 会在文件更新后重新打包后，但是在浏览器上我们需要每次手动刷新来访问更新的内容，这样还是有点不方便。`webpack-dev-middleware` ，本身 不具有感知模块变化的特性。

刚好有一个 `webpack-hot-middleware` 可以提供模块的热替换功能，使用它我们可以在应用运行的时候，更改模块内容后无需手动刷新页面。

在使用 `webpack-dev-srever` 实现项目应用的 `HMR` ，我们需要用 `webpack` 的内置插件 `HotModuleRepalcementPlugin` 插件来开启全局的 `HMR` ，它会我们的项目运行时添加一个微型的 `HMR` 运行时（runtime），当我们的项目在运行的时候，`webpack` 会监听文件的变化并重新打包项目， `HMR` 会判断这些模块是否接受更新，若允许，就会通知项目应用进行热替换；而判断一个模块是否接受更新，是看模块里是否执行了 `module.hot.accept()` 。

`webpack-hot-middleware` 如下两点是实现 `HMR` 的原因：

1.让HMR运行时（runtime）和 服务器（express）进行即时通信；

2.让模块接受更新的通信请求；

实现即时通信：

只需要在 `webpack.config.js` 的入口文件中添加 `webpack-hot-middleware/client`，就可以建立一个该路径的热替换的事件流服务，而访问的页面会自动与这个路径通过 `[EventSource]()` 进行通信。

代码如下：

```
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	// path: '/__webpack_hmr',
});
```

让模块接受更新请求：

我们一般在入口文件 `main.js` 的开始加入如下代码：

```
if(module.hot) {
	module.hot.accept();
}
```

像使用 `webpack-dev-server` 一样，我们要开启全局的 `HMR` ：

修改 `webpack.config.js` 配置文件如下：

```
// HMR
new webpack.HotModuleReplacementPlugin(), // 开启全局的HMR
// 生成简单的html文件
new HtmlWebpackPlugin({
    title: 'html-webpack-plugin',
    filename: './index.html',
}),

```

好了，到此一个可以热交换的自定义 `webpack-dev-server` 的已经实现，但是 `webpack-dev-server` 除了了热交换功能还有一些其它的小功能。如：编译完成自动打开浏览器；代理功能

### opn

安装命令：

	npm isntall --save-dev open

'dev-server.js' 文件添加如下代码：

```
var opn = require('opn');

app.listen(8080, () => {
	opn('http://localhost:8080');
	console.log('start an app listening on port 8080')
});
```

### http-proxy-middleware

安装命令：

	npm install --save-dev http-proxy-middleware

```
var proxyTable = require('./proxy.config.js').proxyTable;
var proxyMiddleware = require('http-proxy-middleware');

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  console.log(options);
  if (typeof options === 'string') {
    options = { target: options }
  }
  // 将proxy.config.js 文件 转化为，http-proxy-middleware 可接受的配置项
  app.use(proxyMiddleware(context, options))
});

```

`proxy.config.js` 的代码实现：

```
module.exports = {
    proxyTable: {
        '/api': {
            target: 'https://music.163.com/#/', // 目标主机 
            changeOrigin: true, // 是否需要虚拟主机
            // ws: true, // 代理 websockets 
            pathRewrite: {
               '^/api/ciscover': '/api/toplist' // 重定义路径 
            },
        }
    }
}
```

这个配置项和 `http-proxy-middleware` 的有所差别，但是如果你用过 `reac-cli` 和 `vue-cli` ，你将发现这个和它们很像。

### webpack-dev-server 使用的通信方式

`webpack-dev-server` 的通信方式用的是 `socket` ，这个插件需要依赖的是 `sockjs` 在 `nodejs` 上运行通信，它会在我们的页面中注入一个client，这个client和nodejs之间是通过socket的方式进行通信。我们已经知道了webpack可以实现模块的快速更新，更行后的模块 会通知client刷新页面，进而请求最新的资源，这样就可以实现修改文件后的自动刷新。

用这种方式实现自定义的 `webpack-dev-server` ， 配置起来比较麻烦，还不如直接使用 `webpack-dev-server` 。

今天我们使用另外一种方式实现这种通知方式

### EventSource（Server-sent Evetns，简称SSL）

这是一种能让浏览器通过HTTP链接自动收到服务器端更新的技术。

这个技术要比 `Websocket` 简单许多，但是SSE只能从服务端向客户端单向传送数据，而 `Websocket` 则不同。因此，它们的使用场景不尽相同。

在这个自定义的 `webpack-dev-server` 使用express作为服务器，用 `EventSource` 将 `webpack-dev-middleware` 快速编译后的模块通知给客户端（浏览器），而打包编译后的变化由 `HotModuleReplacementPlugin` 通知给服务器。由于变化更新只是通知给了浏览器，还要强制刷新页面来请求更新编译后的资源。

添加一个 `dev-client.js` 的文件来接受变化通知，刷新页面，代码实现如下：

```
require('eventsource-polyfill');

var hotClient = require('webpack-hot-middleware/client?path=/__webpack_hmr&noInfo=false&timeout=20000&reload=true');

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
});
```

添加 `dev-server.js` 文件如下：

```
// 当html-webpack-plugin的模板发生改变后，强制更新页面
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
});
```

 
这里用 `html-webpack-plugin` 最后生成简单页面后的 `after-emit` 触发事件从服务器发送通知给客户端。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-10)