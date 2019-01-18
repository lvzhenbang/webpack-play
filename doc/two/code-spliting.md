# 代码分离

代码分离，也即是`code-spliting`。使用它可以将一个构建输出文件分为多个（webpack默认生成一个文件）。

而实现它，可以从三个方面入手：

* 从`entry`入手，手动的分离代码；
* 使用`CommonsChunkPlugin`来实现提取公共的`common`和`vendor`代码；
* 通过模块的内联函数调用来分离代码，也即是通过`import()`的方式导出引入模块。

## 入口点(`entry`）

首先，在`webpack.config.js`使用多入口的方式配置，参考代码如下：

```
entry: {
  A: ['./moduleA.js'],
  B: ['./moduleB.js'],
  commons: ['./commons.js']
}
```

注：在单页面应用中一个入口点，代表一个分离文件，同时也表示一个或几个功能的集合。其中`A`指代功能模块一，它使用了两个业务逻辑`./chunks/a1.js`，`chunks/a2.js`；其中`B`指代功能模块二，它使用了三个业务逻辑`./chunks/a1.js`，`./chunks/a3.js`，`./chunks/a4.js`。这两个公共模块共用了逻辑`./chunks/a1.js`，所以可以新建一个入口点`commons`用来放置这个业务逻辑。如果新增加了功能模块，就需要添加新的入口点，同样新的功能模块和其他功能模块有相似的业务逻辑代码，也需要手动提取到`./common.js`中。

然后，在`html-webpack-plugin`中调用，参考代码如下:

```
plugins: [
  new HtmlWebpackPlugin({
    chunks: ['A', 'B', 'commons'],
    template: './template/index.html'
  })
]
```

最后，运行`npm run build`脚本命令，构建结束后，得到如下的输出信息：

```
   A.a8031dca0f46fed5b436.css   88 bytes       0  [emitted]  A
      A.a8031dca0f46fed5b436.css.map  202 bytes       0  [emitted]  A
           A.a8031dca0f46fed5b436.js   1.06 KiB       0  [emitted]  A
       A.a8031dca0f46fed5b436.js.map   3.05 KiB       0  [emitted]  A
           B.a8031dca0f46fed5b436.js   1.08 KiB       1  [emitted]  B
       B.a8031dca0f46fed5b436.js.map   3.05 KiB       1  [emitted]  B
    coommons.a8031dca0f46fed5b436.js   1.02 KiB       2  [emitted]  coommons
coommons.a8031dca0f46fed5b436.js.map   3.06 KiB       2  [emitted]  coommons
                          index.html  479 bytes          [emitted]

```

但这样做并不能很好的体现`多入口点`的好处。如果入口点儿过多，应用的`http`请求增加，同时手动管理起来比较麻烦。在做单页面应用时，入口点要有意义，否则就不要创建新的入口点。如果做多页面应用的话，使用起来很顺手，因为可以为每个页面创建一个入口点，可参考[webpack4.x-multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)这个实例。

[参考源代码](https://github.com/lvzhenbang/webpack-play/tree/master/demo/example-10)


## `CommonsChunkPlugin` Vs `SplitChunkPlugin`

在`webpack`中，一个入口点就是一个`chunk`，而`webpack`就是通过`chunk`来决定输出。

而在开发中，最常见的就是`common`，`vendor`两个入口点，其中`common`可省略，`vendor`指定第三方库。

在webpack4.x之前，通过使用`CommonsChunkPlugin`就可以实现自动的代码分离。之后，通过`splitChunks`。

可分别参考[`CommonsChunkPlugin`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/commonschunkplugin.md)和[`SplitChunkPlugin`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/splitchunkplugin.md)

注：实际应用中，主要使用`main`、`vendor`、`base`三个入口点。其中`mian`放置`nav`、`banner`这些主要的信息，或者只放首页要显示的信息；`vendor`放第三方库信息，`base`则放其他信息。

## 动态导入

注：可以使用`require.ensure()`，也可以使用`import()`。因为`require.ensure()`是webapck特有的，而`import()`是`ES2015`语法支持的。

为了方便演示，首先要在`./template/index.html`中，添加如下代码：

```
···
<button>click it</button>
··
```

然后，在`module.B`中，添加如下的代码：

```
import a3 from './chunks/a3.js';
// import a4 from './chunks/a4.js';

document.write('moduleB.js');

a3();
// a4();
document.querySelector('button').addEventListener('click', function() {
  getModule().then(a4 => {
    // a4.info()
    console.log(a4.add(2, 3))
  })
}, false);

async function getModule() {
  const module = await import('./chunks/a4.js');
  return await import('./chunks/a4.js');
}
```

注：其中，`async-await`来解决回调。

紧接着，运行`npm run dev`脚本命令，构建完成后，在启动的浏览器中，打开`控制台`，然后点击`click it`按钮，会在`控制台`看到数字`5`。

构建输出信息如下:

```
Hash: 12f421b51c2cb9ea3148
Version: webpack 4.28.4
Time: 1459ms
Built at: 2019-01-18 16:03:50
                               Asset       Size  Chunks             Chunk Names
           0.12f421b51c2cb9ea3148.js  294 bytes       0  [emitted]
       0.12f421b51c2cb9ea3148.js.map  271 bytes       0  [emitted]
          A.12f421b51c2cb9ea3148.css   88 bytes       1  [emitted]  A
      A.12f421b51c2cb9ea3148.css.map  202 bytes       1  [emitted]  A
...
[3] ./commons.js + 1 modules 230 bytes {3} [built]
    | ./commons.js 58 bytes [built]
    | ./chunks/a1.js 172 bytes [built]
[4] ./chunks/a4.js 110 bytes {0} [built]
```

注：`0.12f421b51c2cb9ea3148.js`文件就是`./chunks/a4.js`分离出来的文件，`[4] ./chunks/a4.js 110 bytes {0} [built]`说明了这点儿。

## import 兼容性考虑

`import()`使用的是`ES2015`语法，为了兼容性考虑需要，使用`babel`的插件`@babel/plugin-syntax-dynamic-import`。

注：该示例只需使用下面两个依赖即可。`babel`的具体使用可参考[babel](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/babel.md)。

首先，安装`@babel/core`, `@babel/plugin-syntax-dynamic-import`依赖，命令如下：

```
yarn add --dev @babel/core @babel/plugin-syntax-dynamic-import
```

然后，在配置文件中，添加如下代码：

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            plugins: ['@babel/plugin-syntax-dynamic-import']
        }
    }
}
```

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-10)