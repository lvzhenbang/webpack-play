## 样式文件中的字体和图片的处理

在[css-style-loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)这篇文章中，已经介绍了如何用webpack处理样式文件。

但是也遗留问题，就是如何处理css样式文件中使用的图片和字体。

进入正文前，现介绍一下初始的配置，它的作用就是为了更好的演示demo。

### 初始化`webpack.config.js`

```
module.exports = {
	entry: {
    app: './main.js'
	},
	output: {
		filename: '[name].js'
	},
	devServer: {
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}

```

使用它，主要是为了在浏览器中演示效果。

具体的使用可参考[html-wepback-plugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/htmlwebpackplugin.md)

下面进入正文。

### url-loader

首先，安装`url-loader` 依赖，代码如下：

```
yarn add url-loader --dev
```

然后，在`webpack.config.js`中添加如下代码：

```
...
,
{
    test: /\.(jpg|png|gif)$/,
    use: 'url-loader'
}
...
```

紧接着，修改`moduleA.css`样式如下：

```
/* @font-face {
  font-family: gb2312;
  src: url(./gb2312.ttf);
} */
body {
  background-color: red;
  color: white;
  font-size: 36px;
  background: url(./bg.jpg) center center;
  /* font-family: gb2312; */
}
```

最后，运行`npm run test`脚本命令，编译完成后会自动打开浏览器，看到有背景图片的效果。

如果此时去掉`moudleA.css`中关于字体的注释，然后保存。你将会在控制台看到如下的错误提示

```
ERROR in ./gb2312.ttf
Module parse failed: Unexpected character ' ' (1:0)
You may need an appropriate loader to handle this file type.
```

解决这个问题，依然可以使用`url-loader`。

首先，在`webpack.config.js`中添加如下代码：

```
...
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: 'url-loader'
},
...
```

然后，重启`npm run test`脚本命令，这样在浏览器中，你就会看到`hello wepback.`字体改变了。

注：在开发的过程中，如果遇到频繁的修改`webpack.config.js`，然后需要频繁的重启`npm run test`脚本命令，可以参考[nodemon](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/nodemon.md)这篇文章的介绍。

## url-loader处理图片和字体的原理及使用它引起的问题

执行`npm run build`脚本命令，构建输出的文件都放在`./dist/`中，但是在这个目录中，并没有，发现图片文件和字体文件，只有`app.js`和`index.html`文件。`index.html`文件中没有关于图片和字体的任何信息。那么图片和字体肯定都在`app.js`中，通过观察会发现它们以[`base64`](http://stephenscaff.com/articles/2013/09/font-face-and-base64-data-uri/)的形式存在`app.js`文件中。

下面，先看一下，执行`npm run build`后的构建输出信息，如下：

```
Hash: 4b92c47686331064859e
Version: webpack 3.12.0
Time: 1478ms
     Asset       Size  Chunks                    Chunk Names
    app.js    5.59 MB       0  [emitted]  [big]  app
index.html  179 bytes          [emitted]
```

令人不可之心的是，`app.js`文件竟然有`5.58 MB`，这么大的文件，肯定会影响web应用的性能。

问题随之而来。那么，针对这么大的`app.js`文件仅使用`url-loader`肯定不行，如果将字体信息和图片信息分离出来，那么一定会减小`app.js`文件的体积；但是在web开发中，这样做会带来新的问题，增加HTTP请求的次数。

好的是`url-loader`有一个`limit`配置，它可以将小于这个选项值的font和picture转换为base64的形式，然后存放放在`app.js`文件中，而大于该选项值的则将图片或字体可以分离出来。


注：`url-loader`依赖于`file-loader`实现对图片或字体的分离。具体使用可参考[file-loaer](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/file-loader.md)这篇文章介绍。

## options.limit

修改`webpack.config.js`代码如下：

```
···
{
    test: /\.(jpg|png|gif)$/,
    use: 'url-loader',
    options: {
      limit: 8912, // 8kb
      name: '[name].[hash].[ext]'
    }
},
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: 'url-loader',
    options: {
      limit: 8912, // 8kb
      name: '[name].[hash].[ext]'
    }
},
···
```

首先，运行`npm run dev`脚本命令，可以在浏览器中看到预期的结果。

然后，运行`npm run build`脚本命令，可以在构建输出的文件夹`./dist/`中看到分离出来的图片和字体文件。

也可以设置`options.limit`的值为`81920`，也就是80kb，因为示例中的图片大小为`51.8kb`，字体为`5.51MB`。然后运行`npm run build`脚本命令（运行这个命令前现清空`./dist/`目录），结果为只有字体分离了出来。


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-2.2.md)