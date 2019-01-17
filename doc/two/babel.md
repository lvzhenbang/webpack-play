# babel

`babel`的发音，链接[地址](https://github.com/babel/babel#supporting-babel)。

注：起初不重视，后来被鄙视后，才认识到重要性。反思过后，明白细节往往是体现你个人能力的地方。

## babel的用途

开发者想要使用最新的`ECMAScript`，而应用需要考虑兼容性（浏览器）问题，需要使用低版本的`ECMAScript`。

`babel-preset-es2015`和`babel-preset-es2016`起到一个`ES`（ECMAScript的简称）从高版本到低版本的转换作用。

而`@babel/preset-env`则是根据应用的使用环境，来进行编译，它引入了[`browserlist`](https://github.com/browserslist/browserslist)。这个跟契合实际的需要。

## `babel`的生态系统

由于`babel`应开发者的需要被赋予了更多的能力，而这也造成`babel`的体积变得越来越大。为了解决`babel`体积变大的问题，它必须要拆分。

注：`babel`从`v6.x`开始拆分。

拆分`babel`的好处：

* 对于`babel`的开发团队来说，可以更好的维护`babel`，
* 对于开发者来说，满足了`按需加载`的需求，这样`webpack`可以极大地较少构建时间

拆分`babel`的缺点：

* 由于它生态系统的庞大，造成了学习和使用上的难度

注：对于学习方面，要从`babel`生态系统的组成入手；对于使用上的问题，可以先从`大神`的demo入手。

### babel生态系统的组成

现在的`babel`主要有`@babel/babel-core`，`@babel/babel-polyfil, @babel/rutime`，`@babel/babel-preset-env`，`@babel/plugin-*`这四部分组成。

* `@babel/babel-core`：主要实现了`解析`和`输出`的功能，而不实现`转换`的功能，它可以接受`命令行`和`bundler`(如：webpack)传递的指令；
* `@babel/babel-polyfill, @babel/runtime`：这里其实包含两部分。一部分是`@babel/babel-polyfill`，它用来实现的是`ES`的`API`的转换（如：ES6引入了`Array.from()`，而ES5中却没有）；另一部分`@babel/runtime`则是实现`语法结构`的改变（如：ES6的 `() => console.log('webpack')` 到ES5的`function() { console.log('webpack) }`）；
`@babel/plugin-*`：调用`@babel/babel-polyfill, @babel/runtime`来实现`ES6+`新语法特性到低版本`ES`（如：ES5）的转换；
* `@babel/babel-preset-env`：用来指定`@babel/plugin-*`和`@babel/babel-polyfill`所服务的应用要满足的部署、访问环境；

开发者，可以根据自己的需要，自己制作`babel-plugin-*`，由于贡献的插件众多，现在`babel-plugin-*`的规模非常庞大。

这也就形成了现在的`babel`生态系统。

## webpack如何babel来转换JavaScript

* `webpack`调用[`babel-loader`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/babel-loader.md)来启用`babel`来处理`*.js`文件块的代码，也就是使用`@babel/core`依赖；
* `@babel/core`依赖于`@babel/babel-preset-env`来调用`@babel/plugin-*`或`@babel/babel-polyfill, @babel/runtime`（如果在`@babel/babel-preset-env`中使用了`@babel/plugin-*`，那么就会依据`@babel/plugin-*`调用`@babel/babel-polyfill, @babel/runtime`；反之，则直接调用`@babel/babel-polyfill, @babel/runtime`）；
* `@babel/babel-polyfill`调用[`core-js`](https://github.com/zloirock/core-js)来处理`ES`的API；
* `@babel/runtime`则可以直接处理`ES`的语法。


## 区分`@babel/plugin-transform-runtime`和`@babel/runtime`

`@babel/plugin-transform-runtime`就是一个插件（`babel`官方团队维护），它依赖于`@babel/runtime`。它可以让使用者实现自定义。

安装`@babel/plugin-transform-runtime`依赖，代码如下：

```
yarn add @babel/plugin-transform-runtime --dev
```

在`.babelrc`（babel v7.x）中，可以添加如下代码：

```
"plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": false, // 提取`babel`编译产生的公共的模块
        "corejs": false, // 用来解决非实例化的方法API的转化，默认false
        "regenerator": true, // 解决全局作用域被污染问题 // 默认true
        "useESModules": false // 不使用`@babel/plugin-transform-modules-commonjs`对模块的引入方式进行转换，默认false
      }
    ]
]
```

选项`corejs`也支持数字值，如果要使用`corejs-2`，那么选项值就是`2`，需要安装`@babel/runtime-corejs2`依赖，命令如下:

```
yarn add @babel/runtime-corejs2 --dev
```

因为`@babel/plugin-transform-runtime`只能用于webpack的开发模式，而生产模式需要安装`babel-runtime`才会起作用，命令如下：

注：在`babel v6.x`中，自定义功能有所不同。具体可参考[官方文档](https://babeljs.io/docs/en/6.26.3/babel-plugin-transform-runtime#options)


实例应用可参考[babel-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/babel-loader.md)这篇文章。

