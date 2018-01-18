## 插件

说到插件就是我们不得不回顾一下前面讲的loader，刚开始我也是傻傻的分也分不清楚loader和plugin的差别。但是用的多了，看了些文章后才慢慢的回过味来。

### loader vs plugin

在说它们两个之间的联系与区别之前，我们向说说webpack的依赖关系图，众所周知webpack能方便快速的按照我么们发出的指令来进行打包这个关系图功不可没，在我们webpack时，webpack会遍历你的整个项目目录，从而形成关系依赖图。

但是我们知道webpack是js语言开发，所以限制就是它只能处理js文件，而我们都知道我们开发的web项目是由html，js，css，图片资源(.png, .jpg, .gif等)，文本资源(.txt, .md等)，多媒体资源(.mp3, .mp4等) 和一些其它形式的文件资源，这些非js的资源如何处理，loader的作用就是解决这个问题的。它把这些项目文件编译成webpack可处理的资源，然后将节点添加到关系依赖图中。

而我们要实现对添加到关系依赖图中的资源处理并输出，我们使用webpack内置的插件可以实现一般的输出，但是我们要实现高级功能的输出我们就需要用webpack提供的插件(非内置插件)。

说完区别，那就说说联系，现在的webpack中的loader功能越来越强大，甚至这些强大的loader自己本身就有插件，我们所熟悉的最强大的就是PostCSS，它虽然是一个loader，但是它自己就是个插件容器，现在已拥有200多个插件。虽然它的功能强大，实现了部分插件的功能，但是在webpack中的作用还是将项目资源文件编译加载到关系依赖图中，然后使用webpack的内置插件配合外载插件来实现最终的资源输出。

### webpack常用插件

webpack的插件按照引入的形式可分为外部引入和内部内置的两类。

#### webpack 内置插件

[CommonsChunkPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/commonschunkplugin.md) // 提取共享的通用模块

[UglifyjsWebpackPlugin]() // 

[DllPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/dllplugin&dllreferenceplugin.md) // 减少打包构建的时间

[ProvidePlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/provideplugin.md) // 不必通过import/require使用模块


#### webpack 外载插件

[HotModuleRepalcementPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/hmrplugin.md) // 启用热交换

[HtmlWebapckPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/htmlwebpackplugin.md) // 创建简单的HTML，用于服务器的访问

[ExtractTextWebpackPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/postcss.md) // 从打包后的js中分理处css到单独的文件


#### 工具

[webpack-dev-server](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/hmrplugin.md)