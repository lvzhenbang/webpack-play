## 打包实践 (commonschunkplugin)

### 主要内容

讲解了如何使用webpack内置的 `CommonsChunkPlugin` 插件来提取webapck之间的公共代码，开发中常见的有两种形式：`common` 和 `vendor` 。

`common` ： 一般情况下，提取的是自定义代码模块间的公共代码（共用的自定义代码）。

`vendor` ： 一般情况下，提取的是自定义代码模块间的公共代码（共用的第三方库）。

具体说明请参考：

[webpack 插件 commonschunkplugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/commonschukplugin.md)

### 运行项目

```
yarn // 安装项目所需依赖

npm run test // 开发模式

npm run build // 生产模式
```


### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv
