## provide-plugin

这个插件是webpack的内置插件，我们在引用第三方库到项目中后，为了是第三方库能够全局使用，而不用在每个要使用的文件中用 `import` 或 `require` 引入，这样使用起来更方便。比说我们引入jQuery库，或者在做 `MV*` 这样的项目，引入 `boostrap` ，`bootstrap-tpl` ，或者 `bootstrap-vue` 等库是都需要在项目全局使用用。

### ProvidePlugin

首先，内置插件使用，要在 `webpack.config.js` 中引入webpack:

	const webpack require('webpack');

其次，`ProvidePlugin` 的使用要在 `webpack.config.js` 中的 `plugins` 配置项中加入如下代码：

```
new webpack.ProvidePlugin({
	indetifier: 'module',
	indetifier2: 'module2',
}),
```

我们以jQuery为例：

```
new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
}),
```

### 其它第三方库介绍

#### lodash

安装lodash，

	npm install --save-dev --save lodash

在 `webpack.config.js` 修改如下：

```
// 某一个或几个，如map
new webpack.ProvidePlugin({
  _map: ['lodash', 'map']
})
// 全部
new webpack.ProvidePlugin({
	_ : ['loadsh']
})
```

#### vue

安装vue，

	npm install --save-dev --save vue

在 `webpack.config.js` 修改如下：

```
new webpack.ProvidePlugin({
  Vue: ['vue/dist/vue.esm.js', 'default']
})
```


### angular

安装 angular，

	npm install --save-dev --save angular

在 `webpack.config.js` 修改如下：

```
new webpack.ProvidePlugin({
  angular: 'angular'
})
```


[参考源代码](https://github.com/lvzhenbang/webpack-learning/tree/master/demo/example-8)