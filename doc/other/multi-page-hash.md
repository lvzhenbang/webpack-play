## 构建多页面应用——hash

这里的hash主要从两个方面来说。一个是webpack生成的hash，另一个是页面链接中的hash，如：`http://localhost:8080/ywbk.html#restaurant`中的`#restaurant`。后者在单页面应用的路由处理中经常用到。

## webpack中的hash

webapck每次构建都会生成一个新的hash(主要用于生产环境)。

它的作用就是用来标记构建生成的状态，通常使用的过程中，会将它注入到构建输出（生成）的文件名中。

在`webpack.config.js`文件中的位置如下：

```
...
output: {
  path: path.resolve(__dirname, 'dist/'),
  filename: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash].js',
  publicPath: isDev ? config.devUrl : config.deployUrl
},
module: {
  rules: [
    ...
    {
      include: path.resolve(__dirname, 'assets/imgs/other/'),
      test: /\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: isDev ? '[name].[ext]' : '[name].[hash].[ext]',
            outputPath: 'assets/imgs/'
          }
        }
      ]
    }
    ...
  ]
}
...
plugins: plugins.concat([
  new MiniCssExtractPlugin({
    filename: isDev ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash].css',
    chunkFilename: isDev ? 'assets/css/[id].css' : 'assets/css/[id].[contenthash].css'
  })
  ...
])
```

如果项目是第一次构建，那么所有的静态资源都会被添加同一个hash，当第二构建如果有内容改变，构建生成的文件会被赋予新的hash。为了提高见构建的速度，减少构建生成不必要的文件（如果第一次生成的文件和第二次生成的文件内容相同，那么没必要重新在生成一次）。为此webpack提供了三个hash字段可供选择，分别是hash、chunkhash、contenthash。

* hash：不管内容改变与否，所有的文件都会被重新生成一遍。这是一种粗放的模式。
* chunkhash：它主要针对与webpack配置文件的`entry`中定义的入口文件。
* contenthash: 它主要针对的是webpack构建的过程中，提取(或者说分离)出来的内容，如：`extract-text-webpack-plugin`

针对多页面应用的构建特点，使用`contenthash`是一个不错的选择，本文中所使用的示例[wepbakck4.x-multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)符合这个特点。css的分离，js文件的分离（webpack4的SplitChunk）。

## 为什么要在多页面应用中使用单页面应用的hash来实现路由的控制

![最终的效果](https://github.com/lvzhenbang/webpack-learning/tree/master/imgs/animate.gif)

很明显的一点是传统的多页面应用的业务模块往往会出现多个页面之间会有很多相同内容，这样在单击导航实现路由切换的时候，总是会看到相同的内容，这样会给用户造成一种错觉‘为什么总是同一个页面’。这样的用户体验往往不好。最突出的就是包含二级导航的页面。（可参考[圣捷集团的官网](http://www.sjcf.com.cn/zjsj-sjtz.html)）

单页面应用给我们了一个很好的启示，可以通过将这些页面结构相似的，而只有一部分内容类同的页面组合成为一个页面。

这样做的好处显而易见，减少多页面构建生成的页面数量，我们之构建生成一级和二级页面，以及一些页面结构很少雷同的页面，而不构建生成三级页面。

优化后的[示例地址](http://39.105.223.81:8083/zjsj.html)

具体的实现有两种解决方案。

第一种，在每个页面中使用一个vue（结合vue-router）的示例（也可以使用，react，angular）。

第二种，自己实现对不同`hash`的处理。

注：如果使用hash，在开发的时候一定要模拟一个服务器环境，直接用浏览器打开是无法实现的，浏览器控制台会提示跨域的错误。

本文所使用的示例用的是第二种方案。

具体的实现过程如下：

在生成子导航的模拟数据中添加了一个`type`值。

```
tabs: [
  {
    cn_name: '圣捷投资',
    en_name: 'SHENGJIE INVESTMENT',
    type: 'investment'
  }, {
    cn_name: '董事长致辞',
    en_name: 'CHAIRMANS SPEECH',
    type: 'speech'
  }
  ...
]
```

这样使用`pug-loader`处理生成的html对应的元素中会包含一个`data-type`自定义属性。参考代码如下：

```
<div class="tabs">
  <div class="tab-item active" data-type="finance">
    <div>互联网金融</div>
    <div>ONLINE FINANCE</div>
  </div>
  <div class="tab-item" data-type="allfinance">
    <div>全品类金融</div>
    <div>WHOLE CATEGORY FINANCE</div>
  </div>
  ...
</div>
```

然后，使用JavaScript通过控制触发条件，如url的hash改变，进而控制页面的展示效果。参考代码如下：

```
···
$('.tab-item').on('click', function() {
  var type = $(this).data('type')
  window.location.hash = type
  tab(this, type)
})
···
```

首先，单点击二级导航时，改变url的hash。这样做可以让用户通过操作浏览器的`前进和后退`按钮来控制页面，此外使用浏览器的`前进和后退按钮`的好处是，浏览可以记录页面的状态。（只用上面的代码无法实现想要的效果）

其次，使用`hashchange`这个浏览器自带的监听hash改变的api（他兼容>=ie8的浏览器，所以可以放心使用）。

```
···
$(window).on('hashchange', function() {
  tabcheck()
})
···
```

通过它们，就可以轻松的实现url的`hash`。

为了页面呈现更好的效果，可以给页面添加一个`滚动的动画`，如果不使用`hash`在传统的页面中实现有些棘手。

那么针对页面底部的网站导航，如何结合`hash`来操作页面并实现一致的路由切换效果呢？

这里需要监听页面的`load`状态，在webpack中，使用`commonjs`来组织js代码块，需要注意`window.load(...)`无效的情况。

具体的实现就不一一介绍了，可参考[demo中tabs.js文件的代码](https://github.com/lvzhenbang/webpack4.x-multi-page/blob/master/pages/utils/tabs.js)

## 源代码

[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)