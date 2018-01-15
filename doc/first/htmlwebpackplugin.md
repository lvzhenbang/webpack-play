## htmlwebpackplugin

可以生成简单的html文件，也可以使用hml模板，

### 配置项

安装 `html-webpack-plugin` 插件：
	
	npm install --save-dev html-webpack-plugin


在 `webpack.config.js` 文件开始引入 `HtmlWebpackPlugin` 插件；

const HtmlWebpackPlugin = require('html-webpack-plugin');


在 `webpack.config.js` 的 `plugins` 中添加：

new HtmlWebpackPlugin({
	title: 'webapck-demo', // 设置文件的title
	filename：'index.html' // 设置文件名字
	template: './template/index.html', //使用模板
})

[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-6)
