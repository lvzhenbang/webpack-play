## 多页面应用创建

如何使用webpack创建多页面应用，这是一个我一直在想和解决的问题。网上也给出了很多的例子，很多想法。猛一看，觉得有那么点儿意思，但仔细看也就那样。

使用webpack做页面应用，可以是我们少考虑很多的问题。因为单页面应用只有一个页面，所以考虑问题，解决问题围绕着`中心化`去解决，很多麻烦都迎刃而解。如果你使用过vue.js，那么想必你一定用过vue-router，vuex，它们就是典型的中心化管理模式，当然还有很多，这里不一一列举了。

而多页面应用，我们不能再按照`中心化`模式的路走了，因为行不通，这也是很多人认为多页面应用不好做，或者干脆认为webapck只能做单页面应用，而不能做多页面应用的原因。

所以，我要说明的第一点儿是：不要用做单页面应用的思维来做多页面应用。

## 多页面应用的特点儿

### 单页面中的模块儿共享和多页面的模块儿共享的区别

1. 单页面的模块儿共享，其实是代码块儿在同一个页面的不同位置的重复出现；而多页面应用的代码块儿共享需要实现，不仅是同一个页面的共享，还要做到跨页面的共享。

所以，第一个要解决的问题是：不同页面的代码块儿共享如何实现？

2. 单页面的路由管理，其实是根据用户的触发条件来实现不同的代码块的显隐；而多页面应用的路由管理则不然，它实现的是页面的跳转。

所以，第二个要解决的问题是：所页面应用的导航该如何做？

3. 单页面的状态管理，很受开发者喜好。单页面是一个页面，所以页面中的数据状态的管理操作起来还算得心应手，那么多页面应用的呢，显然依靠它自身很难实现。

所以，第三个要解决的问题是：多页面应用的状态管理如何做？

注：这个问题，问的其实有点儿傻，如果你做的是dom操作的多页面儿应用，就不用做状态管理了。如果你还是使用想vue.js这样的库，你就需要考虑要不要再用做多页面的状态管理了，因为此法儿就是为单页面应用做的，多页面儿行不通。

### 多页面应用的探索

入口（entry）：

webpack对入口不仅可以定义单个文件，也可以定义多个文件。

熟悉当页面应用开发的对于下面的代码应该不会陌生吧？

```
module.exports = {
  entry: './src/index.js',
  ···
}
```

我第一次接触真正的单页面应用项目使用的就是angualrjs，使用的构建工具使`webapck+gulp`，其中的`webpack.config.js` 中的看到的入口文件代码就是它。

后来，接触到的是数组形式，代码如下：

```
module.exports = {
  entry: ['./src/index.js', 'bootstrap']
  ···
}
```

这样，将bootstrap和入口文件一起引用，就可以在任何一个代码块中使用boostrap。

再后来，接触到的是对象形式，代码如下：

```
module.exports = {
  main: './src/index.js'
  ···
}
```

这样做的目的是为了给输出的文件指定特定的名字。

再然后，就是做多页面应用，你可能就需要用到如下的代码：

```
module.exports = {
  entry: {
    index: './src/index.js',
    aboutUs: './src/aboutus.js',
    contactUs: './src/contactus.js'
  }
}
```

为了引入第三方库，我们可以像如下这样做：

```
module.exports = {
  entry: {
    index: ['./src/index.js', 'loadsh'],
    aboutUs: './src/aboutus.js',
    contactUs: ['./src/contactus.js', 'lodash']
  }
}
```

### webpack3.x的探索

但为了共享模块代码，我们需要像下面这这样做：

```
const CommonsChunkPlugin = require('webpack').optimization.CommonsChunkPlugin
module.exports = {
  entry: {
    index: ['./src/index.js', './src/utils/load.js', 'loadsh'],
    aboutUs: ['./src/aboutus.js', 'loadsh'],
    contactUs: ['./src/contactus.js','./src/utils/load.js', 'lodash']
  },
  plugins: [
		new CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js",
			chunks: ["index", "aboutUs", "contactUs"]
		})
  ]
}
```

这样型就会形成如下所示的项目目录结构：

├── src
  │   ├── common            // 公用的模块
  │   │  ├── a.js
  │   │  ├── b.js
  │   │  ├── c.js
  │   │  ├── d.js
  │   ├── uttils            // 工具
  │   │  ├── load.js         // 工具代码load.js
  │   ├── index.js          // 主模块index.js (包含a.js, b.js, c.js, d.js)
  │   ├── aboutUs.js	      // 主模块aboutus.js (包含a.js, b.js)
  │   ├── contactUs.js      // 主模块contactus.js (包含a.js, c.js)
  ├── webpack.config.js     // css js 和图片资源
  ├── package.json
  ├── yarn.lock


但是这个内置插件的局限性比较大。正如上面所使用的那样，它只会提取`chunks`选项所匹配的模块共有的代码块。就如同上面代码表示的那样，它只会提取`pindex, aboutUs, contactUs`共有的代码块`loadsh`，而不会提取`index, contactUs`共有的代码块`load.js`。

当然，一般的第三方库，我们也不这样使用，而是像下面这样使用：

```
const CommonsChunkPlugin = require('webpack').optimization.CommonsChunkPlugin
module.exports = {
  entry: {
    index: ['./src/index.js', './src/utils/load.js'],
    aboutUs: ['./src/aboutus.js'],
    contactUs: ['./src/contactus.js','./src/utils/load.js'],
    vendors: ['lodash']
  },
  externals: {
    commonjs: "lodash",
    root: "_"
  },
  plugins: [
		new CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js",
			chunks: ["index", "aboutUs", "contactUs"]
		})
  ]
}
```

对于web应用最终的目的是：匹配生成不同的html页面。

这里我们要使用的就是`html-webpack-plugin`。

首先，需要安装`html-webpack-plugin`：

```
yarn add --dev html-webpack-plugin
```

然后引入插件，并配置如下：

```
...
const HtmlWebapckPlugin = require('html-webpack-plugin');
...
  plugins: [
		...
    new HtmlWebapckPlugin({
      filename: 'index.html',
      chunks: ['vendors', 'commons', 'index']
    }),
    new HtmlWebapckPlugin({
      filename: 'aboutUs.html',
      chunks: ['vendors', 'commons', 'aboutUs']
    }),
    new HtmlWebapckPlugin({
      filename: 'contactUs.html',
      chunks: ['commons', 'contactUs']
    })
  ],
  ...
```

这样一个个基于webpack3.x的多页面框架就有了基本的样子。

### webpack4.x的探索

而使用webpack4.x则完全不同，它移除了内置的`CommonsChunkPlugin`插件，引入了`SplitChunksPlugin`插件，这个插件满足了我们的需要。

如果你想要解决之前的不足，去提取`index, contacUs`共有的模块，操作起来会很简单。正如上面的所列举的那样，我们有三个入口点`index, aboutUs, contactUs`，`SplitChunksPlugin` 插件会首先获取这三个入口点共有的代码块，然后建立一个文件，紧接着获取每两个入口点的共有代码块，然后将每个入口点独有的代码块单独形成一个文件。如果你使用了第三方库，就像上面我们使用的`loadsh`，它会将第三方入口代码块单独打包为一个文件。

配置文件`webpack.config.js`需要增加如下的代码：

```
···
optimization: {
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: 20,
    maxAsyncRequests: 20,
    minSize: 40
  }
}
···
```

因为`SplitChunksPlugin`可以提取任意的入口点之间的共同代码，所以，我们就不需要使用`vendors`入口节点了。那么，为匹配生成不同的页面代码可以修改成如下：

```
const HtmlWebapckPlugin = require('html-webpack-plugin')
···
    plugins: [
      new HtmlWebapckPlugin({
        filename: 'index.html',
        chunks: ['index']
      }),
      new HtmlWebapckPlugin({
        filename: 'aboutUs.html',
        chunks: ['aboutUs']
      }),
      new HtmlWebapckPlugin({
        filename: 'contactUs.html',
        chunks: ['contactUs']
      }),
    ]
···
```

可以发现结果越来越接近我们所想。但是这里还是存在一个问题，第三方库`loadsh`因为在入口点`index, aboutUs`中被分别引入，但是构建的结果却输出了两个第三方库文件，这不是我们想要的。这个问题怎么解决呢，因为`html-webpack-plugin`插件的`chunks`选项，支持多入口节点，所以，我们可以再单独创建一个第三方库的入口节点`vendors`。配置代码修改如下：

```
...
    entry: {
      index: ['./src/index.js', './src/utils/load.js'],
      aboutUs: ['./src/aboutUs.js'],
      contactUs: ['./src/contactUs.js','./src/utils/load.js'],
      vendors: ['loadsh']
    },
    ...
    plugins: [
      new HtmlWebapckPlugin({
        filename: 'index.html',
        chunks: ['index', 'vendors']
      }),
      new HtmlWebapckPlugin({
        filename: 'aboutUs.html',
        chunks: ['aboutUs', 'vendors']
      }),
      new HtmlWebapckPlugin({
        filename: 'contactUs.html',
        chunks: ['contactUs']
      }),
    ],
...
```

注意：如果不同的入口点儿之间有依赖关系，如上面的`index`和`vendors`之间，因为`index`依赖于`vendors`，所以`vendors`要置于`index`之前。

这篇文章，说到这里基本上已经结束了。当然，webpack多页面应用的知识点还没有讲完，这些内容会放在后续的文章中详解。

### 源代码

[webpack3.x multi-page](https://github.com/lvzhenbang/webpack3.x-multi-page)
[webpack3.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)
