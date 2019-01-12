### postcss-loader

上一篇文章介绍了css的几种扩展语言的loader，这几种扩展语言也是在开发中我们经常遇到，所以熟悉它的了解如何用webpack处理这几种扩展语言的文件很有必要，那么 `postcss-loader` 它是个什么东东，在webpack中我们能用它来干什么呢？

正如有的人说的那样，它就是一个处理css样式文件平台，这个平台拥有各种各样的处理css样式文件（包括css的扩展语言文件，如：sass，less，stylus）的js插件工具。它支持css变量和mixins，这两个东西我们的css扩展语言也支持，如我们所熟知的添加浏览器前缀（atuoprefixer），内联图片，当然还有一些其他的优秀功能，目前PostCSS已经拥有200多个插件。

### 语法

在webpack中使用 `postcss-loader` 来实现 PostCSS的功能。

我们使用 `sass-loader` 处理sass扩展语言源代码文件，就是将他转换为js形式的sass代码片段，`postcss-loader` 使用 `postcss` 插件可以将这个sass代码片段转化标准的sass代码片段，然后交给 `css-loader` 处理，转化为webpack可处理的css代码片段。这里的 `postcss-loader` 就是起到了一个标准化的作用，这个标准化可以打消我们对各个浏览器兼容性的担忧问题。就如同它的 `autoprefixer` 添加各个浏览器的前缀一样。

### sugarss

post提供第一种语法 'sugarss' ，它使用类似于sass的扩展语法。

安装 `sugarss` 插件：

    npm install --save-dev sugarss

创建一个 `module.sss` 文件，代码如下：

```
.my-box
    width: 200px
    height: 30px
    border: 1px solid #ccc

.icon
    width: 200px
    height: 200px
    margin: 10px 0
    font-size: 42px
    line-height: 100px
    color: #333
    transition: font-size 0.25s ease-out 0s

.icon:hover
    font-size: 100px

```

然后，在 `module.js` 中引入 `module.sss` 文件，在 `module.js` 添加如下代码：

	require('module.sss');

修改 `webpack.config.js` 配置文件如下：

```
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.sss/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'sugarss' // 处理类sass的样式源文件
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

最后，运行 `npm run test` 命令即可。

### scss

PostCSS还提供了sass扩展语言标准化的插件 `postcss-scss` 插件，它用来将 `sass-loader` 处理过的sass源文件代码进行标准化处理。

安装 `postcss-scss` 插件：

    npm install --save-dev postcss-scss

创建一个 `module.scss` 文件，代码如下：

```
.my-box {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
}

.icon {
    width: 200px;
    height: 200px;
    margin: 10px 0;
    font-size: 42px;
    line-height: 100px;
    color: #333;
    border: 1px solid #ccc;
    transition: font-size 0.25s ease-out 0s;
    &:hover {
        font-size: 100px;
    }
}

```

然后，在 `module.js` 中引入 `module.scss` 文件，在 `module.js` 添加如下代码：

	require('module.scss');

修改 `webpack.config.js` 配置文件如下：

```
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss' // scss标准化处理
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

最后，运行 `npm run test` 命令即可。

在PostCSS中语法这个功能很强大，但是现在在项目中使用的并不多，但在社区很活跃，相信将来会有很多人使用。


### PostCSS常用插件

PostCSS中我们也有一些常用的插件如 'autoprefixer'，'postcss-sprites'，以及 'cssnano' 插件。

#### autoprefixer 

可以给一些样式属性添加不同浏览器的前缀，如：transition。

安装 `autoprefixer` 命令如下：
    
    npm install --save-dev autoprefixer

首先修改 `module.scss` 文件代码如下：

```
.my-box {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
}

.icon {
    width: 200px;
    height: 200px;
    margin: 10px 0;
    font-size: 42px;
    line-height: 100px;
    color: #333;
    border: 1px solid #ccc;
    transition: font-size 0.25s ease-out 0s;
    &:hover {
        font-size: 100px;
    }
}
```

修改 `webpack.config.js` 配置文件如下：

```
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss', // scss标准化处理
                            indent: 'postcss',
                            plugins: [
                                require('autoprefixer')(), // 引入autoprefixer
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

然后，执行编译命令 `npm run test` 

我们发现我们的css部分属性将会自动添加前缀，但是我们发现查看不方便还要打开浏览器在控制台中才能看到，所以，我们使用一个webpack插件 `extract-text-webpack-plugin`, 将最终便宜的css提取出来，单独放在一个文件中。当然这个插件的作用不是为了方便查看，它是为了方便资源的加载，而非是将所有的web应用资源都打包到js文件中，这样不方便加载，会让页面加载特别慢影响用户体验效果。

#### extract-text-webpack-plugin

安装命令：

    npm install --save-dev extract-text-webpack-plugin

修改 `webpack.config.js` 配置文件如下：

```
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 1.引入 'extract-text-webpack-plugin' 插件

