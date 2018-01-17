## 模块热替换

### 定义

模块热替换功能会在应用程序运行的过程中实现模块的添加，删除和更新，而无需重新刷新整个页面。

这样明显可以加快开发的速度。

这个功能可以做到如下三点：

1.刷新页面时，保留刷新前的状态；

2.只更新变更的内容；

3.修改样式几乎相当于在浏览器中更改样式。

编译器中处理情况，除了更新普通资源外，编译器还要更新修改保存后被编译的manifest文件和生成的若干chunk。

### 代码实现

安装 `webpack-dev-server`  命令：

	npm install --save-dev webpack-dev-server

在 `webpack.config.js` 中添加 `devServer` 配置项：

```
devServer: {
	port: 8090, // 监听端口，默认8080
    contentBase: path.join(__dirname, './dist/'), // Server会根据浏览器地址栏中的地址，访问 './dist/' 目录下的文件
    https: true, // 可以传入true，支持https访问，反之支持http。
    /*https: {  // 支持https,也可以传入自定义的证书。
        key: fs.readFileSync("/path/to/server.key"),
        cert: fs.readFileSync("/path/to/server.crt"),
        ca: fs.readFileSync("/path/to/ca.pem"), 
    },*/
    inline: true, // 可以监控js变化
    hot: true, // 传入一个Boolean值，通知Server是否启动HTMR
    compress: true, // 传入一个Boolean值，通知Server是否启用gzip
    proxy: {
        "/api": "http://localhsot:3030"
    }
}
```

如果此时我们在控制台输入 `npm run dev` 命令，发现控制台中显示蓝色字体的提示信息，`webpack` 打包的资源与 `webpack-dev-server` 资源路径不一致，也就是说热交换未启动，我们需要启动全局的热交换，具体操作如下：

在 `webpack.config.js` 中引入 `webpack` :

	const webpack = require('webpack');

在 `plugins` 配置项中添加 'HotModuleRepalcementPlugin'，代码如下：

```
 plugins: [
        new webpack.HotModuleReplacementPlugin(), // 使webpack启动全局的 HTMR
        ...
    ],
```

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-9)