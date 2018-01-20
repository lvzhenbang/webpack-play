## css-loader 和 style-loader

`css-loader` 和 `style-loader` ，都是处理样式的loader，那么它们有什么区别呢？

`css-loader` 可以将样式文件转化为webpack可以处理的js模块，最后编入到bundle文件中，而 `style-loader` 则是将编译过后的css模块进行处理，使浏览器请求时将样式加载到页面的 `head` 标签中。

### css-loader

安装`css-loader` 命令如下；

	npm install css-loader --save-dev 

`css-loader` 是用来处理 `import/require()` 引入的css依赖文件，使用它可以将这些文件解析成 `webpack` 能处理的文件。

新建一个 `module.css` 文件，代码如下：

```
.my-box {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc
}
```

然后，在 `module.js` 中引入 `module.css` 文件，代码如下：

```
var $ = require('jquery');
var css = require('./module.css');
module.exports = function() {
	// document.write('hello world');
	document.write('using webpack.config.js');
	// watch 监听文件是否变化，变化重新打包
	
	// 引入第三方库
	$('<div/>').addClass('my-box')
		.html('webpack 引入第三方库。')
		.appendTo($('body'));
}
```

最后 ，修改`webpack.config.js` 文件，代码如下：

```
module.exports = {
	entry: {
		app: './main.js'
	},
	// 配置loader 处理非js文件
	module: {
	    rules: [
	      {
	        test: /\.css$/,
	        use: ['css-loader']
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

在控制台输入 `npm run test` ，可以看到文件被正常编译，但是在浏览器中打开 `index.html` 发现 并没有我们所希望看到的样式并未出现，这是为什么？因为虽然编译了 `module.css` 文件，但是编译后的css代码并未被页面引用，解决这一问题的我们需要另一个loader，那就是 `style-loader`。

### style-loader


安装 `style-loader` 命令如下；

	npm install style-loader --save-dev

修改`webpack.config.js` 文件，代码如下：

```
module.exports = {
	entry: {
		app: './main.js'
	},
	// 配置loader 处理非js文件
	module: {
	    rules: [
	      {
	        test: /\.css$/,
	        use: ['style-loader', 'css-loader'] // 添加style-loader
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

然后，执行 `npm run test` 编译好文件后，在浏览器中打开 `index.html` 文件就能看到我们所希望的样式。

注：在处理 `module.css` 文件的两个是有先后顺序的，在webpack的 `use: ['style-loader', 'css-loader']` 中，是从有往左来使用两个loader的，根据 `css-loader` 和 `style-loader` 的作用，应该是先编译，然后在执行web页面所需的css的动态插入。

css文件中还可以引入图片，修改 `module.css` 如下：

```
.my-box {
    width: 200px;
    height: 30px;
    color: #fff;
    border: 1px solid #ccc;
    background: url(./bg.jpg) center center;
}
```

然后，执行编译命令 `npm run test` ，发现文件无法编译报错，不能编译 `url('./bg.jpg')` ，这里我们就需要用到另一个loader—— `file-loader` 。


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-2)
