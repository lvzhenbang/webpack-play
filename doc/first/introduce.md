## webpack 是什么？

webpack 既是一个构建系统，也是一个打包工具。

我们可以通过webpack来构建一个前端开发环境，然后并将项目内容进行打包。

## webpack介绍

webpack 是高度可配置的，所以在学习使用前我们需要先理解它的四个核心概念：

* 入口（entry）

它是构建内部依赖图的开始。可以定义一个入口起点，也可以定义多个入口起点。

* 输出（output）

这里输出webpack他所创建的打包文件(bundles)。我们可以通过 `output.filename` 和 `output.path` 来指定打包（bundles）的文件名以及输出路径。

* loader 

它可以让webpack去处理那些非JavaScript文件。使用loader我们将项目中的非JavaScript文件转换为webpack能处理的有效模块，然后用webpack的打包能力，进行文件打包处理。

loader在配置文件中对应model模块对象的的rules属性，这个属性通过它包含的 `test` 和 `use` 分别来识别对应loader能进行转换的文件和将转换的文件添加到以来图中。

* 插件（plugins）

webpack的插件接口功能很强大。

	1.用来打包优化
	2.压缩文件
	3.热交换
	……

使用插件前我们需要用 `require()` 引入该插件，然后将它添加到插件数组中。一个插件，可以被多次引入一个配置文件中，但要用于不同的目的。使用插件我们只需要创建它的一个实例即可，并且可以设置自定义参数。


### 依赖图

webpack 从入口开始递归的创建依赖图，使用loader将一些webpack不能处理的文件转换为webpack能处理的文件添加到依赖图中，最后的出口根据依赖图来进行文件打包，插件在这里起到强化webpack功能的作用。

webpack可以通过如下方式表达模块间的依赖关系。

* import 语句 (ES2015)
* require 语句 （commonJS）
* define 和 require 语句 （AMD）
* @import 语句 （css/sass/less） 
* url(...) 或 `<img src="..." >`

## 其他

我们了解到webpack创建的依赖图是通过遍历各个模块（这些模块是webpack经过了loader的处理）然后形成的。所以所要理解webpack中的模块是什么。在应用开发中，这些模块就是我们编写的代码文件，在这里每个文件都有可靠的抽象和封装，这些模块的存在使得校验、调试、测试变得轻而易举。

webpack支持的模块类型有：

	CoffeeScript
	TypeScript
	ESNext（Babel）
	Sass
	Less
	Stylus
