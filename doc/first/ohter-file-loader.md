## file-loader & url-loader

我们在开发中还需要处理诸如图片，字体等文件，等非css的文件，我们一般用file-loader，但是uril-loader的可以限制文件的大小，同时url-loader内部集成file-loader。

### file-loader

`file-loader` 安装命令

	npm install file-loader --save-dev

`module.js` 文件修改如下：

```
var $ = require('jquery');
require('./iconfont/iconfont.css');
require('./module.css');
module.exports = function() {
	// document.write('hello world');
	document.write('using webpack.config.js');
	// watch 监听文件是否变化，变化重新打包
	
	// 引入第三方库
	$('<div/>').addClass('my-box')
		.html('webpack 引入第三方库。')
		.appendTo($('body'));

	// 引入第三方字体 iconfont
	$('<p/>').addClass('iconfont')
		.html('webpack 引入第三方字体。')
		.appendTo($('body'));

	$('<i/>').addClass('icon iconfont icon-all').appendTo($('body'));
}
```

`module.css` 文件修改如下：

```
.my-box {
    width: 200px;
    height: 30px;
    color: #fff;
    border: 1px solid #ccc;
    background: url('./bg.jpg') center center;
}

.icon{
  font-size: 42px;
  line-height: 100px;
  margin: 10px 0;
  color:#333;
  -webkit-transition: font-size 0.25s ease-out 0s;
  -moz-transition: font-size 0.25s ease-out 0s;
  transition: font-size 0.25s ease-out 0s;

}
.icon:hover{
  font-size: 100px;
}
```

修改`webpack.config.js` 文件，代码如下：

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
	      {
	        test: /\.css$/,
	        use: ['style-loader', 'css-loader']
	      }, 
	      // 添加 file-loader 的处理引用文件路径问题
	      // 具体 file-loader 使用可参考 https://www.npmjs.com/package/file-loader
	      {
	        test: /\.(png|jpg|gif)$/,
	        use: [{
	            loader: 'file-loader',
	            options: {
	              name: '[path][hash].[ext]', // 指定编译文件的文件名格式
	              outputPath: 'img/' // 指定编译后文件的目录
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

`file-loader` 还可以处理 svg, 字体等文件，要想处理这些类型的文件我们只需要修改过滤规则即可，代码如下：

```
...

{
    test: /\.(png|svg|jpe?g|gif|woff|eot|ttf)$/, // 添加要处理的'svg'，和字体类型'woff'/'eot'/'ttf'
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

处理css文件中引用的图片和字体，我们还可以使用 `url-loader` ，它的特点是可以将处理后的文件被转化为 `DATAURI` ，同时对要处理的文件的大小有限制。这对处理小图片有好处，减少应用中的HTTP请求。

所以，为什么有了 `file-loader` 后， `url-loader` 还是这么受欢迎。

### url-loader

`url-loader` 安装命令

	npm install url-loader --save-dev

由于 `url-loader` 的特点，一些项目都喜欢将字体图标和svg这种小的图片用它来处理。由于 `url-loader` 的内部内置了 `file-loader` ，所以，当我们使用 `url-loader` 编一本见识，如果文件长出 `limit` 参数限制， `url-loader` 会将参数传递给内部的 `file-loader` ，因此我们在开发时只要安装  `url-loader` 即可。  

修改`webpack.config.js` 文件，代码如下：

```
...
// 添加 url-loader 的处理引用文件路径问题
// 具体 url-loader 使用可参考 https://www.npmjs.com/package/url-loader
{
    test: /\.(jpe?g|woff|svg|eot|ttf)(\?.)?$/, 
    use: [{
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: '[path][hash].[ext]',
            outputPath: 'img/'
        }
    }]
}
...

```


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-2)
