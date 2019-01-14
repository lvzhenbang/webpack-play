## DefinePlugin

`DefinePlugin`是一个webpack内置插件，允许使用者定义一个或几个全局常量，这个常量可以在`webpack`的`compile`阶段其作用。

## 使用场景

这个常量可以作为一个标记用来区分开发模式和生产模式。

* 需要在开发模式中使用某些调试代码，如：`console.log(...)`，而生产模式不使用
* 需要在开发模式和生产模式使用不同的`webpack.config.js`来提升编译速度

## 示例展示

为了更好的展示demo，本文接续自[nodemon](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/nodemon.md)。

如何区分是在开发模式，还是在生产模式，这个要根据输入的npm脚本命令传递的参数来判断。由于不同的操作系统的`CLI`的差异，[`cross-env`](https://www.npmjs.com/package/cross-env)应运而生，为了避免麻烦，可使用它。

首先，安装`cross-env`依赖：

```
yarn add cross-env --dev
```

然后，修改`nodemon.json`配置文件，使用`cross-env`，代码如下:

```
{
  "verbose": true,
  "watch": "webpack.config.js",
  "exec": "cross-env DEBUG=true webpack-dev-server"
}
```

这样就可以向`process.env`，详情可参考[node.js官方文档 process](https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_env)添加一个`DEBUG`变量。

其次，修改`webpack.config.js`使用`process.env.DEBUG`这个变量，代码如下：

```
var process = require('process');

var isDev = process.env.DEBUG ? true : false;

...
```

因为开发和生产模式对构建输出的要求不同，所以需要对``webpack.config.js`中的`文件名`做如下调整：

```
...
module.exports = {
    ...
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: isDev ? '[name].js' : '[name].[hash].js'
    },
    ...
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 89120, // 8kb
                            name: isDev ? '[name].[ext]' : '[name].[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 89120, // 8kb
                            name: isDev ? '[name].[ext]' : '[name].[hash].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
            ...
        ]
    },
    ...
}
```

紧接着，为了实现在项目的自定义代码模块（如：module.js）中使用`process.env.DEBUG`，需要在`webapck.config.js`配置文件中引入`definePlugin`这个内置插件。

```
...
plugins: [
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    ...
]
```

随后，像下面这样修改`module.js`：

```
...
export default function() {
	if (!__DEV__) {
		document.body.style.backgroundImage = 'url(' + img + ')';
	}
	...
}
```

运行`npm run test` 脚本命令，构建完成后，浏览器会自启动，这时发现显示效果中并没有背景图片，使用调试工具发现字体名字未带`hash`。

重新打开一个`终端命令`运行窗口，运行`npm run build`，构建完成后，会看到`dist/`目录结构如下：

```
│  app.cd7b48b6c006b8ff548d.js
│  index.html
│
└─fonts
        gb2312.8a1e9fe86f7a9489ec091ec4b78af185.ttf
```

然后，将`index.html`拖拽到浏览器（chrome）中，会看到有背景图片的页面。



[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6.5)