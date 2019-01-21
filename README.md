## webpack-play

注：webapck的生态圈很大，也很完善，但正因为大，而让人变得无所适从。`webpack-play`让使用webapck变得轻松起来。不夸张的说，webapck可以处理你开发中的所有问题。


### 初探

[webpack 入门](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/index.md)可以让你快速的上手webapck。

需要webapck做什么工作？

#### 处理css文件块

要实现css代码以内联的方式被`*.html`文件引用。可参考[css-loader & style-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)]；

要实现css代码被分为独立的文件，可以通过`<link>`元素被`*.html`文件引用。可参考[ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/extract-text-webpack-plugin.md)。

#### 处理图片和字体

[url-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)可以解决图片或字体是被合并到构建输出的文件中，还是分离出来。但它只能处理`url()`；如果要处理`<img src="...">`，可参考[CopyWebPackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/copy-webpack-plugin.md)。

#### 使用js新特性

[babel-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/babel-loader.md)可以满足你的需求，同时满足浏览器的兼容需求。

#### 规范开发中的代码

如果是js代码，可以参考[`eslint-loader`与Javascript语法检测的](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/eslint-loader.md)这篇文章；

如果是css代码，可参考[`stylelint-loader`与css语法检测](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/stylelint-loader.md)这篇文章。


### 进阶

### 两前端个技术生态

css和js作为web开发的重要组成部分。

* 有一个`babel`可以实现ES（JavaScript标准）新语法特性转换到指定语法特性；可参考[babel](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/babel.md)这篇文章。
* 有一个`postCss`也可以实现css样式的转换。可参考[postcss](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/postcss.md)

#### 函数化编程

> `*.js`模块的函数化编程

我们所熟知的是函数化编程可以极大程度的缩减JavaScript代码量。

> css的函数化编程

如果css也能实现函数化编程，那么css的代码量也将急剧减小，`sass`、`stylus`等css扩展语言成为了首选。可参考[css-extend](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-extend.md)这篇文章。

> html的函数化编程

一致比较流行的是`*.ejs`，`*.pug`。我个人常用的是`pug`，参考示例[webpack4.x-multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)。

> webpack的函数化编程

可参考[webpack4-demo](https://github.com/survivejs-demos/webpack-demo)。


#### 辅助开发工具

<details>
<summary>目录</summary>

* [HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/htmlwebpackplugin.md) // 用webpack生成HTML文件
* [WebpackDevServer](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/webpack-dev-server.md) // 用webpack开发时启动浏览器
* [nodemon](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/nodemon.md) // 用监视webpack.config.js的改变

</details>

### webapck优化构建输出

* 代码分离。可参考[code-splitting](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/code-splitting.md)

* tree-shaking。

#### webapck实现最小化构建输出

<details>
<summary>目录</summary>

* 提取构建输出文件的公共代码；webpack4.x之前版本可参考[CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/commonschunkplugin.md)篇文章，webpack4.x可参考[SplitChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/splitchunkplugin.md)这篇文章
* 可以从压缩`构建输出文件`（主要指css，js）。webpack4.x之前版本，webapck4.x可参考[webapck4.x 压缩构建输出](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/compress.md)这篇文章；
* 优化图片大小。可参考[构建多页面应用——静态资源](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-assets.md)这篇文章；
* 如果开发的应用支持网络环境，可以使用CDN。可参考[引入第三方库](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/third-party.md)这篇文章；
* 移除第三方库中未使用的js代码块。 可参考[babel-plguin-lodash & LodashWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/lodash-webpack-plugin.md)这篇文章；
* 移除项目未使用的css代码块。可参考[webapck4.x 移除构建输出的`*.css`文件中，未使用的css选择器](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/purify-css.md)这篇文章。

</details>

### 开发模式与效率

* [判断是那种开发模式——环境变量](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/enviroment.md)

### `Webpack` 与 `PWA`

[`Service Workers` 与 `workbox`](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/workbox.md)

### 常用loader

<details>
<summary>目录</summary>

* [css-loader & style-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)
* [url-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)
* [file-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/file-loader.md)
* [css扩展语言loader，如：sass, less, stylus等](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-extend.md)
* [babel-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/babel-loader.md)
* [postcss-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/postcss-loader.md)

</details>

### 其他的loader

<details>
<summary>目录</summary>

* [eslint-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/eslint-loader.md)
* [stylelint-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/stylelint-loader.md)
* [postcss](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/postcss.md)

</details>

### webpack内置插件

<details>
<summary>目录</summary>

* [CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/commonschunkplugin.md) // 提取文件块中的共用代码
* [UglifyjsPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/uglifyjsplugin.md) // 压缩编译后的模块
* [DllPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/dllplugin&dllreferenceplugin.md) // 减少打包构建的时间
* [ProvidePlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/provide-plugin.md) // 可以省去`import`或`require`来引用第三方库。如jquery，loadsh。
* [DefinePlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/define-plugin.md) // 定义一个全局常量，可以用来区分开发模式和生产模式。
* [HotModuleRepalcementPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/hmrplugin.md) // 启用热交换

</details>

### webpack4.x 改变的内置插件

<details>
<summary>目录</summary>

* [SplitChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/splitchunkplugin.md) // 提取各模块间的共用代码，它替代了`CommonsChunkPlugin`插件
* webpack4.x移除了`UglifyJsplugin`，而引入了`MinChunkSizePlugin`插件；

</details>

### webpack 外载插件

<details>
<summary>目录</summary>

* [CopyWebPackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/copy-webpack-plugin.md) // 拷贝静态文件到构建输出的 `dist/` 目录中
* [HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/htmlwebpackplugin.md) // 用webpack生成HTML文件
* [ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/extract-text-webpack-plugin.md) // 从打包生成的js文件分理处css到单独的文件。webpack4.x之前支持
* [MiniCssExtractPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/minicssextractplugin.md) // 从打包生成的js文件分理处css到单独的文件。webpack4.x开始支持
* [webpackMerge](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/webpack-merge.md) // 合并配置项
* [babel-plguin-lodash & LodashWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/lodash-webpack-plugin.md)

</details>


### 多页面应用创建

<details>
<summary>目录</summary>

* [构建多页面应用](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page.md)
* [构建多页面应用——单个页面的处理](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-single-page.md)
* [构建多页面应用——模板](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-template.md)
* [构建多页面应用——静态资源](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-assets.md)
* [构建多页面应用——优化（一）](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-function.md)
* [构建多页面应用——hash](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-hash.md)
* [构建多页面应用——优化（二）](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/multi-page-mockdata.md)

</details>


### 其他

<details>
<summary>目录</summary>

* [webpack4.x变化](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/webpack4.md)
* [webpack4.x变化 二](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/webpack4-2.md)
* [webapck常见使用问题](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/issue.md)

</details>


### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv