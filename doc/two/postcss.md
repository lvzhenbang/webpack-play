## postcss

之前讲述了如何使用css的预处理语言，如：sass， less，stylus，可参考[css扩展语言loader，如：sass, less, stylus等](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/css-extend.md)这篇文章。

这些预处理语言，可以让我们的编程更简洁，但是它不能很好的解决兼容性的问题，而使用[`postcss`](https://github.com/postcss/postcss#postcss-)则可以很好的解决这一问题。而且它不仅仅解决了这一个问题。

注：`postcss`在`css`中的作用，就像是`babel`之于`js`。

### postcss能做什么

> `postcss`是什么？

它是一个工具，可以使用一些插件，把样式转换为我们所需要的形式。

> `postcss`功能

* 它可以检查你的css语法、格式是否符合标准（团队合作）。
* 它通过使用sass，less，stylus等css预处理器，让css支持`变量`和`mixins`。
* 它支持开发者使用最新的css特性，然后将它们转换为大部分浏览器支持的形式。
* 它可以处理样式中使用的图片。

...

### postcss生态


#### Autoprefixer

`postcss`中最有名的插件要数[`Autoprefixer`](https://github.com/postcss/autoprefixer)。它可以自动解析css，然后使用来自[`Can I Use`](https://caniuse.com/)的css语法规则，为css添加第三方支持的前缀。

注：[angular](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/package.json#L32)使用的就是`postcss`。

注：[clean-css](https://github.com/jakubpawlowicz/clean-css)它的作用和`Atuoprefixer`类似。

#### postcss-preset-env

在`babel`中有一个`babel-preset-env`，它用来定义`js`代码最终要满足的使用环境。

而`postcss`中也有一个`postcss-preset-env`，它用来解决未来`css`到css实际应用所需的转换。它和`autoprefixer`类似。

注：下一代的css，可参考[cssdb](https://cssdb.org/)。

#### 结束css的全局使用

它可以让开发者像操作js那样操作css。可参考[css-modules](https://github.com/css-modules/css-modules)。

#### 语法检查（stylelint)

可参考[styleint 官方文档](https://stylelint.io/)。

#### grid布局

可参考[lost 官方文档][https://github.com/peterramsing/lost]。它充分使用了`calc()`。

### demo

首先，安装`postcss-loader`依赖，命令如下：

```
yarn add postcss-loader --dev
```

安装了它，就不需要安装`postcss`；

如果需要使用其他插件如`autoprefixer`，`cssnano`等，直接安装即可，如：`autoprefixer`，安装命令如下：

```
yarn add autoprefixer --dev
```

然后，在项目根目录添加`postcss.config.js`文件，代码如下：

```
module.exports = {
  return {
    plugins: {
      'autoprefixer': {
         'browsers': [
            "> 0.14%"
          ],
      }
    }
  }
}
```

注：`autoprefixer`的`options.browsers`可以在`package.json`定义，这样有利于它的共享，如；`babel`的使用。

在`moduleA.css`中添加如下代码：

```
@import './chunks/a.css';
@import './chunks/b.css';

body {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))
}
h1 {
  transform: translateX(50%)
}

.banner {
  display: flex;
}
```

运行`npm run build`脚本命令，构建结束后，生成的代码如下：

```
h1 {
  color: white;
}
h1 {
  font-size: 48px;
}
body {
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))
}
h1 {
  -webkit-transform: translateX(50%);
      -ms-transform: translateX(50%);
          transform: translateX(50%)
}

.banner {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

/*# sourceMappingURL=A.css.map*/
```

注：可以`postcss-loader`的`options.config.path`选项来指定`postcss.config.js`文件的路径。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-11.2)