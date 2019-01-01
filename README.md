## webpack-learning

webpack 作为一个被 vuejs和angular这两种 `MV*` 前端框架支持的包构建工具，作为一个要成为大神的小虾，我决定进行初探、深探两个阶段的学习。

文章为自己的心得体会，不足之处欢迎吐槽。

### 初探

<details>
<summary>目录</summary>

* [webpack 入门](https://github.com/lvzhenbang/webpack-learning/blob/master/doc/first/index.md)
* [引入第三方库](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/third-party.md)
* [loader入门](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/loader.md)
* [plugin入门](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/plugin.md)

</details>

#### 常用loader

<details>
<summary>目录</summary>

* [css-loader & style-loader 的联系与区别](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)
* [css扩展语言(sass, less, stylus等)的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-extend.md)
* [处理资源（如：图片，字体等）的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/ohter-file-loader.md)
* [编译ES6为ES5的babel-loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/babel-loader.md)


</details>

#### 其他的loader

<details>
<summary>目录</summary>

* [语法检测的eslint-loader(文件类型：*.js)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/eslint-loader.md)
* [语法检测的stylelint-loader(文件类型：*.css)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/stylelint-loader.md)

* [postcss一个处理css模块的插件平台](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/postcss.md)

</details>

#### webpack 内置插件

<details>
<summary>目录</summary>

* [CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/commonschunkplugin.md) // 提取共享的通用模块
* [UglifyjsWebpackPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/uglifyjsplugin.md) // 压缩编译后的模块
* [DllPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/dllplugin&dllreferenceplugin.md) // 减少打包构建的时间
* [ProvidePlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/provideplugin.md) // 不必通过import/require使用模块
* [HotModuleRepalcementPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/hmrplugin.md) // 启用热交换

</details>

#### webpack 外载插件

<details>
<summary>目录</summary>

* [HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/htmlwebpackplugin.md) // 创建简单的HTML，用于服务器的访问
* [ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/postcss.md) // 从打包后的js中分理处css到单独的文件
* [webpackMerge](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/webpack-merge.md) // 合并配置项

</details>

### 进阶

<details>
<summary>目录</summary>

* [自定义实现 webpack-dev-server ](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/custom-HMR.md)
* [webpack4.x变化](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/webpack4.md)
* [webpack4.x变化 二](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/webpack4-2.md)
* [webapck常见使用问题](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/other/doc.md)

</details>

### 多页面应用创建

* [构建多页面应用](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page.md)
* [构建多页面应用——单个页面的处理](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page-single-page.md)
* [构建多页面应用——模板](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page-template.md)
* [构建多页面应用——静态资源](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page-assets.md)

### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv