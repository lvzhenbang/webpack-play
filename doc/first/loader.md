## loader

loader 的作用就是将一些webpack不能处理的文件进行编译，然后转变成webpack能够处理的文件。

在讲述loader之前，先来介绍如何在项目中安装webpack，而非在全局环境安装webpack。原因就是在开发中是团队合作，每个人的电脑上的webpack开发环境不一样，为了使项目的环境一致，很多项目都选择在项目中引入webpack。

### 项目中引入webpack

项目目录结构：

```
/eaxmple-2
  |--index.html
  |--main.js
  |--module.js
  |--webpack.config.js
```

内容和example-1一样。下面就介绍不一样的地方。

首先，要使用 'cd' 命令进入要使用webpack的项目根目录，输入如下命令：
	
	npm init

在控制台中会提示你输入项目名称、项目描述，接下来就会提示你打包项目的入口文件，默认是 `main.js` ，如果你的项目命名的入口文件名刚好是这个名字，你直接按回车键即可，否则输入你命名的入口文件名。
紧接着就会提示你输入测试命令，可拷贝项目的地址，项目的关键词，项目的所有者，项目的LICENSE，然后按回车键你将可以看到配置文件预览信息。如果确定输入yes，这样会自动生成一个 `package.json` 文件。

然后，为项目添加 `webpack` 依赖，命令如下：

	npm install webpack --save-dev


最后，在控制台输入如下命令：

	webpack

到了这里可能就要结束了，但细心的同学会留意到在创建 `package.json` 文件中的 `test` 测试命令是什么，我们在做复杂项目时不用使用webpack，可以使用统一风格的 `npm` 命令。

所以，如果在生成 `package.json` 文件过程中，在需要输入 `test command` 的时候，我们输入 `webpack` ，那么我们在控制台输入 `npm run test` 一样可以进行打包。

好了，这样就搞定了在项目中添加webpack依赖。

### css-loader 和 style-loader

#### css-loader

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

#### style-loader


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

[webpack处理非css文件(下)](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/css-extend.md)