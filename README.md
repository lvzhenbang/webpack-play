## webpack-play

所有的webpack文章皆为自己的使用心得体会，不足之处欢迎吐槽。

### 初探

<details>
<summary>目录</summary>

* [webpack 入门](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/index.md)
* [引入第三方库](https://github.com/lvzhenbang/webpack-play/tree/master/doc/third-party.md)
* [loader入门](https://github.com/lvzhenbang/webpack-play/tree/master/doc/loader.md)
* [plugin入门](https://github.com/lvzhenbang/webpack-play/tree/master/doc/plugin.md)

</details>

#### 常用loader

<details>
<summary>目录</summary>

* [css-loader & style-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)
* [url-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-style-loader.md)
* [file-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/file-loader.md)
* [css扩展语言(sass, less, stylus等)的loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-extend.md)
* [编译ES6为ES5的babel-loader](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/babel-loader.md)


</details>

#### 其他的loader

<details>
<summary>目录</summary>

* [语法检测的eslint-loader(文件类型：*.js)](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/eslint-loader.md)
* [语法检测的stylelint-loader(文件类型：*.css)](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/stylelint-loader.md)

* [postcss一个处理css模块的插件平台](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/postcss.md)

</details>

#### webpack内置插件

<details>
<summary>目录</summary>

* [CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/commonschunkplugin.md) // 提取文件块中的共用代码
* [UglifyjsWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/uglifyjsplugin.md) // 压缩编译后的模块
* [DllPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/dllplugin&dllreferenceplugin.md) // 减少打包构建的时间
* [ProvidePlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/provideplugin.md) // 不必通过import/require使用模块
* [HotModuleRepalcementPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/hmrplugin.md) // 启用热交换

</details>

#### webpack4.x 改变的内置插件

<details>
<summary>目录</summary>

* [SplitChunkPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/splitchunkplugin.md) // 提取各模块间的共用代码，它替代了`CommonsChunkPlugin`插件


</details>

#### webpack 外载插件

<details>
<summary>目录</summary>

* [CopyWebPackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/copy-webpack-plugin.md) // 拷贝静态文件到构建输出的 `dist/` 目录中
* [HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/htmlwebpackplugin.md) // 用webpack生成HTML文件
* [ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/extract-text-webpack-plugin.md) // 从打包生成的js文件分理处css到单独的文件。webpack4.x之前支持
* [MiniCssExtractPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/minicssextractplugin.md) // 从打包生成的js文件分理处css到单独的文件。webpack4.x开始支持
* [webpackMerge](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/webpack-merge.md) // 合并配置项
* [babel-plguin-lodash & LodashWebpackPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/lodash-webpack-plugin.md)

</details>

### 辅助开发工具

<details>
<summary>目录</summary>

* [HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/htmlwebpackplugin.md) // 用webpack生成HTML文件
* [WebpackDevServer](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/webpack-dev-server.md) // 用webpack开发时启动浏览器
* [nodemon](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/nodemon.md) // 用监视webpack.config.js的改变

</details>

### 进阶

<details>
<summary>目录</summary>

* [自定义实现 webpack-dev-server ](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/custom-HMR.md)
* [webpack4.x变化](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/webpack4.md)
* [webpack4.x变化 二](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/webpack4-2.md)
* [webapck常见使用问题](https://github.com/lvzhenbang/webpack-play/tree/master/doc/other/doc.md)

</details>

### 多页面应用创建

<details>
<summary>目录</summary>

* [构建多页面应用](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page.md)
* [构建多页面应用——单个页面的处理](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-single-page.md)
* [构建多页面应用——模板](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-template.md)
* [构建多页面应用——静态资源](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-assets.md)
* [构建多页面应用——优化（一）](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-function.md)
* [构建多页面应用——hash](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-hash.md)
* [构建多页面应用——优化（二）](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/multi-page-mockdata.md)

</details>

### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv