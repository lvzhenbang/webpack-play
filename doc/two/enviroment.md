## 如何判断是那种开发模式

在webapck常用的模式有两种`development`和`production`模式。

在开发模式下，为了提升开发的效率，节约构建时间，不需要对`css`，`js`，`img`以及`font`等做优化处理（如：压缩，代码分离，tree-shaking，图片优化等），而只在生产模式下，执行这些操作。

你可以有如下选择：

* [cross-env](https://github.com/kentcdodds/cross-env#cross-env-)，开发者都比较熟悉的。
* [minimist](https://github.com/substack/minimist#minimist)，相对于`cross-env`它更轻量级，[`vue-cli v3.x`](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/package.json#L54)支持使用它。
* 当然，你也可以将webpack升级到webapck4.x它支持三种模式`development`、`production`、`none`。
