## webpack4带来了什么

`webpack` 是我很喜欢的模块化构建工具。在开发人员在体会webpack3.x的韵味时，webpack4.x已经悄然而来。

很明显的每次大版本的迭代，使用者最期待的问题无外乎如下：

* 新版本与旧版本相比都有哪些改变？
* webpack3.x到webapck4.x的迁移？
* 在使用的时候我们应该注意什么？

### webpack的新特性

`webpack` 作为构建工具的强大之处在于：

* 可以在 `webpack.config.js` 配置很多独特的功能；
* 它的配置灵活多变；

但正因为这样，这也是它的糟点。因为太随意，所以不好控制。造成了如下的问题：

* 学习、使用、研究webpack的成本过高（进阶曲线太陡）；
* 构建一个小应用也需要像大应用那样配置 `webpack.config.js`（麻雀虽小五脏俱全）；

而webpack4.x作为新一代版本 `webpack` ，它的出现极大的解决了现有的问题。

> webpackk4.x可以不使用 `webpack.config.js` 配置文件

1. 创建一个项目目录（webpack-demo），然后进入改目录
    
    mkdir webpack-demo && cd webpack-demo

2. 初始化 `package.json` 文件
    
    npm init -y
3. 获取 `webpack` （[webpack-cli](https://github.com/webpack/webpack-cli)从webpack中分离了出来）
    
    npm install webpack webpack-cli --save-dev

4. 在项目下创建 `~/src/index.js` 文件（`index.js` 是默认的入口文件，默认入口目录为`~/src`，当然你也可以自定义入口文件，需要修改 `package.json` 中的 `main` 配置项为指定的文件）

```
console.log('hello webpack.')
```

5. 打开 `package.json` 在 `scripts` 配置项中添加如下代码：

```
"scripts": {
    "build": "webpack"
}
```

6. 运行 `npm run build` 命令，之后在根目录下你将看到一个 `~/dist/main.js` 的文件。在命令窗口你因该注意到如下的警告提示：

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

除了这条提示，我们发现webpack4.x的使用和webpack3.x没什么大的区别，但是少了必须要的 `webpack.config.js` 配置文件。

> 打包模式的改变

我们在回头查看上面这个提示信息，它的意思就是说：‘如果没有设置打包模式这个配置项，那么默认的打包模式为生产模式（production），而对于开发模式（development），需要配置 `mode` 配置项’，说到这里，我想各位看官应该明白了webpack4.x增加了很多默认配置项，针对不了解webpack或者针对小应用开发的人来说，这样无异省时省力。

但实际应用中，我们往往还是区分开发模式和生产模式，只要修改 `package.json` 中的 `scripts` (在命令行中添加mode配置项) 如下：

```
"scripts": {
    "dev": "webpack --mode development", // 用于开发模式
    "build": "webpack --mode production" // 用于生产模式
}
```

‘对！就是这么简单’。我们不需要像webpack3.x那样分别定义开发模式和生产模式这样两份配置文件。

> 重载默认的配置项入口/出口

没有了配置文件 `webpack.config.js` ，在减少了我们的配置工作量同时，也给我们带来了疑问，如何自定义入口和出口点？在没有 `webpack.config.js` 的情况下，我们可以在命令行中添加入口/出口配置项，代码如下：

```
"scripts": {
    "dev": "webpack --mode development ./src/entry.js --output ./dist/bundle.js", // 用于开发模式
    "build": "webpack --mode production ./src/entry.js --output ./dist/bundle.min.js" // 用于生产模式
}
```

以上就是webpack4.x给我们带来的整体变化。但是原来 `webpack.config.js` 配置文件中的 `module` 配置项和 `plugins` 配置项中的功能还需要使用 `webpack.config.js`。webpack的计划是 `0` 配置一些常用的loader，plugin。

实现的有 `UglifyJSPlugin` 内置插件，在生产模式无需引入就可以实现 `*.js` 代码的压缩，至于 `*.css` 压缩文件的分离要在webpack5.x中了。

但是其它的loader和plugin则需要通过 `webpack.config.js` 来引入。

提示：

* module: 配置不同资源，如：js, css, font 等等模块的过滤规则，然后使用对应loader进行转换为可用webpack操作内容的转化器）
* plugin: 可用来添加强化功能的插件

### webpack的迁移和注意事项

看到webpack4.x的变化很多人会问webpack3.x到webpack4.x的迁移是不是很麻烦，其实并不麻烦，webpack4.x向后兼容webpack.3x。

前面为了不引入 `webpack.config.js` ，我们使用了npm的 `scripts` ，其时像入口/出口的重载，我们也可以在 `webpack.config.js` 配置文件中完成，配置跟原来的相似，但是webpack4.x存在这样的问题：

1. 使用webpack4.x你会发现，在分离 `*.css` 出文件时总是出错，这是 `extract-text-webpack-plugin` 本身的问题，官方推荐使用 `mini-css-extract-plugin` ，但使用它有一个限制就是webapck须是4.2.0版本以上。

2. 使用 `使用babel-loader` 转化ES6->ES5不需要 `.babelrc` 配置文件，所以，你只需要在 `package.json` 的 `scripts` 中添加 `--module-bind js=babel-loader` 即可完成对 `babel-loader` 的配置

其他的没有什么大的区别。其实讲到这里基本完了，下面是用webpack4.x构建的一个demo。

### webpack4.x的demo

紧接上面的配置：

首先，添加 `html-wepback-plugin` 和 `html-loader` 依赖：

    npm install html-webpack-plugin html-loader --save-dev

`html-webpack-plugin` 生成能加载打包后 `*.js` 文件的html文件，当然你也可以使用webpack支持的各种模板[loader](https://webpack.js.org/loaders/#templating)，这里使用 `html-loader` 支持`*.html` 类型文件的模板来生成。

其次，添加 `mini-css-extract-plugin` 和 `css-loader` 依赖：

    npm install mini-css-extract-plugin css-loader --save-dev

loader和plugin配置与webpack3.x类同，也可参考下面提供的代码中的 `webpack.config.js` 文件。

然后，添加 `babel-loader` 、`@babel/babel-core` 和 `@babel/babel-preset` 依赖：

    npm install @babel/core babel-loader @babel/preset-env --save-dev

loader和plugin配置与webpack3.x类同，也可参考下面提供的源码中的 `webpack.config.js` 文件。

修改 `package.json` 中 `scripts` 如下：

```
"scripts": {
    "dev": "webpack-dev-server --mode development --module-bind js=babel-loader --open ./src/entry.js --output ./dist/bundle.js",
    "build": "webpack --mode production ./src/entry.js --module-bind js=babel-loader --output ./dist/bundle.min.js"
},
```

最后，添加 `webpack-dev-server` 依赖，实现项目文件修改，浏览器及时刷新

    npm install webpack-dev-server

修改 `package.json` 中 `scripts` 如下：

```
"scripts": {
    "dev": "webpack-dev-server --mode development --module-bind js=babel-loader --open ./src/entry.js --output ./dist/bundle.js",
    "build": "webpack --mode production ./src/entry.js --module-bind js=babel-loader --output ./dist/bundle.min.js"
},
```

这样一个简单的demo就完成了。

[wepback-demo源代码](https://github.com/)

### 参考资料

[webpack-tutorial](https://www.valentinog.com/blog/webpack-tutorial/)

[webpack官方指南](https://webpack.js.org/)

