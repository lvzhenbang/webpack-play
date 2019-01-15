## 如何使用新ES语法

尝试用最新的ES语法特性，同时满足浏览器的兼容性。这是就需要[`babel`](https://babeljs.io/docs/en/)来进行语法转换。

### babel-loader

这个包是由babel团队开发的loader，用来告诉webpack我想要对我的js代码进行兼容性编译。

`babel-loader` 只是起到一个通知者的角色，通知babel你需要干活了，在webpack的module中使用代码如下：

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/, // 不对node_modules目录下的文件进行编译，可以提升webpack打包速度，其他loader也有这个配置
      use: {
        loader: 'babel-loader',
        // loader: 'babel-loader?cacheDirectory', // 使用缓存目录它可以进一步提升webpack的编译速度
        options: { // 这个配置项我们一般单独拿出来，创建一个‘.babelrc’文件来单独存放配置项
          presets: ['@babel/preset-env']，// babel预设
          plugin: ['@babel/plugin-proposal-object-rest-spread'] // 所需要使用的插件
        }
      }
    }
  ]
}
```

### babel-core

如果说 `babel-loader` 是告诉webpack我要对js文件进行代码兼容性编译，那么，webpack接下来就是要找babel，而bable的入口就是 `babel-core` ，只有通过它，webpack才能使用各种babel的api（前提是你安装了相关的api）。

### babel-preset-es* 和 babel-preset-stage-*

`babel-preset-es2015` ，`babel-preset-es2016` ，`babel-preset-es2017`等等傻傻的分也分不清楚。

这些预设将支持ES6新语法的兼容性编译。

#### 将代码转化为 ES3

`babel-preset-es3` 

#### 将代码转化为 ES5

```
'babel-preset-es2015' ，
'babel-preset-stage-0' ，
'babel-preset-stage-1' ，
'babel-preset-stage-2' ，
'babel-preset-stage-3' ，
```

#### 将代码转化为 ES6

```
'babel-preset-es2016' 将ES2016转化成ES6，
'babel-preset-es2017' 将ES2017转化成ES6，
```

预设只能将ES6语法编译为你指定的ES版本语法，例如：箭头函数，但是像 `Array.from` 这样的API呢他无能为力。那么，怎么办呢，我们下面来介绍几种解决方案。

### 处理ES6 API

#### babel-polyfill

babel预设可以编译几乎所有的JavaScript新语法，但是对于API却不能解决，解决这个问题babel用的是 `babel-polyfill` (它有core-js和regenerator两部分构成)。

执行安装命令：

	npm install --save-dev babel-polyfill

`babel-polyfill` 有三种引入方法。

1.那个模块需要就在那个模块引入，

	require('babel-polyfill');

2.全局引入方法1，在项目的入口文件引入，如果项目有多个入口，则在每个需要的入口分别加入。

	require('babel-polyfill');

3.全局引入方法2，可以在项目的 `webpack.config.js` 的入口配置项中引入。

```
entry: {
    app: ['babel-polyfill', './main.js']
},
```

这是第一种解决方案用来将ES6代码编译为es5。但是这种方案，增加了一些不必要的代码，webpack打包后的文件比较大，使用它还有一个问题就是容易造成全局污染。。

而刚刚好babel提供了babel-runtime。babel-plyfill我们以前经常用，而babel-runtime，则是现在常用的。

#### babel-runtime

babel-runtime不会污染全局对象。如：当前的运行环境如果不支持Symbol，可以访问 `babel-runtime/core-js/symbol` 这里重新定义了symbol，此外还有Promise，Set 和 Map 等。

`babel-runtime` 官方建议用在生产环境，而开发环境使用 `babel-plugin-transform-runtime`

##### babel-plugin-transform-runtime

引用自：[https://github.com/babel/babel-loader](https://github.com/babel/babel-loader)

```
babel uses very small helpers for common functions such as _extend. By default this will be added to every file that requires it.