module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({ // 2.标记要分离的 '*.scss' 类型文件
                    fallback: 'style-loader', 
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                parser: 'postcss-scss', // 标准化 sass
                                indent: 'postcss',
                                plugins: (loader) => [
                                  require('postcss-cssnext')(),
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    // 3. 添加插件配置项
    plugins: [
        new ExtractTextPlugin('[name].css'), // 定义生成的文件
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}
```

在以前的基础上在 `webpack.config.js` 配置文件中添加3处修改即可以打包分离出要独立引用的css文件。

然后，在 `index.html` 使用link即可引入独立打包生成的css文件：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>example-4</title>
    <link rel="stylesheet" href="app.css"> // 引入独立打包的css文件
</head>
<body>
    <script src="https://code.jquery.com/jquery-1.11.3.js"></script>
    <script src="./app.js"></script>
</body>
</html>
```

最后，在浏览器中打开然后，在 `index.html` 即可看到效果。

#### cssnano (压缩css代码插件)

安装命令：

    npm install --save-dev cssnano

修改 `webpack.config.js` 配置文件如下：

```
...

use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                parser: 'postcss-scss', // 标准化 sass
                indent: 'postcss',
                plugins: (loader) => [
                  require('postcss-cssnext')(), // cssnext中集成有 'autoprefixer'
                  require('cssnano')() // css代码压缩插件
                ]
            }
        },
        'sass-loader'
    ]
})
...
```

只要在 `post-loader` 的 option 中增加 `require('cssnano')()` 即可，

运行打包命令 `npm run test` 即可实现css代码的压缩。

当然webpack还提供了其它压缩css代码和js代码的插件，这些内容将在下一节中介绍。

#### postcss-sprites

PostCSS提供的插件还能够处理图片，将其转换为雪碧图，这在我们的开发中也是比较常见的，这里我们要借助插件 `postcss-sprites` 我们就可以将雪碧图自动合成。

`postcss-sprites` 安装命令：

    npm install --save-dev postcss-sprites

在 `module.scss` 文件中添加如下代码：

```
...

.icon-add {
    background-image: url('./images/l-add.png');
    background-repeat: no-repeat;
}

.icon-basic {
    background-image: url('./images/l-basic.png');
    background-repeat: no-repeat;
}

.icon-blda {
    background-image: url('./images/l-blda.png');
    background-repeat: no-repeat;
}

.icon-callback {
    background-image: url('./images/l-callback.png');
    background-repeat: no-repeat;
}

.icon-camera {
    background-image: url('./images/l-camera.png');
    background-repeat: no-repeat;
}

.icon-card {
    background-image: url('./images/l-card.png');
    background-repeat: no-repeat;
}

.icon-cart {
    background-image: url('./images/l-cart.png');
    background-repeat: no-repeat;
}

.icon-close {
    background-image: url('./images/l-close.png');
    background-repeat: no-repeat;
}
```

在 `module.js` 文件中添加如下代码：

```
...
// sprite
$('<div/>').addClass('icon icon-callback')
    .css({
        'width': '70px',
        'height': '70px'
    })
    .appendTo($('body'));

$('<div/>').addClass('icon icon-add')
    .css({
        'width': '44px',
        'height': '44px'
    })
    .appendTo($('body'));
...

```

在 `webpack.config.js` 文件中添加如下代码：

```
...
use: [
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            parser: 'postcss-scss', // 标准化 sass
            indent: 'postcss',
            plugins: (loader) => [
                require('postcss-sprites')(), // 将小图片生成雪碧图
                require('postcss-cssnext')(),
                require('cssnano')(),
            ]
        }
    },
    'sass-loader'
]
...

```

然后，我们执行编译命令 `npm run test` 即可。

结果我们发现，雪碧图是生成了，文件为'sprite.png'，但是我们在控制台却发现报了url的问题，错误提示为无法找到 'sprite.png' 在指定的目录中，但是我们在项目根目录中发现了有这个文件。这里我们需要使用 `file-loader` ，这个file-loader我在[如何使用 loader 处理非js文件（上）](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/loader.md)，

我们这里只要安装  `file-loader` ，执行如下命令；

    npm install --save-dev file-loader

在 `webpack.config.js` 文件中添加如下代码：

```
...
{
    test: /\.png$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[path][hash].[ext]',
            outputPath: 'img/'
        }
    }]
}
...

```

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-4)
