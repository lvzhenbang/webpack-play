## loader

loader 的作用就是将一些非js的静态资源（模块文件）转换为js模块文件，然后在进行编译处理，使之变成webpack可以处理的代码。

如果我们需要处理某一类型的资源，我们该怎么做？

首先，需要安装相应的loader，比如：`*.json` 文件:

```
npm install --save-dev json-loader
```

其次，我们需要在 `webpack.config.js` 的module 配置项中添加如下代码：

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
  ...
}
```

module这个配置项来添加各种 `rule` 的预处理的配置。因此有 `rules` 这样一个规则数组，数组里边不同元素对象是针对不同类型文件的loader的配置项，`test` 用来过滤项目目下的指定类型文件， `use` 指定使用的loader，`use` 的属性值也可以是一个数组，数组里的loader具有依赖关系，前面的依赖后面的，比如：处理sass文件时，`['style-loader', 'css-loader', 'sass-loader' ]` ，它的顺序就必须是这样，那个loader最先被使用，就要将loader，放在最后的位置，其他的以此类推。

当然，我们常用的loader就那么些，如何分类呢？

* 处理css样式文件，我们用style-loader, css-loader, 针对其扩展语言我们用sass-loader, less-loader, stylus-loader；
* 处理js文件，我们一般不用loader，webpack本身支持的就是对js的处理，但是我们用js的扩展语言，我们就需要相应的loader，如coffee-loader(COffeeScript), ts-loader(TypeScript)，如果我们的项目中使用了js的新语法特性，不如现在的es6，我们就需要babel-loader。
* 语法检测，规范开发的格式，我们就需要相应的loader，js文件eslint-loader（jshint-loader）, css文件stylelint-loader。
* 模板，如果要使用不同的html预处理语言，我们就要使用响应的loader，如pug(pug-loader), markdown(markdown-loader)
* 框架，如现在流行vue.js（vue-loader）, angular2(angular2-template-loader)
* 测试loader，如mocha(mocha-loader)

### 常用loader

* [css-loader & style-loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)
* [处理资源（如：图片，字体等）的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/ohter-file-loader.md)
* [css扩展语言(sass, less, stylus等)的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-extend.md)
* [babel-loader 让ES6转化为ES5](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/babel-loader.md)


### 其他的loader

* [语法检测的eslint-loader(文件类型：*.js)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/eslint-loader.md)
* [语法检测的stylelint-loader(文件类型：*.css)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/stylelint-loader.md)
* [postcss一个处理css模块的插件平台](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/postcss.md)

