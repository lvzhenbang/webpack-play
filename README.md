## webpack-learning

webpack 作为一个被 vuejs和angular这两种 `MV*` 前端框架支持的包构建工具，作为一个要成为大神的小虾，我决定进行初探、深探两个阶段的学习。

文章为自己的心得体会，不足之处欢迎吐槽。

### 初探

[webpack 入门](https://github.com/lvzhenbang/webpack-learning/blob/master/doc/first/index.md)

[使用webpack构建一个项目(引入第三方库)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first.md)

#### 常用loader

<details>
<summary>目录</summary>

[css-loader & style-loader 的联系与区别](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)

[其它常见处理css扩展语言的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-extend.md)

[postcss一个处理css模块的插件平台](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/postcss.md)

[处理图片，字体等资源所需要的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/ohter-file-loader.md)

</details>

#### 特殊的loader

[babel-loader 让ES6转化为ES5](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/babel-loader.md)

#### webpack 内置插件

<details>
<summary>目录</summary>

[CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/commonschunkplugin.md) // 提取共享的通用模块

[UglifyjsWebpackPlugin]() // 

[DllPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/dllplugin&dllreferenceplugin.md) // 减少打包构建的时间

[ProvidePlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/provideplugin.md) // 不必通过import/require使用模块

</details>

#### webpack 外载插件

<details>
<summary>目录</summary>

[HotModuleRepalcementPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/hmrplugin.md) // 启用热交换

[HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/htmlwebpackplugin.md) // 创建简单的HTML，用于服务器的访问

[ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/postcss.md) // 从打包后的js中分理处css到单独的文件

</details>

#### 其它

[自定义实现 webpack-dev-server ](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/custom-HMR.md)

[webpack 如何引入并使用eslint](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/babel-eslint.md)


### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv