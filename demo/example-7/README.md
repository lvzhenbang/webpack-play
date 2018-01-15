## 打包实践 (dllplugin&dllreferenceplugin)

dllplugin 和 dllreferenceplugin 可以拆分打包的文件，提升构建的速度。

### 主要内容

讲解了 `DllPlugin` 插件要实现入口文件组的文件的一个 `manifest.json` 的关系映射文件：

讲解了 `DllReferencePlugin` 插件可以根据 `manifest.json` 的预编译依赖进行打包。

具体说明请参考：

[webpack 插件 DllPlugin & DllReferencePlugin](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/dllplugin&dllreferenceplugin.md)

### 运行项目

```
npm install 安装依赖

npm run test 打包编译
```


### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv
