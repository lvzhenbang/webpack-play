# 压缩lodash

`lodash`作为一个比较常用的前端开发工具集，在使用webpack进行`vendor`分离的实践中，会遇到将整个`lodash`文件分离到`vendor.js`的问题。这样会使`vendor.js`文件变得特别大。

`webpack.config.js`文件代码如下：

```
var path = require('path');

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
        module: { },
        plugins: [ ]
    }
}
```

运行`npm run test`脚本命令，结果如下：

```
Hash: 5d86af7ed04c57cca071
Version: webpack 4.28.4
Time: 5707ms
Built at: 2019-01-11 19:25:04
           Asset       Size  Chunks             Chunk Names
            A.js   1.46 KiB       3  [emitted]  A
            B.js   1.53 KiB       4  [emitted]  B
            C.js   1.54 KiB       5  [emitted]  C
commons~A~B~C.js  132 bytes       0  [emitted]  commons~A~B~C
  commons~A~C.js  238 bytes       1  [emitted]  commons~A~C
       vendor.js   69.7 KiB       2  [emitted]  vendor
Entrypoint A = vendor.js commons~A~B~C.js commons~A~C.js A.js
Entrypoint B = commons~A~B~C.js B.js
Entrypoint C = vendor.js commons~A~B~C.js commons~A~C.js C.js
```

如上面的情况，`vendor.js`文件为`69.7kb`，如果再引用了其他第三方库，文件会更大。

那么，如何在开发的过程中，压缩`lodash`呢？

## babel-loader & babel-plugin-lodash

可以使用`babel-loader`在对`*.js`文件进行解析，然后借助于`babel-plugin-lodash`插件对引用的`lodash`进行类似`tree shaking`的操作，这样就可以去除未使用的`lodash`代码片段。

安装所需依赖：

```
yarn add babel-loader  @babel/core @babel/preset-env babel-plugin-lodash --dev
```

像下面这样修改`webpack.config.js`配置文件：

```
...
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
}
...
```

运行`npm run test`，脚本命令结果如下：

```
Hash: 30def5521978552cc93d
Version: webpack 4.28.4
Time: 3249ms
Built at: 2019-01-11 21:25:23
           Asset       Size  Chunks             Chunk Names
            A.js   1.46 KiB       3  [emitted]  A
            B.js   1.53 KiB       4  [emitted]  B
            C.js   1.54 KiB       5  [emitted]  C
commons~A~B~C.js  132 bytes       0  [emitted]  commons~A~B~C
  commons~A~C.js  226 bytes       1  [emitted]  commons~A~C
       vendor.js  502 bytes       2  [emitted]  vendor
Entrypoint A = vendor.js commons~A~B~C.js commons~A~C.js A.js
Entrypoint B = commons~A~B~C.js B.js
Entrypoint C = vendor.js commons~A~B~C.js commons~A~C.js C.js
```

`vendor.js`文件从`69.7kb`降至`502bytes`。

根据[`babel-plugin-lodash`](https://www.npmjs.com/package/babel-plugin-lodash)参考文档介绍，使用[`lodash-webpack-plugin`](https://www.npmjs.com/package/lodash-webpack-plugin)可以进一步压缩`lodash`。
   

### lodash-webpack-plugin

安装`lodash-webpack-plugin`依赖：

```
yarn add lodash-webpack-plugin --dev
```

修改`webpack.config.js`配置文件如下：

```
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

...
plugins: [
    new LodashModuleReplacementPlugin,
]
...
```

运行`npm run test`脚本命令，结果如下所示：

```
Hash: 30def5521978552cc93d
Version: webpack 4.28.4
Time: 2481ms
Built at: 2019-01-11 21:07:23
           Asset       Size  Chunks             Chunk Names
            A.js   1.46 KiB       3  [emitted]  A
            B.js   1.53 KiB       4  [emitted]  B
            C.js   1.54 KiB       5  [emitted]  C
commons~A~B~C.js  132 bytes       0  [emitted]  commons~A~B~C
  commons~A~C.js  226 bytes       1  [emitted]  commons~A~C
       vendor.js  502 bytes       2  [emitted]  vendor
Entrypoint A = vendor.js commons~A~B~C.js commons~A~C.js A.js
Entrypoint B = commons~A~B~C.js B.js
Entrypoint C = vendor.js commons~A~B~C.js commons~A~C.js C.js
```

`vendor.js`依然是`502 bytes`，问题不在`loadsh-webpack-plugin`，它虽然会进一步优化`lodash`，但是在无法进一步优化的情况下，它也没办法。

一般情况下，不使用`lodash-webpack-plugin`就可以满足开发的需要，但是文件特别大的情况下，建议还是使用它。


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-13)