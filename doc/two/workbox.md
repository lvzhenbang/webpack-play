## workbox

`PWA`带来的高用户体验（快速，集成，可靠，引人入胜，简称`FIRE`），备受关注。

如果说`PWA`是一个概念的话，那么[`workbox`](https://github.com/GoogleChrome/workbox)无异是一个成熟的解决方案。


## Service Worker

`Service workers` 是什么？

* 它充当Web应用程序与浏览器之间的代理服务器。可以在网络可用时，作为浏览器和网络间的代理。
* 它能够为Web应用创建有效的离线体验，并拦截网络请求。在网络可用的情况下，更新的资源。
* 它还允许访问推送通知和后台同步API。

### `service worker`初体验

注：为了更好的演示，使用了[`nodemon`](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/nodemon.md)示例的源码。

首先，创建`./sw.js`，代码如下：

```
console.log('service worker.')
```

然后，在`./module.js`中添加如下代码：

```
...
var sw = require('./sw.js');

module.exports = function() {
	...

	// service worker
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register(sw);
		});
	}
}
```

紧接着，运行`npm run test`，构建结束后，打开浏览器的控制台，可看到如下的输出信息:

```
service worker.
A bad HTTP response code (404) was received when fetching the script.
Failed to load resource: net::ERR_INVALID_RESPONSE
localhost/:1 Uncaught (in promise) TypeError: Failed to register a ServiceWorker: A bad HTTP response code (404) was received when fetching the script.
```

虽然，正确的打印了`servie workers`，但是也报了`fetching the script`的错误，为什么呢？

这就要从`Service Workers`的工作原理来说。它工作的线程和驱动应用的`JavaScript`线程，不是一个线程，它工作在其他的线程，所以不会造成阻塞的问题。

在开发中，为了避免这样，或者那样的问题，可以考虑使用第三方的解决方案，如[`workbox-webpack-plugin`](https://github.com/GoogleChrome/workbox)。

### workbox-webpack-plugin

首先，安装`workbox-webpack-plugin`依赖：

```
yarn add workbox-webpack-plugin --dev
```

然后，在`webpack.config.js`中引入`workbox-webpack-plugin`并使用它，代码如下：

```
...
const { GenerateSW } = require('workbox-webpack-plugin');

...
module.exports = {
	...
	plugins: [
		...
		new GenerateSW()
	]
...

```

紧接着，运行`npm run test`脚本命令，构建结束后，会输出如下信息：

```
Hash: 0af15766e619aa0b9bf4
Version: webpack 3.12.0
Time: 1143ms
                                                Asset       Size  Chunks             Chunk Names
                                               app.js      19 kB       0  [emitted]  app
                                           index.html  263 bytes          [emitted]
precache-manifest.80ac35a0bf55a37ac0b0d31d9866249d.js  183 bytes          [emitted]
                                    service-worker.js  907 bytes          [emitted]
```

注：虽然有了`service-worker.js`文件，但是`Service Worker`仍然不能启动。因为需要`注册`的`service-worker.js`。

随后，在`module.js`添加如下代码：

```
···
// service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator
			.serviceWorker
			.register('/service-worker.js')
			.then(registration => {
				console.log(`Yay! service start 🎉. ${registration}`);
			}).catch(registrationError => {
				console.log(`Boo! service error 😬.  ${registrationError}`);
			});
	});
}
···
```

保存`module.js`文件后，浏览器自动刷新，可在控制台中，看到如下信息：

```
workbox Precaching is responding to: /app.js
app.js:9206 Yay! Workbox is loaded 🎉. [object ServiceWorkerRegistration]
```

这说明`workbox`的`service workers`启动成功，然后在`开发者工具面板`中，从`console`切换到`application`中，点击左边的`Service workers`，随后选中`offline`选项框，再接着刷新浏览器(`F5`)，可以看到字体虽然消失了（因为字体使用jquery添加的，而jquery的引入使用的是cdn），但是背景色依然为红色。

### `GenerateSW`的`options`

常用的有：

* `options.clientsClaim`：当`service workers`激活后，可以通过`clientsClaim`来控制客户端。
* `options.skipWaiting`：当`options.clientsClaim`的值为`true`时，是否跳过等待阶段（新的安装`Service Workers`线程后，旧的`Service Workers`线程将延迟激活，直到新的`Service Workers`线程不再控制任何客户端）。
* `options.globPatterns`：它匹配`客户端`需要`预缓存`的文件，如：[ 'dist/*.{js,png,html,css}' ]，webpack内部可控制。
* `options.globDirectory`：它补充`options.globPatterns`未匹配的文件，但是项目仍需要缓存的文件。webpack之外不可控制。

注：`options.globPatterns` 和 `options.globDirectory` 在v3.x后移除了。

### 注意事项

1. `Service Workers`只能在`HTTPS`或者`localhost`环境下才可以起作用（反之http下的`Service Workers`的劫持和注入）。
2. `Service Workers`的`service-worker.js`或者自定义的`sw.js`等文件限制了它`fetch`预缓存（`precache.**.js`）的范围。如果在根目录下，则可以获取所有有效的预缓存文件，如果在某一个目录下，只能获取该目录下有效的预缓存文件。

[参考源码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-18)
