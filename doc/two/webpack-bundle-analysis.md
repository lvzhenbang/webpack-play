## 构建输出分析

这是优化构建输出的重要组成部分。

可以使用`webpack --json > stats.json`脚本命令，输出`webpack`构建过程的每一步信息。

注：添加配置项`--profile`可以用来输出每一步的相关时间；添加`--progress`配置项，可以包含每个阶段花费的时间。

## webapck 分析工具


* [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)：显示的结果是个`块状图`
* [`webpack-chart`](https://github.com/alexkuz/webpack-chart)：显示的结果是个`饼状图`

3D

* [`stellar-webpack`](https://github.com/alexkuz/stellar-webpack)


[`source-map-explorer`](https://github.com/danvk/source-map-explorer)可分析构建输出文件中所包含的源文件所占的比例。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-17)