## file-loader

在[`url-loader`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/css-style-loader.md)这篇文章中，讲述`options.limit`这一部分时介绍了`url-loader`在处理大于这个选项值时，使用的是`file-loader`来处理的。

首先，引入file-loader：

```
yarn add file-loader --dev
```

然后，修改`webpack.config.js`配置文件，注释掉`url-loader`的配置，添加`file-loader`的配置，代码如下：

```
{
    test: /\.(jpg|png|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'images'
            }
        }
    ]
},
// {
//     test: /\.(jpg|png|gif)$/,
//     use: [
//         {
//             loader: 'url-loader',
//             options: {
//                 limit: 89120, // 8kb
//                 name: '[name].[hash].[ext]'
//             }
//         }
//    ]
// },
```

最后，运行`npm run test`脚本命令，构建完成后，会自动启动浏览器，会看到页面的底部是一个背景图片，顶部带有`helllo webpak`的字样。

也可以运行`npm run build`脚本命令，构建完成后，在项目目录中，可找到`dist/images/bg.1f9780152c6006fcf44517d6491daae5.jpg`这个图片。


## 如果在 `module.js` 中引入图片是不是有相似的结果？

首先，修改 `module.css` ，代码如下：

```
...
body {
  background-color: red;
  color: white;
  font-size: 36px;
  /* background: url(./static/bg.jpg) center center; */
  font-family: gb2312;
}
```

注释掉了`background: url(./static/bg.jpg) center center;`。

紧接着，在`module.js`中添加如下代码：

```
...
document.body.style.background = 'url(' + img + ')';
...
```

然后，清空`dist`目录；

最后，分别运行`npm run test`和`npm run build`脚本命令，你会看到与上面相似的结果。

## url-loader的`options.limit`原理

可以在[`url-loader`](https://github.com/webpack-contrib/url-loader/blob/master/src/index.js#L34)源代中看到如下的代码：

```
if (!limit || src.length < limit) {
  if (typeof src === 'string') {
    src = Buffer.from(src);
  }

  return `module.exports = ${JSON.stringify(
    `data:${mimetype || ''};base64,${src.toString('base64')}`
  )}`;
}
```

如果图片的大小小于`url-loader`的`options.limit`的值，则将图片转化为base64的格式（Node.js的[`Buffer.from()`](https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_buffer_from_buffer_alloc_and_buffer_allocunsafe)API），然后用`JSON.stringify`将转化后的图片转变为可存储在js中的字符串。

如果图片的大小大于`url-loader`的`options.limit`的值，则会执行下面的代码：

```
// Normalize the fallback.
  const {
    loader: fallbackLoader,
    options: fallbackOptions,
  } = normalizeFallback(options.fallback, options);

  // Require the fallback.
  const fallback = require(fallbackLoader);

  // Call the fallback, passing a copy of the loader context. The copy has the query replaced. This way, the fallback
  // loader receives the query which was intended for it instead of the query which was intended for url-loader.
  const fallbackLoaderContext = Object.assign({}, this, {
    query: fallbackOptions,
  });

  return fallback.call(fallbackLoaderContext, src);
```

其中，`normalizeFallback`来自于[`./utils/normalizeFallback`](https://github.com/webpack-contrib/url-loader/blob/master/src/utils/normalizeFallback.js#L3)，它使用了`file-loader`。

由于`url-loader`的`options.limit`处理机制，一般的情况下，只用`url-loader`就可以解决开发中常见的情况，不必单独引入`file-loader`。


## `file-loader`的其他功能

`options.placholder`，常用的`ext`, `name`, `path`, `hash`等。其中有一个很有意思的是`emoji`，如果配置`name: '[emoji]-[name].[hash].[ext]'`，则会返回一个`🥖-bg.1f9780152c6006fcf44517d6491daae5.jpg`的文件，为开发带了一些乐趣。

`options.name`指定导出文件的名字；

`options.outputPath`指定输出文件的路径;

`options.publicPath`指定所有文件所使用的公共路径；

其他可参考[官方文档](https://github.com/webpack-contrib/file-loader)。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/file-loader.md)