# 构建多页面应用——单个页面的处理

在看这篇文章之前，需要你对`构建多页面应用`有一定的基础认识，如果没有的话，可以先参考这篇文章[webpack 构建多页面应用](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/multi-page.md)。

多页面应用是由一个个独立的页面组成。因此，细粒度的处理一个个单页面是`构建单页面框架`之后的一个重要实现。

因为所涵盖的知识点较碎，所以就不按照页面的位置结合组成元素来讲，如：head, body, script等。这里主要介绍head。因为script操作其实就是上一篇文章中已经介绍过的js操作，而body因为内容较多，需要另起一篇文章。

## 页面的头部

在[上一篇文章](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/multi-page.md)中，我们讲述了如何用`html-webpack-plugin` 生成一个html文件，其中使用了两个配置项`chunks`，`filename`，前者指代页面所要引入的js模块，也就是我们常见的html页面中的`<script src="..."></script>`形式，后者指代文件的名字。

那么，在这一部分，要说的就是如何给不同的页面配置生成不同的页面`<head>...</head>`。我们都知道页面头部包括`title`、`link/style`、`meta`、`script` 这四部分组成，尤其前三者居多。

当然，在web前端开发中js很强大，我们可以用js直接控制，在不同页面的入口js文件中写相应的js代码。

这种方法虽然可行，但维护起来比较麻烦，当你修改的时候，你需要查找一个个页面。

相对来讲，使用`html-webpack-plugin`提供的配置项，会使你的开发工作变得简单起来。

## `html-webpack-plugin` 插件的配置项

`title` 选项可以为页面指定名字，`meta` 选项可以为页面指定html文档关联信息，如：描述，作者等，`favicon` 可以为页面添加一个小图标。 修改 `webpack.config.js`，代码如下：

```
...
nnew HtmlWebapckPlugin({
  /* inital page */
  filename: 'index.html',
  chunks: ['index'],
  /* page head */
  title: 'index',
  meta: {
    'description': '这是首页',
    'keywords': 'webpack, multi-page, 首页',
    'author': 'https://github.com/lvzhenbang/
  },
  favicon: './assets/19884132.jpg'
})
...
```

这样头部常用的三个元素我们已经解决了两个。那么接下来就是解决`link`这个元素的。

注：有一个比较特殊的就是html页面图标`<link rel="shortcut icon" href="19884132.jpg">` ，我们使用 `html-webpack-plugin` 插件的 `favicon` 选项已经解决。

## `link` 和 `style` 部分的处理

这两个元素常常被用来处理样式。`link` 处理外部样式，`style` 处理内联样式。

注：很多人会误解，或曲解，这里的样式处理是这样的：在定义的页面入口文件，或者页面入口文件引用的文件中，引入css文件，webapck会将这些样式以内联的形式或者`link`的形式注入到生成的html页面中。

这样我们的应用的目录结构就变成如下这样（本片文章使用如下的目录结构，它也介绍了各个js文件对css文件的引用）：

├── src
  │   ├── common            // 公用的模块
  │   │  ├── a.js           // 引用了a.css
  │   │  ├── b.js           // 引用了b.css
  │   │  ├── c.js           // 引用了c.css
  │   │  ├── d.js
  ├── assets               // 静态资源
  │   ├── 19224132.jpg     // 用来做页面图标
  │   ├── css
  │   │  ├── a.css
  │   │  ├── b.css
  │   │  ├── c.css
  │   │  ├── main.css
  │   │  ├── abutus.css
  │   ├── uttils            // 工具
  │   │  ├── load.js         // 工具代码load.js
  │   ├── index.js          // 主模块index.js (包含a.js, b.js, c.js, d.js)，引用了main.css
  │   ├── aboutUs.js	      // 主模块aboutus.js (包含a.js, b.js)，引用了main.css, aboutus.css
  │   ├── contactUs.js      // 主模块contactus.js (包含a.js, c.js)，引用了main.css
  ├── webpack.config.js     // css js 和图片资源
  ├── package.json
  ├── yarn.lock


> 处理为内联样式

如果是webpack3.x 推荐使用 `css-loader`，`style-loader`，`extract-text-webpack-plugin`；如果是webapck4.x推荐使用的 `css-loader`, `mini-css-extract-plugin`。

webpack3.x与webapck4.x都一样，修改`webpack.config.js`如下：

```
...
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
},
...
```

因为`mini-css-extract-plugin`是专门为webpack4.x设计的，如果webapck3.x使用它会报错。

> 处理为外部链接（link）

webpack3.x中`webpack.config.js`修改如下：

```
...
const ExtractTextPlugin = require('extract-text-webapck-plugin')
...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    ...
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
```

webpack4.x中`webpack.config.js`修改如下：

```
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
...
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    ...
    MiniCssExtractPlugin()
  ],
```

从js文件中分离出css文件，webpack3.x借助于`extract-text-webpack-plugin`，webpack4.x借助于`mini-css-extract-plugin`，前者给不同的css代码块命名需要在`extract-text-webapck-plugin`的示例中配置，它使用的是内置的`CommonsChunkPlugin`插件的拆分原则，后者不需要配置分离css代码块的名字选项，后者借助于`SplitsChunkPlugin`插件的拆分原则。

所以，它们的分离形式与js代码块一致。

webpack3.x为每个入口点生成了一个css文件，并提取了它们的公共代码生成了一个新的css文件；webapck4.x为每个入口生成了一个css文件，并提取并生成了这些文件相互之间的公共文件（它和前者不同，后者更精细化，只要是某一个或者几个文件有公共代码就提取出来，然后生成新的文件）。

为什么将css文件和js文件分的这么细？是因为这样可以显著的减小首次加载页面时请求文件的大小（lazyload），但是这样做会增加HTTP的请求次数。

在多页面应用的过程中，有的人喜欢将所有的css放在一个或两个文件中，而不是像本文中那样为每个页面生成一个css文件，包括它们之间的共用文件。但在多页面应用中，这样精密的细分也有其好处。

相对来说，使用`CommonsChunkPlugin`拆分的css模块更合理些，而使用`SplitsChunkPlugin`拆分的css模块，则过于细化。

至于如何取舍，还需要根据实际情况来定。

当然，这里面还有一些小的问题需要优化，后期我会视情况来写相应的文章描述。

## 源代码

[webpack3.x multi-page](https://github.com/lvzhenbang/webpack3.x-multi-page)

[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)
