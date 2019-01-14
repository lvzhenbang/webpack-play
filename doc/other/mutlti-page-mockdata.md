# 构建多页面应用——优化(二)

最近，一直尝试使用webpack做多页面应用的开发。并且一个实际的项目为原型，实现对一个静态的企业站进行优化。原站点[地址](http://www.sjcf.com.cn/)，测试站点[地址](http://39.105.223.81:8083)。

如果想要做一个自己个个人博客，或者企业官网来说，有一定的参考意义。

## webpack的`resolve.alias`

在做模块化开发的过程中，有一个需要解决的问题就是引用模块的路径问题。

注：在webpack中，每一个文件（不管是js，css, html，还是图片等）都被称之为一个块。

为了实现模块化，细粒度化的控制，往往会将代码块分成为不可分割的块，这样做虽然方便了管理控制，但是也会造成项目的文件嵌套很严重，再饮用的时候需要格外小心路径，同时也会造成开发者的负担（抛开其他不讲，但从技术角度来说，对于开发人员来说，能用一行代码解决的问题，绝不用两行，能少输入一个单词就少输入一个）。

而webpack的`resolve.alias`可以为指定路径的字符串起别名。在本文所使用的示例，这样定义别名：

```
...
resolve: {
  alias: {
    '@': path.join(__dirname, '..', 'pages/'), // 根目录
    '@css': path.join(__dirname, 'assets/css/'), // css
    '@img': path.join(__dirname, 'assets/imgs/'), // picture
    // '@font': path.join(__dirname, 'assets/fonts/'),
    '@data': path.join(__dirname, 'pages/data/'), // mock data
    '@utils': path.join(__dirname, 'pages/utils/') // snippets code
  }
},
...
```

当然，上面的别名并不是万能的，有一个问题就是`background-iamge` 和 `font-face` 的使用`url()`会有一些问题，`url()`中的路径必须是字符串，暂时没有好的办法解决。

但是使用`sass`，可以定义变量，可以通过变量来指定路径，但是要严格控制引用变量模块的文件的目录，在本文所使用的示例中，统一将应用变量文件`assets/css/path.scss`的文件，控制在两个层级。具体可参考所提供源代码中的具体使用。

## 模拟数据

实际的项目没有使用任何一种语言的后端代码，更不用说数据库。全部使用的是模拟数据。

为了方便管理维护项目的模拟数据，将项目的所有数据统一整理到了[示例](https://github.com/lvzhenbang/webpack4.x-multi-page)的[`pages/data`](https://github.com/lvzhenbang/webpack4.x-multi-page/tree/master/pages)目录下。

## 静态资源图片的处理

第一优化的时候，就简单的讲了下，如何使用[imagemin](https://github.com/imagemin)提供的插件，来实现对常见类型（*.jpg，*.png，*.gif）图片的处理。

### 第一种引用图片的方案

之前做单页面应用开发的时候，喜欢将所有的图片优化处理后统一放在一个目录中，然后将它们放在服务器中，最后在开发或生产环境中，使用绝对路径进行访问。

这种方式的好处是不用担心相对路径造成的路径问题。但是缺点是，操作起来不方便，尤其是开发环境。因为你不知道项目究竟要使用多少的静态资源，尤其是使用哪种静态资源。

这种方式在团队合作的项目中，比较常见，但是对于提升团队的效率并不明显。

### 第二种引用图片的方案

所以，对于开发者来说，如果如果需要什么静态资源，就放在自己的本地目录，这样可以随心所欲的添加。

在本文所采用的示例中，我做了一些尝试，将所有的图片资源进行了分类。需要转化为base64的图片放一个文件夹[`assets/imgs/base64/`](https://github.com/lvzhenbang/webpack4.x-multi-page/tree/master/assets/imgs/base64)，需要合成雪碧图的单独放在一个文件夹；[`assets/imgs/sprites/`](https://github.com/lvzhenbang/webpack4.x-multi-page/tree/master/assets/imgs/sprites)，为了方便管理合成不同雪碧图的源图片，我又在该目录下创建了子文件夹；而对于`<img src="..." />`要引用的图片的存放使用了两个文件夹，[`assets/imgs/static`](https://github.com/lvzhenbang/webpack4.x-multi-page/tree/master/assets/imgs/static)存放了未经优化的所有的图片，而目录[`assets/imgs/others`](https://github.com/lvzhenbang/webpack4.x-multi-page/tree/master/assets/imgs/others)，存放了所有优化过的图片（包含两部分，一部分是使用`npm run img`命令优化的`assets/imgs/static`目录下的图片，另一部分是`npm run dev`命令优化的雪碧图图片，它的前缀带有`*-sprite`这样的后缀）。

这种方案，使用的是相对路径应用图片。可参考`pages/data/contactus.js`文件的代码：

```
const loadImg = require('@utils/load-img')

module.exports = {
  cn_name: '联系我们',
  en_name: 'CONTACT US',
  img: loadImg('second/contactus-tag.png'),
  ...
}
```

而工具代码片段loadImg的代码如下：

```
module.exports = function(str) {
  return require('@img/other/' + str)
}
```

## 源代码

[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)
