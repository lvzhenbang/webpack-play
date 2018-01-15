## 提取共享模块  (ComonsChunkPlugin)

`ComonsChunkPlugin` 插件将公共的模块拆分出来独立形成一个文件，在使用时只用加载一次，等到后续文件使用这个公共的文件时只要在缓存中提取即可，这样不用每次都加载公共的部分，对性能提升很有帮助。

由于这个插件是webpack的内置插件，所以我们不需要另行安装。要使用它我们只需如下这样做：

在 `webpack.config.js` 引入webpack;

	var webpack = require('webpack');

然后，添加插件配置项：

```
plugins: [
	new webpack.optimize.CommonsChunkPlugin(options);
]

```

灵活使用 `CommonsChunkPlugin` 的配置项，将实现很多强大的功能。

### CommonsChunkPlugin 的配置项

参考之前的项目，我们将 `webpack.config.js` 修改如下：

```
var webpack = require('webpack'); // 引入webpack

module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    // 添加插件配置
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js'
        })
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

我们只需要在配置中添加 `name` 和 `filename` 就可以实现简单的公共模块的提取。然后在 `index.html` 中添加如下代码：

	<script src="./common.js"></script>

在浏览器中打开就可以看到效果。

在实际的使用中我们发现 `app.js` 和 `common.js` 的顺序又先后之分，我们要想然 `app.js` 文件起效果，就必须先加载这个 `common.js` 。

#### 用一个打包模块指明第三方库

这种使用方式将自己写的应用代码单独打包，第三方库作为公共模块。

`webpack.config.js` 修改如下：

```
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './main.js',
        vendor : ['jquery']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // filename: '[name].js'
            minChunks: Infinity
        })
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

修改两处，一处是在 入口配置项处，添加 `vendor : ['jquery']`，另一处是修改 `CommonsChunkPlugin` 配置，添加 `minChunks` 配置，这个配置可以确保非第三库不会被打包进来。

### 将公共模块打包到父模块中

这种情况在开发中比较常见于多入口文件项目，比如说有c，d，e三个入口文件组成，c文件依赖a1，a3两个文件，d文件依赖a2，a3两个文件，e文件依赖a1，a3，a4两个文件，如果按照一般的打包将会出现文件的重复打包，如果提取公共模块，a3将被添加到公共模块中，而这个公共模块的运行有赖于c，d，e，三个文件。这样会减少文件的大小，也会改善文件的加载时间。

增加配置项：

	children: true,

配置文件修改如下：

```
var webpack = require('webpack');

module.exports = {
    entry: {
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            chilrdren: true,
        })
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

这个配置告诉webpack找到c，d，e三个文件的功能模块，也就是a3。

修改 `webpack.config.js` 如下：

```
var webpack = require('webpack');

module.exports = {
    entry: {
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
    },
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            minChunks: 2
        })
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

这样也可以将c，d，e文件的公共模块提取出来，其中 `minChunks` 指定范围，它的范围是大于2，小于要提取公共模块的模块的数量。
