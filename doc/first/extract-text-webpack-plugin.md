## 从构建输出的js文件中分离出css文件

使用`style-loader`和`css-loader`可以，将css样式以字符串的形式保存在构建输出的js文件中。但是当css样式越来越多的情况下，会造成构建输出的js文件体积迅速增大，为了减小js文件体积，可以考虑将css样式分离出来。

在webpack4.x之前，一直使用`extract-text-webpack-plugin`插件。

提示：本文接续自[css-style-loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/css-style-loader.md)


### extract-text-webpack-plugin

首先，安装`extract-text-webpack-plugin`依赖，代码如下：

```
yarn add extract-text-webpack-plugin --dev
```

然后，修改`webpack.config.js`，代码如下：

```
...
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        ...
        new ExtractTextPlugin("styles.css")
    ]
}
```

最后，运行`npm run build`脚本命令，你就会在`./dist/`目录中，发现一个`styel.css`文件。

### 指定输出的css文件的路径

修改`webpack.config.js`文件，代码如下：

```
...
new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
    }
})
...
```

其中，`[name].css`指定了输出文件的名字，`name`是`entry`点`app`。


运行 `npm run build`脚本命令，就会构建输出`./dist/css/app.css`这样一个css文件。


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-2.3)


### webapck4.x带来的变化

可参考[mini-css-extract-plugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/minicssextractplugin.md)这篇文章。