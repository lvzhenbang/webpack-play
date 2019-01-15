## webapck4.x压缩构建输出


在webapck4.x中内置了压缩构建输出的`*.js`文件的插件，但是并没有内置压缩`*.css`文件的插件。

webpack5.x将会引入内置的压缩`*.css`的插件。

但是在webapck4.x中，需要手动安装压缩`*.css`的插件，一般使用[`optimize-css-assets-webpack-plugin`](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)插件。

## 示例demo

初始的`webpack.config.js`代码如下：

```
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
        },
        devServer: {
            open: true
        },
        mode: mode,
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        maxInitialRequests: 5,
					    minSize: 0
                    },
                    vendor: {
                        name: "vendor",
                        test: /node_modules/,
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
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
            new HtmlWebpackPlugin({
                chunks: ['commons', 'vendor', 'A']
            }),
            new MiniCssExtractPlugin()
        ]
    }
}
```

首先，安装`optimize-css-assets-webpack-plugin`依赖，命令如下：

```
yarn add optimize-css-assets-webpack-plugin --dev
```

然后，像下面这样修改`webpck.config.js`，代码如下：

```
···

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
···

plugins: [
    ...
    new OptimizeCSSAssetsPlugin({}})
]
```

最后，运行`npm run build`脚本命令，可以在`dist/`目录下看到如下文件：

```
A.css
A.js
A.js.map
B.js
B.js.map
C.js
C.js.map
commons.js
commons.js.map
index.html
vendor.js
vendor.js.map
```

细心的同学一定会发现，没有`A.css.map`。

这里可以为`optimize-css-assets-webpack-plugin`的`options`添加如下的配置项：

```
...
new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
        map: {
          inline: false
        }
    }
}),
...
```

再次运行`npm run build`脚本命令，可以在`/dist`目录下看到`A.css.map`文件。

## 为什么不使用`optimization.minimizer`

如果使用`optimization.minimizer`，需要在`webpack.config.js`中添加如下代码：

```
...
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  ...
}
...
```

因为在`optimization`中，定义`minimizer`，就会重载webapck4.x自带的`*.js`压缩插件，所以必需引入`uglify-webpack-plugin`插件。如果将`new OptimizeCSSAssetsPlugin({})`放在`plugins`中，就可以避免这个问题。

这两种方式，效果一样，前者对webapck4.x的性能，并没有什么影响。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-16)
