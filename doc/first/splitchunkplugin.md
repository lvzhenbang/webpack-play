## 提取共享模块  (splitChunkPlugin)

在webpack4.x之前，提取公共模块代码可以使用webpack的内置插件`commonsChunkPlugin`，但是自从webapck4.x开始，由内置`splitChunkPlugin`替代了。

## 为什么用splitChunkPlugin

相对于`commonsChunkPlugin`来说，`splitChunkPlugin`的优势更为明显。

### commonsChunkPlugin

它默认可以提取所有模块之间的公共代码，如果这些模块中有一个模块没有公共代码，那么它们的公共模块即为空，可以通过`minChunks`指定提取的是几个模块之间的公共代码（最少是2个）。但是它的特点是：

* 将提取的代码放在了一个文件中，如果公共代码比较大这是一个问题，如果是做多页面应用，需要每个页面只加载自己所需要的代码，这是一个问题，但问题还不大；
* 如果要实现按需加载（lazy-load）减少页面首次请求文件的大小，加速首屏页面的渲染，那么它就不是那么好用了。

### splitChunkPlugin

如果要实现首屏加速渲染，可以将任意两个模块之间公共的代码提取出来，然后放入一个文件块内。`commonsChunkPlugin`虽然能实现提取任意两个模块之间的代码，但是它不能将它们提取出来放入一个单独的文件中。而`splitChunkPlugin`则可以。

它的配置代码如下：

```
optimization: {
  splitChunks: {
    chunks: 'all', // 生成的模块支持那种加载模式。`all`支持异步和同步，`async`支持异步， `inital`支持同步。
    maxInitialRequests: 20, // 入口的并行最大请求数
    maxAsyncRequests: 20, // 按需加载的最大并行请求数
    minSize: 40, // 生成文件块的min大小
    maxSize: 80 // 生成文件块的max大小
  }
  ...
}
```

当然，我们也可以指定生成的公共模块的名字，由于`splitChunkPlugin`实现的是任意两个模块之间公共代码的提取于分离，所以，它模块的命名要特别慎重，不然很容易出现名字冲突。默认使用`entry`的别名拼接。如果入口点有 `app`, `hello`，`work`三个，并且它们每两个之间都有公共代码，那么就会生成`app~hello.js`，`app~work.js`，`hello~work.js`这样三个公共代码文件块。

## cacheGroups

`cacheGroups`选项可以实现对文件模块的细粒度控制。

如自定义公共模块和vendor（第三方库）模块的处理。

```
optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: 'all',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            }
        }
    }
},
```

它实现和上面配置相似的功能（提取公共模块的代码，并分离到独立的文件中）。

下面的代码实现提取`vendor`（第三方库）的代码：

```
optimization: {
    splitChunks: {
        ...
        vendor: {
					test: /node_modules/,
					chunks: "all",
					name: "vendor",
					priority: 10,
					enforce: true
				}
    }
},
```

最终输出结果如下：

```
Hash: 5d86af7ed04c57cca071
Version: webpack 4.28.4
Time: 5707ms
Built at: 2019-01-11 19:25:04
           Asset       Size  Chunks             Chunk Names
            A.js   1.46 KiB       3  [emitted]  A
            B.js   1.53 KiB       4  [emitted]  B
            C.js   1.54 KiB       5  [emitted]  C
commons~A~B~C.js  132 bytes       0  [emitted]  commons~A~B~C
  commons~A~C.js  238 bytes       1  [emitted]  commons~A~C
       vendor.js   69.7 KiB       2  [emitted]  vendor
Entrypoint A = vendor.js commons~A~B~C.js commons~A~C.js A.js
Entrypoint B = commons~A~B~C.js B.js
Entrypoint C = vendor.js commons~A~B~C.js commons~A~C.js C.js
```


可参考[构建多页面应用](https://github.com/lvzhenbang/webpack4.x-multi-page)