### webpack中eslint使用

首先，要使webpack支持eslint，就要要安装 `eslint-loader` ，命令如下:

	npm install --save-dev eslint-loader

在 `webpack.config.js` 中添加如下代码：

```
{
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: "pre",
    include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }
}
```

注：formatter默认是stylish，如果想用第三方的可以安装该插件，如上方的示例中的 `eslint-friendly-formatter` 。

其次，要想webpack具有 eslint 的能力，就要安装eslint，命令如下：

	npm install --save-dev eslint

最后，项目想要使用那些eslin规则，可以创建一个配置项文件 '.eslintrc.js'，代码如下:

```
module.exports = {
	root: true,	
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	rules: {
	    "indent": ["error", 2],
	    "quotes": ["error", "double"],
	    "semi": ["error", "always"],
	    "no-console": "error",
	    "arrow-parens": 0
	}
}
```

这样，一个简单的webpack引入eslint已经完成了。

这里讲一下 `eslintrc.js` 的配置使用，详细细节请参考[http://eslint.cn/docs/user-guide](http://eslint.cn/docs/user-guide)

### eslint 配置项

* root 限定配置文件的使用范围
* parser 指定eslint的解析器
* parserOptions 设置解析器选项
* extends 指定eslint规范
* plugins 引用第三方的插件
* env	指定代码运行的宿主环境
* rules 启用额外的规则或覆盖默认的规则
* globals 声明在代码中的自定义全局变量

在我们使用eslint时，`配置文件中的` rules 配置项是否是不可或缺的？

答案是肯定的。不过我们也可以不用自定义reules，我们可以使用第三方的，这里我们就要使用extends配置项。

#### extends

我们可以使用eslint官方推荐的，也可以使用一些大公司提供的的，如：aribnb, google, standard。

在开发中我们一般使用第三方的。

#### 官方推荐

只需在 `.eslintrc.js` 中添加如下代码：

```
extends: 'eslint:recommended',
extends: 'eslint:all',
```

了解详情可以参考一下[官方规则表](http://eslint.cn/docs/rules/)

#### 第三方分享

使用第三方分享的，我们一般需要安装相关的插件代码如下：

```
npm install --save-dev eslint-config-airbnb // bnb
npm install --save-dev eslint-config-standard // standard
```

在 `.eslintrc.js` 中添加如下代码：

```
extends: 'eslint:google',
// or
extends: 'eslint:standard',
```

使用这些第三方的扩展，有时我们需要更新一些插件，比如standard：

[eslint-plugin-import](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/first/imgs/eslint-1.png)

不要慌，我们只要按照错误提示一步一步的安装这些插件即可。

虽然，这些第三方的扩展很不错，但是有时我们需要定义一些比较个性化的规则，我们就需要添加 `rules` 配置项。

#### 配置规则


在`.eslintrc.js` 文件中添加 `rules`, 代码如下：

```
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

"semi" 和 "quotes" 是 ESLint 中 规则 的名称。第一个值是错误级别，可以使下面的值之一：

* "off" or 0 - 关闭规则
* "warn" or 1 - 将规则视为一个警告（不会影响退出码）
* "error" or 2 - 将规则视为一个错误 (退出码为1)

这些规则一般分为两类：

* 添加默认或第三库中没有的
* 覆盖默认或第三库的

我们的项目中可能会有一些其他的文件也需要进行格式规范，如：html, vue, react等，对于这些文件的处理，我们需要引入第三方插件。

#### plugins（html）

安装 `eslint-plugin-html` ，命令如下：

	npm install --save-dev eslint-plugin-html

这个插件将会提醒模块脚本之间模拟浏览器共享全局变量的行为，因为这不适用于模块脚本。

这个插件也可以扩展文件，如：.vue，.jsx

`.eslintrc.js`中，添加如下配置项：

```
settings: {
	'html/html-extensions': ['.html', '.vue'],
    'html/indent': '+2',
},
```

而对于这种用 `eslint-pulgin-html` 扩展的的文件我们可以使用 `eslint --ext .html,.vue src` 进行检测，如果想要在开发中边写边检测，我们可以使用相应文件的loader进行处理。然后执行 `npm run dev` 就可以实现的功能。边写边检测的功能。

在开发中有时根据需要，我们可能在同一个项目不同的目录使用不同的 `.eslintrc.js` 文件，这时我们就需要使用配置项 `root` 。

#### 限定使用范围 (root: true)

如果我们想要在不同的目录中使用不同的 `.eslintrc`, 我们就需要在该目录中添加如下的配置项：

```
{
    "root": true
}
```

如果我们不设置的话，它将会继续查找，知道更目录，如果更目录有配置文件它将会使用根目录的，这样会导致当前配置目录配置无法起作用的问题。

在开发中针对不同的情况我们要使用不同的解析器，而我们常用的就是 `babel-eslint` 。

#### parser（指定解析器）

`babel-eslint` 解析器是一种使用频率很高的解析器，因为现在很多公司的很多项目目前都使用了es6，为了兼容性考虑基本都使用babel插件对代码进行编译。而用babel编译后的代码使用 `babel-eslint` 这款解析器可以避免不必要的麻烦。

`babel-eslint` 安装命令：

	npm install --save-dev babel-eslint

在 `.eslintrc.js` 配置文件中添加如下配置项代码：

```
parser: 'babel-eslint',
```

如果你使用的默认解析器的话，且在代码中使用了浏览器有兼容性的问题的js新特性，使用webpack编译就会出现问题，这时我们一般装最新的eslint或者安装是使用 `babel-eslint` 来解决问题。

### env（环境）

在 `.eslintrc.js` 中添加如下代码：

```
"env": {
    "browser": true, //
    "node": true //
}
```

指定了环境，你就可以放心的使用它们的全局变量和属性。

### global

指定全局变量。

在 `.eslintrc.js` 中添加如下代码：

```
"globals": {
    "var1": true,
    "var2": false 
}
```

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-12)