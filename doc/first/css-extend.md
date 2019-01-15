## loader处理css扩展语言

css的扩展语言主要有三种:

* [sass](https://github.com/sass/sass)
* [less](https://github.com/less/less.js)
* [stylus](https://github.com/stylus/stylus)

参考文档：

* [sass中文文档](https://www.sass.hk/docs/)
* [less中文文档](http://lesscss.cn/)
* [stylus参考文档](http://stylus-lang.com/)

### 文件编译

* `sass-loader`过滤出`*.scss`文件并将它转化为js字符串，然后调用`node-sass`将其转化为正常的css语法的字符串；
* `less-loader`过滤出`*.less`文件并将它转化为js字符串，然后调用`less`将其转化为正常的css语法的字符串；
* `stylus-loader`过滤出`*.styl`文件并将它转化为js字符串，然后调用`stylus`将其转化为正常的css语法的字符串；

### 示例demo


初始化`webpack.config.js`，代码如下：

```
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
    },
    devServer: {
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html'
        })
    ]
}
```

创建一个`html-webpack-plugin`所需的模板文件`/template/index.html`，代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>sass less stylus</title>
</head>
<body>
  <div class="sass">sass</div>
  <div class="less">less</div>
  <div class="stylus">stylus</div>
</body>
</html>
```

创建一个`module.css`，定义`index.html`的初始化样式，代码如下：

```
body {
    font-size: 18px;
    background: red;
}
```

然后，在 `main.js` 中，引入 `module.css` 文件，代码如下：

```
import './module.css';
```

最后，在`webpack.config.js`中，添加如下代码：

```
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
},
```

运行`npm run test`脚本命令。由于使用了`nodemon`和`webpack-dev-server`，所以构建完成后，浏览器可以自启动，源文件代码更新保存后，会自动刷新。


### 使用 sass-loader

首先，安装 `sass-loader` 和 `node-sass` 依赖，命令如下：

```
yarn add sass-loader node-sass --dev
```

然后，在根目录下创建`sass.scss`文件，代码如下：

```
.sass {
    color: yellow;
}
```

最后，在`webpack.config.js`中，添加如下代码：

```
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
},
```

保存`webpack.config.js`后，浏览器会自动刷新。

### less-loader

首先，安装 `less-loader` 和 `less` 依赖，命令如下：

```
yarn less-loader less --dev
```

然后，再根目录下创建一个 `less.less` 文件，代码如下:

```
.less {
    color: blue;
}
```

紧接着，在 `main.js` 中，引入 `less.less` 文件：

```
import './less.less';
```

最后，在 `webpack.config.js` 中添加如下代码：

```
{
	test: /\.less$/,
	use: ['style-loader', 'css-loader', 'less-loader']
}
```

保存`webpack.config.js`后，浏览器会自动刷新。

### stylus-loader

首先，安装 `stylus-loader` 和 `stylus` 依赖，命令如下：

```
yarn stylus-loader stylus --dev
```

然后，在根目录下，创建一个 `stylus.styl` 文件，代码如下:

```
.stylus
    color #00ff00
```

紧接着，在 `main.js` 中，引用 `stylus.styl` 文件：

```
import './stylus.styl';
```

最后，在 `webpack.config.js` 中，添加如下代码：

```
{
	test: /\.styl$/,
	use: ['style-loader', 'css-loader', 'stylus-loader']
}
```

保存`webpack.config.js`后，浏览器会自动刷新。


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-3)
