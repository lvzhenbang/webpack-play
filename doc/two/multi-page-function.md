# 构建多页面应用——优化

构建多页面应用的过程中，需要优化代码的结构。而优化代码的结构，往往会使用函数化编程。可参考[webpack4.x-demo](https://github.com/lvzhenbang/webpack4-demo)。

在进行多页面应用编程的过程中，`webpack.config.js`的代码规模会随着项目规模的增加而增加。

而造成`webpack.config.js`文件增大的原因，主要是从`entry`，`plugins`的配置，而造成`plugins`增加是`html-webpack-plugin`和`webpack-spritesmith`的使用。因为每增加一个页面，就需要增加一个`entry`和实例化的`html-wepback-plguin`，而每增加一个`雪碧图`就要使用一个`webpack-spritesimth`。

为了更好的展示`多页面应用`的开发，我将近期优化的一个项目的部分代码整理了一下。[`演示地址`](http://39.105.223.81:8083/)，源代码参考文章结尾提供的地址。

## 项目结构的改动

为了方便发布，需要调整一下项目的目录结构。需要把`assets`文件夹提取到根目录下，这个文件包含了项目所有的资源文件，如果放在`src`目录下，会造成路径问题，如：图片、字体。如果不调整，会造成在开发的模式下可以访问到的路径，而在生产模式下不能访问。

所以，为了保证开发模式和生产模式下静态资源的路径一致，需要这样的调整。

注：如果用vue做过开发的话，相信你就会明白，使用`vue-cli`生成的项目，在根目录下有一个`static`文件夹，它用来保存项目开发的过程中引用到的所有的静态资源，而本文中介绍的示例中的`assets`文件夹有类似的作用，这个文件夹后续还会继续优化。

## entry

首先，为了简化开发中的重复定义，添加了`pages/utils/nav.js`和`pages/utils/subnav.js`文件。它们用来存放项目各页面的路由和seo优化所需要的信息。代表每个页面的结构如下：

```
[
  {
    href: '/',
    text: '首页',
    name: 'index',
    meta: {
      'description': '这是首页',
      'keywords': 'webpack, multi-page, 首页',
      'author': 'https://github.com/lvzhenbang/'
    }
  ...
]
```

然后，根据需要新添加了一个`multipage.config.js`文件，在这里定义了如何生成一个`entry`，代码如下：

```
const path = require('path')
let navs = require('./pages/utils/nav')
const subnavs = require('./pages/utils/subnav')

navs = navs.concat(subnavs)

// entry
let entry = {}
for (let nav of navs) {
  entry[nav.name] = './pages/' + nav.name + '.js'
}

// commons css/js
entry.other = ['./pages/utils/commons.js', './pages/utils/css.js']
```

## plugins

`plugins` 包含两部分。

第一部分，`html-wepback-plugin`，修改`multipage.config` 代码如下：

```
···
// make pages
const HtmlWebapckPlugin = require('html-webpack-plugin');
let plugins = []
for (let nav of navs) {
  plugins.push(new HtmlWebapckPlugin({
    /* inital page */
    filename: nav.name + '.html',
    chunks: [nav.name, 'other'],
    /* page head */
    title: nav.text,
    meta: nav.meta,
    favicon: path.resolve(__dirname, 'assets/favicon.jpg'),
    template: path.resolve(__dirname, 'pages/' + nav.name + '.pug'),
    minify: true
  }))
}
```

第二部分，`webpack-spritesimth`生成`雪碧图`，修改`multipage.config.js`，代码如下：

```
...
// sprites 
const SpritesmithPlugin = require('webpack-spritesmith');
const sprites = require('./pages/utils/sprites')

for(let sprite of sprites) {
  plugins.push(new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'assets/imgs/sprites/' + sprite + '/'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(__dirname, 'assets/imgs/other/' + sprite + '-sprite.png'),
      css: path.resolve(__dirname, 'assets/css/' + sprite + '/' + sprite + '-sprite.scss')
    },
    apiOptions: {
      cssImageRef: '../../imgs/other/' + sprite + '-sprite.png'
    }
  }))
}
```

根据项目需要，需添加`pages/utils/sprites.js`文件，它用来保存要合成的`雪碧图`的名字，这个名字也是合成雪碧图所需的图片所在的文件夹名字。

这个文件比较简单，用来导出一个字符串数组。

注：至于为什么只用一个字符串数组，[`构建多页面应用——静态资源`](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/multi-page-assets.md)这篇文章可以说明。


## 引用`multipage.config.js`

在`webapck.config.js`文件中引用`multipage.config.js`，代码如下：

```
...
const multipage = require('./multipage.config')

let entry = multipage.entry,
    plugins = multipage.plugins

module.exports = (mode) => {
  ...
  return {
    entry: entry,
    ...
    plugins: plugins.concat([
      new MiniCssExtractPlugin({
        filename: isDev ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash].css',
        chunkFilename: isDev ? 'assets/css/[id].css' : 'assets/css/[id].[contenthash].css'
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'assets/imgs/other/'),
          to: path.resolve(__dirname, 'dist/assets/imgs/other/'),
          ignore: ['.*']
        }
      ])
    ])
  }
}
```

当然，你可以考虑使用[`webpack-merge`](https://www.npmjs.com/package/webpack-merge)。

## 源代码

[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)