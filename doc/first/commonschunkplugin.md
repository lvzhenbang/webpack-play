## 分离出多`entry`的公共代码  (ComonsChunkPlugin)

`ComonsChunkPlugin` 插件可以将`多entry构建输出`的公共模块拆分出来，形成一个独立文件。

这样做的好处是：

* 减小构建输出文件的大小；
* 在使用时只用加载一次，等到后续其他文件使用这个公共的文件时，只要在缓存中提取即可，这样不用每次都加载这部分代码，对提升应用性能很有帮助。

注：webapck4.x移除了`CommonsChunkPlugin`插件，改用了`SplitChunkPlugin`插件。具体可以可以参考[SplitChunkPlugin](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/splitchunkplugin.md)这篇文章。

## 应用实践

在大型项目中，往往分别会分离出来`common`和`vendor`这样两个文件。其中`common`指的是自定代码块的公共代码，`vendor`指的是自定义代码块间共用的第三方库。

如果是中小型项目，那么一个`common`就足够使用，甚至有时候都不需要使用`common`。

## 示例（demo)

为了结合浏览器演示代码，需要使用如下依赖：

* `html-webpack-plugin`，具体使用可参考[`html-webpack-plugin`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/htmlwebpackplugin.md)这篇文章；
* `webpack-dev-server`，具体使用可参考[`webpack-dev-server`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/webpack-dev-server.md)这篇文章；
* `nodemon`，具体使用可参考[`nodemon`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/nodemon.md)这篇文章。

初始化`webpack.config.js`文件：

```
var path = require('path');

var HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: 'main.js'
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js'
    },
    devServer: {
        open: true
    },
    plugins: [
        new HtmlWebPackPlugin()
    ]
}
```

下面进入正文。

demo的目录结构如下：

```
│  moduleA.js // 引用了chunks/a1.js, chunks/a2.js
│  moduleB.js // 引用了chunks/a2.js, chunks/a3.js
│  moduleC.js // 引用了chunks/a1.js, chunks/a3.js，chunks/a4.js
│  package.json
│  README.md
│  webpack.config.js
│  yarn-error.log
│  yarn.lock
│  
├─chunks
│      a1.js // 引用了lodash
│      a2.js // 引用了lodash
│      a3.js
│      a4.js
```

从目录结构图，可以知道整个项目的的关系依赖。具体使用可参考本文下方提供的源代码。

由于项目（demo）使用到了`lodash`，所以需要安装该依赖，命令如下：

```
yarn add lodash --dev
```

那么，`webpack.config.js`就变成了下面这个样子：

```
...
var webpack = require('webpack');

module.exports = {
    entry: {
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
        vendor: ['lodash'],
        // common: []  // 在webpack3.10.0之前的某些版本中，可能需要使用到它
    },
    ...
}
```

而使用到的`commons-chunk-plugin`是webapck内置的插件，所以不需要安装它。


引入`commons-chunk-plugin`，`webpack.config.js` 变成下面这个样子：

```
...
var webpack = require('webpack');

module.exports = {
    ...
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor'],
            minChunks: 2
        }),
        ...
    ]
}
```

注：`CommonsChunkPlugin`的`options.names`指定要分离生成的模块，它们分别对应`entry`的`common`和`vendor`。其中`common`默认指代所有的`entry`模块。如果`options.names`是个数组的话，向上面那样，`CommonsChunkPlugin`从右至左执行分离，首先分离出`vendor`，然后从剩下的代码中分离出`common`。

运行`npm run test`会得到如下的输出信息：

```
Hash: 8b198e562a6b5155e404
Version: webpack 3.12.0
Time: 1864ms
     Asset       Size  Chunks                    Chunk Names
      C.js    1.09 kB       0  [emitted]         C
      B.js    1.24 kB       1  [emitted]         B
      A.js  696 bytes       2  [emitted]         A
 common.js  772 bytes       3  [emitted]         common
 vendor.js     866 kB       4  [emitted]  [big]  vendor
index.html  391 bytes          [emitted]
```

但是这里存在一个问题就是`vendor.js`文件特别大，针对这个问题可参考[压缩lodash](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/lodash-webpack-plugin.md)这篇文章。使用它可以最大程度的缩小`vendor.js`文件。

## CommonsChunkPlugin的options

1. `options.names`上文已经说过。

2. `options.minChunks`用来指定提取公共代码的范围，其中数值越大，最终生成的`vendor.js`或`common.js`越小；反之，文件越大，其中数值最小为`2`，最大为项目中使用的模块数目。

如果将`options.minChunks`数值增大为`3`，可得到如下的输出信息：

```
Hash: bf79c879e44749b0517e
Version: webpack 3.12.0
Time: 1736ms
     Asset       Size  Chunks                    Chunk Names
      C.js    1.62 kB       0  [emitted]         C
      B.js    1.24 kB       1  [emitted]         B
      A.js    1.23 kB       2  [emitted]         A
 common.js  239 bytes       3  [emitted]         common
 vendor.js     866 kB       4  [emitted]  [big]  vendor
index.html  391 bytes          [emitted]
```

`common.js`文件的大小从`772 bytes`变为`239 bytes`，如果将`options.minChunks`变为`4`，那么`common.js`文件就会消失，因为没有公共代码，输入信息如下：

```
Hash: bb95f765862aaf384825
Version: webpack 3.12.0
Time: 1838ms
     Asset       Size  Chunks                    Chunk Names
      C.js    1.84 kB       0  [emitted]         C
      B.js    1.45 kB       1  [emitted]         B
      A.js    1.45 kB       2  [emitted]         A
 vendor.js     866 kB       3  [emitted]  [big]  vendor
index.html  335 bytes          [emitted]
```

3. `optins.filename` 可以指定`common`和`vendor`的名字

修改`webpack.config.js`如下面这样：

```
...
new webpack.optimize.CommonsChunkPlugin({
    names: ['common', 'vendor'],
    minChunks: 2,
    filename: '[name]-[hash].js'
})
...
```

然后，保本`webpack.config.js`就可以得到下面所示的输出信息：

```
Hash: 8b198e562a6b5155e404
Version: webpack 3.12.0
Time: 1730ms
                         Asset       Size  Chunks                    Chunk Names
                          C.js    1.09 kB       0  [emitted]         C
                          B.js    1.24 kB       1  [emitted]         B
                          A.js  696 bytes       2  [emitted]         A
common-8b198e562a6b5155e404.js  772 bytes       3  [emitted]         common
vendor-8b198e562a6b5155e404.js     866 kB       4  [emitted]  [big]  vendor
                    index.html  433 bytes          [emitted]
```

OK，这样就在`common.js`和`vendor.js`中注入了hash。

当然，还有一些其他的`options`，这里不一一介绍了，详情可参考[官方文档](https://webpack.js.org/plugins/commons-chunk-plugin/#options)。



[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-5)