## copy-webpack-plugin

[`copy-webapck-plugin`](https://webpack.js.org/plugins/copy-webpack-plugin/)也是webapck构建建工具中比较常用的一个插件。

它的作用是将某个目录下的文件拷贝到另一个目录下（一般是构建输出目录中）。

比较常用的就是将`static`目录下的静态资源，拷贝到构建输出目录`dist/`下。

[url-loader](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/url-loader.md)这篇文章讲述如何处理开发中css中使用到的图片和字体。但是它只是解决了css中的`url(...)`引用，但是对于开发中的`<img src="...">`并没有解决。那么怎么处理这种形式的图片引用呢？

有如下两种解决方式。

> 建立一个保存静态资源的cdn，把所有的静态资源都放置到它上面

使用的时候，使用绝对地址访问静态资源，这样就不会有引用的麻烦。

> 使用`copy-webpack-plugin`将所需的图片拷贝到构建输出目录中

下面的示例接续自[css-style-loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)这篇文章。

首先，在示例的根目录中创建`static`这样一个文件夹，然后在其下放置一个`bg.jpg`文件。

紧接着，在`template/index.html`文件中添加如下代码：

```
<img src="bg.jpg" alt="背景" width="100%" height="auto" style="position: absolute; top: 0; left:0; z-index: -1;">
```

然后，安装`copy-webpack-plugin`依赖：

```
yarn add copy-webpack-plugin --dev
```

像下面这样，修改`webpack.config.js`：

```
...
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    ...
    plugins: [
        ...
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, 'static/'),
              to: path.resolve(__dirname, 'dist/')
            }
        ])
    ]
}
```

运行`npm run build`命令，发现此时`bg.jpg`已经被拷贝到`dist/`目录中了，然后将`index.html`文件拖拽到浏览器（chrome）中，发现图片显示正常。

运行`npm run test`命令，会发现浏览器会自动打开，并显示一样的效果。


## options

可参考[官方文档](https://github.com/webpack-contrib/copy-webpack-plugin#usage)。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6.4)