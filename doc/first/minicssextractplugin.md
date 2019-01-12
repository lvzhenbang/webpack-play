# MiniCssEtractPlugin

在webpack4.x中，推荐使用的`mini-css-extract-plugin`插件，用它可以实现将`*.css`从构建生成的js文件中分离出来。

## MiniCssExtractPlugin.loader

在`mini-css-extract-plugin`插件中封装了`style-loader`的实例，它的作用就相当于`style-loader`，然而却不尽相同。

### 初始化`wepback.config.js`

`webpack.config.js`的配置文件代码如下:

```
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
        },
        mode: mode,
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        optimization: {
            usedExports: true,
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['lodash']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin()
        ]
    }
}
```

`html-webpack-plugin`的使用可参考[html-wepback-plugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/htmlwebpackplugin.md)这篇文章。

`optimization`配置项可参考[SplitChunkPlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/splitchunkplugin.md)和[babel-plugin-lodash](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/ldashwebpackplugin.md)这两篇文章。


### 使用`mini-css-extract-plugin`分离出css文件

首先，安装`mini-css-extract-plugin`依赖：

```
yarn add mini-css-extract-plugin --dev
```

然后，在项目根目录定义一个`moduleA.css`样式文件，代码如下：

```
body {
  background: red;
}
```

其次，在`mouduleA.js`中引入`moduleA.css`样式文件，代码如下：

```
import './moduleA.css'
...
```

紧接着配置`webpack.config.js`文件，代码如下：

```
...
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
        ]
      },
      ...
    ]
},
plugins: [
  ...
  new MiniCssExtractPlugin()
]
...
```

这样，就成功地分离样式到一个单独的文件中。

### inline的样式

其实就是实现样式保留在js文件中，当html被请求时，再将样式内联到html文件的`head`元素中。

以前，使用的是`style-loader`，来实现这个功能。那么这里能否使用`MiniCssExtractPlugin.loader`呢？

答案是不能实现。

还是需要使用`style-loader`。


在开发模式下为了较少构建的时间，使用HMR，需要使用`style-loader`，所以一般需要判断`mode`是否为开发模式。

在webpack4.x中可以接受脚本命令带的参数`--env production`。

在`webpack.config.js`文件可以接受`mode`参数，参考代码如下：

```
module.exports = mode => {
    let isDev = mode !== 'production' ? true : false; // 判断是否为开发模式

    return {
        ...
        mode: mode, // 配置是那种模式的配置文件
        ...

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
                ...
            ]
        },
        plugins: [
            ...
            new MiniCssExtractPlugin()
        ]

    }
}
```

这样就可以在webpack4.x中轻松的`*.css`。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-15)