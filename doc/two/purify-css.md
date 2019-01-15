## webapck4.x 移除构建输出的`*.css`文件中，未使用的css选择器

本文接续自[webapck4.x 压缩构建输出](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/two/compress.md)。

有一个[`purifycss`](https://github.com/purifycss/purifycss#purifycss)的开源项目，它实现了如何移除未被使用的`选择器`。而在[`webpack-contrib`]有一个插件[`purifycss-webpack`](https://github.com/webpack-contrib/purifycss-webpack)。

首先，安装`purifycss-webpack`和`purify-css`依赖，命令如下：

```
yarn add purifycss-webpack purify-css --dev
```

然后，像下面这样修改`webpack.config.js`，代码如下：

```
...
plugins: [
  ...
  new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, '*.html')),
  })

]
...
```

最后，运行`npm run build`，`/dist/A.css`代码如下：

```
body{background:red}
/*# sourceMappingURL=A.css.map */
```

而相对与构建前的`mduleA.css`中的代码，少了许多。

注: `purifycss-webpack`的`pptions.paths`需要匹配引用`*.css`的文件。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-16)