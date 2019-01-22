## 打包实践 (webpack-bundle-analysis) 

### 主要内容

对构建输出进行分析，这样有利于排查错误，对构建结果进行优化。

具体说明请参考：

[webapck-bundle-analysis](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/webapck-bundle-analysis.md)

### 运行项目

```
npm run stats:dev // 生成开发模式下的stats

npm run stats:build // 生成生产模式下的stats

npm run stats // 可视化（浏览器）查看构建分析结果
```

注：`stats`包含了构建的输出过程中的所有信息。可参考官方[`options.stats`](https://webpack.js.org/api/cli/#stats-options)。

### LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-1-11 present, Zhenbang Lv
