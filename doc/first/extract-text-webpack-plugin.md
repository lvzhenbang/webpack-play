## 从构建输出的js文件中分离出css文件

使用`style-loader`和`css-loader`可以，将css样式以字符串的形式保存在构建输出的js文件中。但是当css样式越来越多的情况下，会造成构建输出的js文件体积迅速增大，为了减小js文件体积，可以考虑将css样式分离出来。

在webpack4.x之前，一直使用`extract-text-webpack-plugin`插件。


### extract-text-webpack-plugin

首先，安装`extract-text-webpack-plugin`依赖，代码如下：

```
yarn add extract-text-webpack-plugin --dev
```