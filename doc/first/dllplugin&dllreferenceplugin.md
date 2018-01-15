## DllPlugin & DllReferencePlugin

它们两个的配合使用可以加快包构建的速度。

### DllPlugin

用 `DllPlugin` 生成一个 `manifest.json` 映射关系图。

在 `webpack.config.js` 中修改如下：

```
{
    entry: {
        A: ['./moduleA.js'],
        B: ['./moduleB.js'],
        C: ['./moduleC.js'],
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]"
    },
    // watch: true
}, 
```


### DllReferencePlugin

用 `DllReferencePlugin` 根据 `manifest.json` 映射关系图进行文件打包。

在 `webpack.config.js` 中修改如下：

```
{
    entry: {
        A: ['./moduleA.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/A-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}, 
{
    entry: {
        B: ['./moduleB.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/B-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}, 
{
    entry: {
        C: ['./moduleC.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/C-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}
```

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-7)

