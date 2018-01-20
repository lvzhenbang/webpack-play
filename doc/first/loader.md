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

### 常用loader

[css-loader & style-loader 的联系与区别](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/css-style-loader.md)

[其它常见处理css扩展语言的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/css-extend.md)

[postcss一个处理css模块的插件平台](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/postcss.md)

[处理图片，字体等资源所需要的loader](https://github.com/lvzhenbang/webpack-learning/tree/master/doc/ohter-file-loader.md)

### 特殊的loader

[babel-loader 让ES6转化为ES5]()
