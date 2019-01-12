## loader处理css扩展语言

css的扩展语言主要有三种，一种是sass，一种是less，另外一种是stylus。

css扩展语言使变得更加强大与优雅。使用它可以帮助开发人员更好的组织和管理样式文件，更高效的开发项目。

css扩展语言让程序员写的更少、更好、更易于维护样式文件。

css扩展语言特色功能：

* 都很好的兼容了css3
* 在css基础上增加了变量及其他功能
* 自定义输出格式

[sass中文文档](https://www.sass.hk/docs/)

[less中文文档](http://lesscss.cn/)

[postcss中文文档](http://postcss.org/)

### sass-loader

要使用 `sass-loader` ，那么首先要创建一个sass文件，下面将 `module.css` 文件名修改成为 `module.scss` ，代码修改如下：

```
.my-box {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
}

.icon {
    margin: 10px 0;
    font-size: 42px;
    line-height: 100px;
    color: #333;
    transition: font-size 0.25s ease-out 0s;
    :hover {
        font-size: 100px;
    }
}
```

然后，在 `module.js` 中应用 `module.scss` 文件：

	require('./module.scss');


紧接着，修改`webpack.config.js` 文件，代码如下：

```
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            // 添加 css-loader 和style-locader 处理css样式文件
            // 具体 css-loader 使用可参考 https://www.npmjs.com/package/css-loader
            // 具体 style-loader 使用可参考 https://www.npmjs.com/package/style-loader
            // 具体 sass-loader 使用可参考 https://www.npmjs.com/package/sass-loader
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
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
执行 `sass-loader` 安装命令：

	npm install sass-loader --save-dev

然后，在控制台输入 `npm run test` ，编译到 `module.scss` 文件会报错，提示不能找到 `node-sass` 模块，说明使用 `sass-loader` 需要依赖于  `node-sass` 模块才能用webpack处理 `*.scss` 文件的。

执行 `node-sass` 安装命令：

	npm install node-sass --save-dev

这样在控制台输入 `npm run test` ，就可以编译 `*.scss` 文件。

注： `sass-loader` 文件处理 `*.scss` 文件，是先将其转换为css文件，按照webpack的从右往左的编译预处理文件，所以 `sass-loader` 要出现在最后的顺序。处理其它扩展css文件的loader与sass一样。

### less-loader

`less-loader` 处理less样式文件与 `sass-loader` 处理sass样式文件类似。

`less-loader` 安装命令：

	npm install less-loader --save-dev

创建 `module.less` 文件，代码修改如下:

```
.my-box {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
}

.icon {
    margin: 10px 0;
    font-size: 42px;
    line-height: 100px;
    color: #333;
    transition: font-size 0.25s ease-out 0s;
    & :hover {
        font-size: 100px;
    }
}
```

然后，在 `module.js` 中应用 `module.less` 文件：

	require('./module.less');

修改 `webpack.config.js` 文件中的

```
{
	test: /\.less$/,
	use: ['style-loader', 'css-loader', 'less-loader']
}
```

同样的 `less-loader` 需要依赖于  `less` 模块才能用webpack处理 `*.less` 文件的。所以不要忘记安装 `less` ：

	npm install --save-dev less

然后，用webpack编译即可。

### stylus-loader

`stylus-loader` 处理less样式文件与 `sass-loader` 处理sass样式文件和 `stylus-loader` 处理stylus样式文件类似。

`stylus-loader` 安装命令：

	npm install stylus-loader --save-dev

创建 `module.stylus` 文件，代码修改如下:

```
.my-box
    width 200px
    height 30px
    border 1px solid #ccc

.icon 
    margin 10px 0
    font-size 42px
    line-height 100px
    color #333
    transition font-size 0.25s ease-out 0s
    &:hover 
        font-size 100px
```

然后，在 `module.js` 中应用 `module.styl` 文件：

	require('./module.styl');

修改 `webpack.config.js` 文件中的

```
{
	test: /\.styl$/,
	use: ['style-loader', 'css-loader', 'stylus-loader']
}
```

同样的 `stylus-loader` 需要依赖于 `stylus` 模块才能用webpack处理 `*.styl` 文件的。所以不要忘记安装 `stylus` ：

	npm install --save-dev stylus

然后，用webpack编译即可。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-3)