You can instead require the babel runtime as a separate module to avoid the duplication.
```

这段话的意思是说：

babel会使用一些非常小的辅助（helper）函数作为通用函数，例如：`_extend` 。默认情况下，这类函数将被添加到每个需要它的文件中。这时你可以使用babel runtime作为单独的模块来避免重复。

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/, // 不对node_modules目录下的文件进行编译，可以提升webpack打包速度，其他loader也有这个配置
      use: {
        loader: 'babel-loader',
        // loader: 'babel-loader?cacheDirectory', // 使用缓存目录它可以进一步提升webpack的编译速度
        options: { // 这个配置项我们一般单独拿出来，创建一个‘.babelrc’文件来单独存放配置项
          presets: ['@babel/preset-env']，// babel预设
          plugin: ['@babel/transform-runtime']
        }
      }
    }
  ]
}
```

`babel-plugin-transform-runtime` 包含一个内置的polyfill(它包含一个自定义的regenerator运行时和core.js)，所以，在webpack中使用 `ProvidePlugin` 用 `shimming` 方法定义 `Promise` 将不起作用。

### env preset

`babel-preset-env` 允许你指定一个代码执行环境，并且只编译该环境缺少的特性。

而非 `babel-pre-env` 预设存在的问题在于它们往往做得太多。例如，大多数现代浏览器都支持ES6生成器。如果您使用 `babel-preset-es2015` 这些预设，ES6生成器函数将始终被转换为复杂的ES5代码。

`.babelrc` 配置文件如下：

```
"presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 7"]
        }
      }
    ]
  ]
```

支持最近两个版本的浏览器和IE7以上的浏览器。

### 其它babel插件

`babel-plugin-tranform-classes` // 解决ES6类（class）的兼容性

### 使用实践

#### `babel-core`，`babel-preset-es2015`，`babel-polyfill`， 

首先，`.babelrc` 代码如下：

```
{
	"presets": ["es2015"]
}
```

然后，修改 `webpack.config.js` 代码如下：

```
entry: {
    app: ['babel-polyfill', './main.js']
},
```

`babel-polyfill` 还有其他的引入方式

#### `babel-core`，`babel-preset-es2015`，`babel-transform-runtime`


仅需要修改 `.babelrc` 代码如下：

```
{
	"presets": ["es2015"],
	"plugins": ["transform-runtime"]
}
```

#### `babel-core`，`babel-preset-es2015`，`babel-transform-runtime`, `babel-preset-stage-*`,

使用 `babel-preset-stage-*` ，我们就是想使用一些更新的js特性，以 `babel-preset-stage-2` 为例：

仅需要修改 `.babelrc` 代码如下：

```
{
	"presets": ["es2015", "stage-2"],
	"plugins": ["transform-runtime"]
}
```

#### `babel-core`，`babel-preset-es2015`，`babel-transform-runtime`, `babel-preset-env`

给我们的项目指定支持的浏览器和运行环境。

仅需要修改 `.babelrc` 代码如下：

```
{
	"presets": ["es2015"],
	"plugins": ["transform-runtime"].
	"env": {
		"targets": {
			"browsers": ["last 2 versions", "safari >= 7"], // 浏览器
			"node": "6.10" // node 
		}
	}
}
```

你可能发现这里没有介绍 `babel-cli`, `babel-register` 和babel插件，解释一下，这里主要是为了webpack的使用进行的介绍，如果有很多人需要的话可以在做介绍。

下一篇babel的文章我会介绍，如何在webpack中使用 `babel-eslint` 。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-11)

参考资料:

[babel-preset-env: a preset that configures Babel for you](http://2ality.com/2017/02/babel-preset-env.html)
[babel-preset-env from npmjs.com ](https://www.npmjs.com/package/babel-preset-env)
[babel中文参考手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)

其它关于webpack的系列文章[webpack-learning](https://github.com/lvzhenbang/webpack-learning)
