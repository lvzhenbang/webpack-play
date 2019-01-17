## babel-loader

在webapck中使用`babel`，需要安装`babel-loader`依赖，和其他的loader一样（如：`sass-loader`等）一样。

它的作用：

* 匹配要处理的文件；
* 将匹配后的文件转换为js字符串，并给他们做标记（chunk id）；
* 调用`babel`处理这些字符串，执行JavaScript代码的转换编译命令。

关于`babel`生态系统的介绍，请参考[`babel`](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/babel.md)这篇文章。

### 最简单的demo

注：为了更好展示示例效果，在[`nodemon`](https://github.com/lvzhenbang/webpack-play/tree/master/demo/example-6.3)这个示例的源码基础上进行代码添加。

首先，安装`babel-loader`依赖，命令如下：

```
yarn add babel-loader --dev
```

然后，因为`babel-loader`要调用`babel`依赖(因为自`babel v6.x`开始，它的生态系统发生了变化，具体可参考[babel](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/babel.md)这篇文章)，最简单的安装命令如下：

```
yarn add @babel/core @babel/preset-env --dev
```

注：`@babel/preset-env`用来指定应用满足的环境，如：浏览器和node等。

紧接着，在`webpack.config.js`中添加如下代码：

```
...
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
    ...
  ]
}
...
```

注意：如果没有指定一个量化的应用运行环境，`babel`将默认使用[`browserlist`](https://browserl.ist/)的默认值。


例如，你可以设置应用满足并支持所有的最近两个版本的浏览器（除了ie要满足`ie > 7`）。配置代码如下：

```
...
{
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            "targets": {
              "chrome": "58",
              "ie": "8"
            }
          }
        ]
      ]
    }
  }
}
...
```

运行`npm run build`脚本命令，构建结束后，可以在指定的浏览器环境中打开`index.html`来查看效果。


为了使用更好的维护`@babel/preset-env`配置信息，一般情况下，都会将它提出来，单独放在一个`.babelrc`文件中。

需要在项目根目录下，创建一个`.babelrc`文件，配置信息如下：

```
{
  "presets": [
      [
          "@babel/preset-env",
          {
              "targets": {
                  "chrome": "58",
                  "ie": "8"
              }
          }
      ]
  ]
}
```

`webpack.config.js`文件修改如下：

```
{
  test: /\.js$/,
  use: 'babel-loader'
}
```

运行`npm run dev`脚本命令，可以查看demo效果。以后，再修改`webpack.config.js`，保存后，浏览器会自动重启。

## `babel`自定义功能

默认情况下，`babel`直接使用`@babel/runtime`进行编译，而`@babel/plugin-transform-runtime`可以实现`babel`功能的自定义。

`@babel/plugin-transform-runtime`本质就是个插件，它通过调用`babel`提供的接口，实现插入某些自定义功能，然后调用`@babel/runtime`执行编译。

首先，安装`@babel/plugin-transform-runtime`依赖，命令如下：

```
yarn add @babel/plugin-transform-runtme --dev
```

然后，在配置文件`.babelrc`中使用它，代码如下：

```
{
  ...
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true, // 提取`babel`编译产生的公共的模块
        "corejs": false, // 用来解决非实例化的方法API的转化，默认false
        "regenerator": true, // 解决全局作用域被污染问题 // 默认true
        "useESModules": false // 不使用`@babel/plugin-transform-modules-commonjs`对模块的引入方式进行转换，默认为fasle
      }
    ]
  ]
}
```

为了解决`ES`中`API`转换的问题，一般情况下，需要引入`@babel/polyfill`，安装命令如下：

```
yarn add @babel/polyfill --dev
```

然后，在`webpack.config.js`中全局引入，如下代码所示：

```
...
entry: {
  ...
  lib: ['@babel/polyfill']
},
...
plugins: [
  new HtmlWebpackPlugin({
    chunks: ['lib', 'commons', 'vendor', 'A']
  }),
]
```

这里要介绍[`@babel/runtime-corejs2`](https://babeljs.io/docs/en/babel-runtime-corejs2)，它和`@babel/polyfill`一样使用`core-js`，但是使用它可以不用再担心（如：`Set`等）非实例方法的使用。

安装`@babel/runtime-corejs2`依赖，命令如下：


```
yarn add @babel/runtime-corejs2 --dev
```

启用这个功能，需要设置`@babel/plugin-transform-runtime`的配置项`corejs`的值为`2`，默认值为`false`（它的意思使不启用该功能），配置如下：

```
...
{
  "helpers": true, // 提取`babel`编译产生的公共的模块
  "corejs": 2, // 用来解决非实例化的方法API的转化，默认false
  "regenerator": true, // 解决全局作用域被污染问题 // 默认true
  "useESModules": false // 不使用`@babel/plugin-transform-modules-commonjs`对模块的引入方式进行转换，默认为fasle
}
...
```

如果要解决实例化方法的API问题，可以直接应用`core-js`，而不必安装`@babel/polyfill`或`core-js`。

修改`chunks/a1.js`代码如下：

```
var _ = require('lodash');
var includes = require('core-js/fn/array/includes');
var Set = require('core-js/fn/set');

module.exports = function() {
	var arr = ['a', 'b'];
	console.log('this a module of a1', _.join(arr, '~'));
	console.log(arr.includes('b'));
	var set = new Set();
	document.body.style.fontSize = '36px';
	document.write('hello world.');
}
```

为什么必须要`var Set = require('core-js/fn/set');`这个代码才可以，因为`@babel/runtime-corejs2`只支持`import`这种写法。所以，这里要特别注意。

## 构建信息分析

运行`npm run build`，构建信息如下：

```
Hash: 983c15390adcdda13f0d
Version: webpack 4.28.4
Time: 11909ms
Built at: 2019-01-17 22:50:54
                              Asset       Size  Chunks             Chunk Names
         A.983c15390adcdda13f0d.css  199 bytes       2  [emitted]  A
     A.983c15390adcdda13f0d.css.map  397 bytes       2  [emitted]  A
          A.983c15390adcdda13f0d.js   1.55 KiB       2  [emitted]  A
      A.983c15390adcdda13f0d.js.map   5.33 KiB       2  [emitted]  A
          B.983c15390adcdda13f0d.js    1.6 KiB       3  [emitted]  B
      B.983c15390adcdda13f0d.js.map   5.33 KiB       3  [emitted]  B
          C.983c15390adcdda13f0d.js   1.61 KiB       4  [emitted]  C
      C.983c15390adcdda13f0d.js.map   5.33 KiB       4  [emitted]  C
    commons.983c15390adcdda13f0d.js  429 bytes       0  [emitted]  commons
commons.983c15390adcdda13f0d.js.map  225 bytes       0  [emitted]  commons
                         index.html  410 bytes          [emitted]
     vendor.983c15390adcdda13f0d.js   85.9 KiB       1  [emitted]  vendor
 vendor.983c15390adcdda13f0d.js.map    545 KiB       1  [emitted]  vendor
```

可以发现，虽然我们自己写的代码比较少，但构建输出的文件则比较大。

解决这个问题，可参考[webapck实现最小化构建输出](https://github.com/lvzhenbang/webpack-play#webapck%E5%AE%9E%E7%8E%B0%E6%9C%80%E5%B0%8F%E5%8C%96%E6%9E%84%E5%BB%BA%E8%BE%93%E5%87%BA)。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-11)
