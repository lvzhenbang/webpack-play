## 引入第三方库

一般情况下，我们不用担心所使用的第三方库，在npm管理仓库中找不到。

如果需要某一个库，如：jquery，可以直接运行`npm install jquery`脚本命令来安装这个项目所需要的依赖；

然后，在使用jquery的模块文件中，通过`import $ from 'jquery'`或者`var $ = require('jquery')`来引入。


这是常用的在`webpack构建的项目`中引入第三方库的方式。

注：为了更好的演示示例代码，示例是在[`nodemon`](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/nodemon.md)这篇文章的基础上操作的。

但是，在不同的场景下，对`webpack构建的项目`有不同的需求:

## 项目的体积足够小(cdn)

如果是webapck的处理方式，可参考[`webapck——实现构建输出最小`](https://github.com/lvzhenbang/webpack-play/tree/master/doc/two/mini-size.md)这篇文章。

使用非webapck的处理方式，如：CDN。

操作也很简单，如果使用`html-webpack-plugin`直接在模板文件`template/index.html`中引入某个cdn（如：boot CDN）上的某个第三方库（如：jquery），参考代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>third party</title>
</head>
<body>
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</body>
</html>

```

然后，在`module.js`中使用`jquery`即可，参考代码如下：

```
require('./module.css');
module.exports = function() {
	$(document.body).append('<h1>hello webpack</h1>')	
}
```

最后，运行`npm run test`，构建结束后，你会在浏览器中看到`hello webpack`字样，背景是红色的页面效果。


## 全局环境下使用第三方库（provide-plugin or imports-loader）

为了避免每次使用第三方库，都需要用`import`或者`require()`引用它们，可以将它们定义为全局的变量。

而webpack的`ProvidePlugin`内置的插件，可以解决这个问题。详情可参考[ProvidePlugin](https://github.com/lvzhenbang/webpack-play/tree/master/doc/first/provide-plugin.md)这篇文章的介绍。


避免于cdn引用的jquery冲突，这里使用`lodash`。

首先，安装`lodash`依赖，命令如下：

```
yarn add lodash --dev
```

然后，在`webpack.config.js`中，添加如下代码：

```
new webpack.ProvidePlugin({
		_: 'lodash'
}),
```

其次，在`module.js`中添加如下代码：

```
...
var arr = [1, 2, 3, 4, 5 ,6];
// provide-plugin
$(document.body).append('<h1>' + _.concat(arr, '~') + '</h1');
...
```

最后，运行`npm run test`脚本命令，构建完成后，你就可以浏览器的页面中增加了`1,2,3,4,5,6,~`。

如果，你想指定`lodash`的某个工具函数可以全局使用，如：`_.concat`，

首先，像下面这样修改`webapck.config.js`，代码如下：

```
...
new webpack.ProvidePlugin({
		// _: 'lodash',
		_concat: ['lodash', 'concat']
}),
...

```

然后，修改`module.js`，代码如下：

```
...
var arr = [1, 2, 3, 4, 5 ,6];
// provide-plugin
// $(document.body).append('<h1>' + _.concat(arr, '~') + '</h1');
$(document.body).append('<h1>' + _concat(arr, '~') + '</h1');
...
```

如果不喜欢用插件的，也可以考虑使用`import-loader`，它也可以实现相同的目的。

为了避免不必要的干扰，可以使用`underscore`来演示。

首先，安装`imports-loader`依赖，命令如下：

```
yarn add imports-loader --dev
```

然后，安装`underscore`依赖，命令如下：

```
yarn add underscore
```

其次，在`webapck.config.js`中添加如下代码：

```
...
module: {
		rules: [
				{
						test: require.resolve('underscore'),
						use: 'imports-loader?_=underscore'
				},
				...
		]
},
...
```

注：`underscore`和`lodash`都是用的是单例的模式开发的，它们实例化的构造函数的名字都是`_`，为了作区分，需要对其中一个做一下改变。`imports-loader`对这个标识起别名有点儿困难，而`provide-plugin`则没有这个问题，可以定一个个性化的别名。

修改`webpack.config.js`，代码如下：

```
new webpack.ProvidePlugin({
		// _: 'lodash',
		// _concat: ['lodash', 'concat'],
		__: 'lodash'
}),
```

可以为`lodash`定义为`__`与`underscore`的`_`作区分。

然后，修改`module.js`，代码如下：

```
...
// provide-plugin
// $(document.body).append('<h1>' + _.concat(arr, '~') + '</h1');
// $(document.body).append('<h1>' + _concat(arr, '~') + '</h1');
$(document.body).append('<h1>' + __.concat(arr, '~') + '</h1');
...
```

最后，保存所有的文件，可以下浏览器中看到相似的结果（保存后，nodemon自启动浏览器）。


## cdn与external

之前遇到了一些`external`的问题，为什么要说，是因为很多人不明白它到底用来干什么的。


场景再现：

之前，有一个项目使用了`jquery`，由于这个库的比较经典，它在应用的各个模块中被频繁引用。使用的方式如下：

```
import $ from 'jquery'
```

或者

```
var $ = require('jquery')
```

结果是构建结束后，文件比较大。那么考虑使用`cdn`，如上文描述的那样。这样需要删除`import`或`require`的引用，同时删除安装的`jquery`依赖，但是由于项目结构比较乱，模块比较多，为了避免造成少改或者漏改的问题，会造成应用出错。该怎么办呢？

有的人说，不删除`jquery`依赖，那么使用`cdn`的目的就没有意义了。而使用`external`则可以解决这个问题。

可以在`module.js`文件中添加如下代码：

```
...
var $ = require('jquery')
...
```

然后，保存文件，发现构建输出提示如下的错误：

```
ERROR in ./module.js
Module not found: Error: Can't resolve 'jquery' in 'E:\workspace\me\webpack-play\demo\example-1'
 @ ./module.js 3:0-23
 @ ./main.js
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./main.js
```

模块`module.js`中的`jquery`不能被解析。

紧接着，在`webpack.config.js`中添加如下代码：

```
```
externals: {
		jquery: 'jQuery',
		jquery: '$'
},
```
```

其中`jquery`代表的是`require('jquery')`中的`jquery`，而`jQuery`和`$`代表的是`jquery`这个库自身提供的可是实例化的标识符。其它的库的cdn化，修改类似`jquery`。

但是，如果在项目一开始就决定用`cdn`的话，就不要在使用`jquery`的模块中，使用`var $ = require('jquery')` 或 `import $ from 'jquery';`，虽然这样做不会报错，但是如果出于某方面的考虑，后期可能会引入`jquery`依赖，那么就必须使用`var $ = require('jquery')` 或 `import $ from 'jquery';`。

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-1)
