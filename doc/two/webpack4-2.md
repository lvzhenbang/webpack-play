# webpack4.x的变化（二）

我之前写过一篇文章[webpack4带来了什么](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/webpack4.md)，这篇文章优点照猫画虎的意思，文章中说明了一些什么，但好像是还没有说透，感觉不是那么好，所以下定决心，在写一篇，可能这一篇也有不足，但后续还会继续补充。话不多说，下面进入正文。

webpack4.x提出的一个口号是实现`0配置`，也就是说，我们不用添加配置文件`webpack.config.js`，就可以实现构建打包的目的。因为，webpack4.x之前的版本，因为要实现构建就需要自己手动来添加配置文件，不管是大型应用，还是小应用，这一点增加了使用的复杂度，同时也让学习曲线变得更加陡峭。所以webpack4.x的出现就像一道清流，受人追捧，但同时也带来了一些[问题](https://github.com/lvzhenbang/webpack-play/blob/master/doc/other/doc.md)，最主要的就是迁移和使用习惯的变化。

## webpack4.x的mode选项和optimization插件

webpack4.x之前，我们需要自己配置mode（mode有三个选项值，`development`、`production`和`none`），然后针对性的配置相应的配置文件。webpack4.x中的mode的出现，可以让我们没有省去一些不必要的配置（如何要实现精细化的控制，还是需要自定义配置文件）。很明显，webpack4.x让我们省去了一些配置，那么为了更好的使用webpack4.x，便于以后的扩展，或者实现细粒度的控制，你就需要了解不同的mode。

> mode: development

也就是之前，我们要自己配置的开发模式，省去了`webpack.config.dev.js`配置文件。

新特性：

* 方便于浏览器调试的工具；
* 可以快速的对增加的内容进行编译；
* 提供了更精确、更有用的运行时错误提示机制

功能：

* 不用设置npm脚本命令中 `webpack --env development` ，webapck会自动将 `development` 传递给 `process.env.NODE_ENV` 。当然，这里我们使用的时`mode`选项，我们可以在npm脚本命令为 `"dev": "webpack --mode development"` ，也可以命令行中输入 `webpack --mode development`（注意：windows安装webapck-cli注意路径问题）；
* 它启用了 `NamedChunksPlugin` 和 `NamedModulesPlugin` 两个插件。这两个插件时webapck的内置插件，在 [`webpack lib目录`](https://github.com/webpack/webpack/tree/v4.27.1/lib) 下可以找到。它的作用就是给所有的模块（源文件）和块（构建输出文件）定义一个名字。

注：在webpack中，如果要使用webpack的内置插件，需要`const webapck = require('webpack')` 这样先引入webapck，然后像 `webapck.HotModuleReplacementPlugin()` 这样，启用启用内置的热替换插件。而webapck内置插件中有一类优化插件会经常用到，我们可以 `webpack.optimize.uglifyjsplugin()`(这个插件在webapck4.x中移除了)。

> mode: production

也就是之前，我们要自己配置的开发模式，省去了`webpack.config.pro.js`配置文件。

新特性：

* 自动压缩构建输出的文件
* 快速的运行时处理
* 不暴露源代码和源文件的路径
* 快速的静态资源输出

功能：

* 不用设置npm脚本命令中 `webpack --env production` ，webapck会自动将 `production` 传递给 `process.env.NODE_ENV` 。当然，这里我们使用的时`mode`选项，我们可以在npm脚本命令为 `"dev": "webpack --mode production"` ，也可以命令行中输入 `webpack --mode production`。
* 它启用了 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin`,它们是内置插件，还启用了 `TerserPlugin` 这个插件（它不是webapck内置插件）。

优化类的插件：

```
FlagIncludedChunksPlugin: 检测并标记模块之间的从属关系。
ModuleConcatenationPlugin: 可以让webpack根据模块间的关系依赖图中，将所有的模块连接成一个模块。
SideEffectsFlagPlugin: 告诉webapck去清除一个大的模块文件中的未使用的代码，这个大的文件模块可以是自定义的，也可以是第三方的（注意：一定要`package.json`文件中添加`"sideEffects": false`）。
OccurrenceOrderPlugin: 告诉webapck各个模块间的先后顺序，这样可以实现最优的构建输出。
TerserPlugin: 它替代了uglifyjs-webpack-plugin插件。它的作用依然是对构建输出的代码进行压缩。
```

> mode: none

这种模式下，webpack不做任何优化处理（相较于development和production模式）。webapck4.x所有内置的[优化插件](https://webpack.js.org/configuration/optimization/)。

优化类的内置插件有哪些呢？你可以参考 [`webpack 的optmize目录`](https://github.com/webpack/webpack/tree/v4.27.1/lib/optimize)


从上面的描述可以看出，webapck4.x的特点就是：上手简单，构建速度快，良好的开发体验。

## webpack4.x的devtool

它主要使用在development模式下，但也可以作用于production模式下。

development:

默认的配置值是`eval`，它的速度快，但效果不好，也可以考虑使用 `cheap-eval-source-map` 或 `cheap-module-eval-source-map`。

production:

可以使用`source-map`或者`cheap-source-map`


## webpack4.x的loader和plugin

由于webpack4.x的新特性和新功能，使它形成了新的loader和plugin生态系统。

### loader

webpack4.x移除了 `this.options` ，这个在loader中经常使用的上下文，如果要使用`this.options.context`，现在可以通过`this.rootContext`。

`this.hot` 被添加到了loader的上下文中，所以我们可以给指定的代码启动HMR功能。

同样现在可以将`AST`传递给loader，而不会出现原来的双重解析问题。

### plugin

webpack4.x的插件生态系统变化较大，有兴趣的可参考[tapable](https://github.com/webpack/tapable)。


## 参考资料

* [webpack 官方文档](https://webpack.js.org/)
* [webpack 4: mode and optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
* [webpack 4: migration guide for plugins/loaders](https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202)