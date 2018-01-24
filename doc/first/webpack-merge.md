## 合并配置项对象

在项目的构建工具使用中，我们往往需要将这些配置文件进行分类，但是使用时要有一个入口文件，我们有需要将这些文件进行合并。webpack-merge无疑是一个很好的工具。

我们可以参考一下，vue-cli 生成的包管理配置文件 `webpack.dev.conf.js` ，代码如下：

```
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
....

const devWebpackConfig = merge(baseWebpackConfig, {
  ...
})

```