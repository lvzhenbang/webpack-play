# 构建多页面应用——模板

因为大多数人都比较喜欢，或者说倾向于用js操作现有的html代码块，而不喜欢用js来生成html代码块，之后再来操作它。很明显的一点儿就是前者清晰明了，后者不是那么直观。

因此在开发中，我们会接触到模板后者模板引擎这样概念。我们比较常见的就是`*.html`模板，Java开发中的`*.jsp`，php开发中的`*.php`，还有用于node.js的`*.ejs` 和 `*.jade`（以及它的最新版本`*.pug`）。

这里，着重说一下html和pug。

## 如何使用`html-webpack-plugin`的模板和注意事项

`html-webpack-plugin` 支持为生成的页面指定模板，我们可以直接使用配置项为`template`，那么这个指定的html模板应该如何操作，或者说应该怎么操作，才能达到灵活多变的特性。

使用webapcK做`多页面应用的构建`，我们当然是希望它能够实现`构建单页面应用`那样的模块化处理。

我们从[构建建多页面应用](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page.md)知道了构建多页面应用，可以实现js代码的模块化，从[构建多页面应用——单个页面的处理](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/multi-page-single-page.md)，知道了构建多页面应用可以实现css代码的模块化。那么，构建多页面应用能实现html代码的模块化吗？当然可以。

在上[一篇文章](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/multi-page-single-page.md)中，有一个`title`不能注入到生成的页面的问题，但是`html-webpack-plugin`插件可以解析`<%= htmlWebpackPlugin.options.title %>`这样的语法，它内部可以写js语法，同样它也解决了`title`不能注入到生成的页面的问题，但它有一个限制条件就是只能使用在被当作模板的html文件中，其它的代码块无法使用，所以关于html代码块的模块化，我们可以在模板文件上下下功夫。

使用过jQuery的同学都知道，我们可以使用`$('#container').load('./pages/partial.html')`的方法引入一个html代码块。而在webapck中，我们可以使用`require('./pages/commons/header.html')`的语法引入一个html代码块，但是webapck使用`require`引入的是一个文件流，不能和html模板文件相融合。所以这里要引入`html-loader`来做处理，它可以将流文件转化为字符串，这样就可以在html模板文件中使用了。

## 基于`html-webpack-plugin`的模板的实际操作

首先，本文中的`构建多页面应用`的项目目录图：

├── src
  │   ├── common            // 公用的模块
  │   │  ├── a.js           // 引用了a.css，模块header.css，container.css, footer.css
  │   │  ├── b.js           // 引用了b.css
  │   │  ├── c.js           // 引用了c.css
  │   │  ├── d.js
  ├── pages                // html代码块
  │   ├── template.html    // 模板文件
  │   ├── commons
  │   │  ├── header.html
  │   │  ├── footer.html
  │   │  ├── container.html
  ├── assets               // 静态资源
  │   ├── 19224132.jpg     // 用来做页面图标
  │   ├── css
  │   │  ├── a.css
  │   │  ├── b.css
  │   │  ├── c.css
  ├── assets               // 静态资源
  │   ├── 19224132.jpg     // 用来做页面图标
  │   ├── css
  │   │  ├── a.css
  │   │  ├── b.css
  │   │  ├── c.css
  │   │  ├── main.css
  │   │  ├── abutus.css
  │   │  ├── footer.css
  │   │  ├── container.css
  │   │  ├── header.css
  │   ├── uttils            // 工具
  │   │  ├── load.js        // 工具代码load.js
  │   ├── index.js          // 主模块index.js (包含a.js, b.js, c.js, d.js)，引用了main.css
  │   ├── aboutUs.js	      // 主模块aboutus.js (包含a.js, b.js)，引用了main.css, aboutus.css
  │   ├── contactUs.js      // 主模块contactus.js (包含a.js, c.js)，引用了main.css
  ├── webpack.config.js     // css js 和图片资源
  ├── package.json
  ├── yarn.lock

新增了`pages`目录，它里面包含了`html-webpack-plugin`所需的模板文件和组成模板的各个模块文件。

根据上文的分析，以及讲述需要，我们定义了一个公用的模板文件`template.html`，代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <!-- header -->
  <!-- <%= require('html-loader!./commons/header.html') %> -->
  <%= require('./commons/header.html') %>
  <!-- container -->
  <!-- <%= require('html-loader!./commons/container.html') %> -->
  <%= require('./commons/container.html') %>
  <!-- footer -->
  <!-- <%= require('html-loader!./commons/footer.html') %> -->
  <%= require('./commons/footer.html') %>
</body>
</html>
```

注：这里可能有的人会有个疑惑。因为熟悉构建单页面应用的人都将`html-loader`放到`webapck.config.js`文件中，这样可以`一次配置，终身受用`，如果你也像`构建单页面应用`那样操作的话，你需要小心再小心，因为你不加控制的话，`html-loader` 也会处理`template.html`，再加之`<%= htmlWebpackPlugin.options.title %>`是`html-webpack-plugin`插件的独有语法，这样在webapck编译的过程中，因为`html-loader`先执行，所以会将它转化为字符串，而`html-webpack-plugin`后执行，所以，这样的情况下，webpack生成的html页面不是你所需要的。解决方法也很简单你，只需要使用`include`选项即可(在webapck中使用`include`和`exclude`可以是`loader`的处理更精确，加开快编译的速度)。

当然，根据世界开发需要，我们可根据页面的不同设计效果和组成页面的不同模块来定义不同的html模板。

而对于哪些组成html模板的html模块，我们可以像写普通的html代码块那样，如：`header.html`，它的代码如下：

```
<div class="header">
  <ul>
    <li><a href="index.html">首页</a></li>
    <li><a href="aboutus.html">关于我们</a></li>
    <li><a href="contactus.html">联系我们</a></li>
  </ul>
</div>
```

如果你要对生成的html页面压缩，可以使用`html-webpack-plugin`的`minify`选项。

这样，构建页面应用的js、css、html代码的模块化就都实现了。

源代码可参考[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)

文章到这里，基本算是完成了这一篇文章的目的。但是如果你想对html代码进行更加细粒度的处理，可以考虑`ejs`或者`pug`。正如本文开始说的那样，下面就只简单的介绍`pug`的使用。

## 用pug对html代码进行细粒度的操作

这里，需要使用到的是`pug-loader`，它的作用和`html-loader`类似，只不过它有自己的语法，要经过从pug的语法到html的转换过程。但是它有更灵活的语法，可以让我们的页面代码更简洁。

有些内容只用语言可能太空洞，还是用代码还解释。首先，模板的代码：

```
doctype html

html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible" content="ie=edge")
    title= htmlWebpackPlugin.options.title
    
  body
    // header
    include ./commons/header.pug
    // container
    include ./commons/container.pug
    // footer
    include ./commons/footer.pug
```

注：因为这里使用了pug的语法，所以要使用`pug`依赖包，它实现的是pug语法到html的转换，而`pug-loader`只是起到了一个加载解析的作用，所以使用前，我们要执行如下的安装命令：

```
yarn add -D pug pug-loader
```

因为pug不仅可以使用包含，还可以使用集成，扩展，迭代和混合的特性，可以让我们随心所欲的对html实现模块化，所以深受开发者的喜爱。它们的具体使用可参考[pug 官方文档](https://pug.bootcss.com/language/includes.html)。

具体示例可参考[webpack3.x multi-page](https://github.com/lvzhenbang/webpack3.x-multi-page)的源代码。

本篇文章要介绍的内容，到这里是真的结束了。当然，还有很多东西没有说完，如果需要可关注后续的文章。

