# 构建多页面应用——静态资源的处理

在之前的系列文章中，我已经介绍了如何用webpack实现`多页面应用`的js，html，css的处理。今天就主要介绍如何处理静态资源，在web开发中最常见的静态资源就是图片。

## 图片的引用方式

而因为在web中，图片有两种主要的引入方式，第一种是`<img src="...">`，第二种是`backgorund-image: url(...)`。前者在html中使用，后者在css中使用。

## web开发中的图片处理

图片常见的类型有jp(e)g，png，gif，包括现在普遍使用的svg以及webp。svg作为矢量图形，有一定的使用场景，而webp作为未来web开发的趋势，有一定的使用场景，比如：爱奇艺中的轮播图（carousel）中就是用webp，但其他的见到的不多。

现在，web开发中使用最多的还是jpg和png，处理他们，在构建工具中使用`url-loader`和`file-loader`就好了，其中file-loader负责图片的拷贝和输出，并会给图片名添加一个hash值。

说到这里，很多人会想到`字体图标`。以前处理web页面中的图标（icon），使用图片来处理，这样会带来一个性能问题就是http请求的增多，这样会造成服务器的负载压力，同时会带来用户体验的问题，因为会出现页面的局部空白和页面重绘的问题，当然一种解决方案使雪碧图（sprite），但是如果图片过大怎么解决，如何对图片进行分解（大变小的问题），图片的拼接比较困难，最要命的是在引用雪碧图时要进行计算，除此之外就是如何对雪碧图的组成图片进行自定义的删减，而使用字体图标这些问题，都会得到一定程度的解决，当然在构建工具中可以使用`webpack-spritesmith`这个插件来处理组成雪碧图的图片。

当然，有些特殊的情况，需要使用`base64`，这里使用`url-loader`即可。

将图片处理为base64有使用场景，将图片转换为雪碧图亦有使用场景，单独的图片处理也有使用场景（这些使用场景的图片大小从左到右依次增大）。

这些场景在一个web项目中都会涉及到。

虽然使用字体图标可以替代雪碧图，因为字体图标有更小的尺寸，更自由的操作手法（如：图标颜色的自定义），但是一个DIY的web项目还是有些图标还是需要雪碧图。

但是，这里有一个问题，如何在一个项目中同时使用base64，雪碧图，字体图标，单独的图片。

## 在构建中如何使用多种图片处理方式

在构建多页面应用中，如何解决呢？

### 字体图标

处理字体图标很简单，如：iconfont（阿里巴巴字体图标库），就像引用css那么简单。

### base64

base64的处理，使用[`url-loader`](https://www.npmjs.com/package/url-loader)。

### 雪碧图

雪碧图的处理，可使用[`webpack-spritesmith`](https://github.com/mixtur/webpack-spritesmith)这个插件

### 单独的图片

使用[`file-loader`](https://github.com/webpack-contrib/file-loader)，它负责拷贝`url-loader`的处理结果，并输出。

上面就是我们常见的图片处理，如果要处理svg可以参考[`svg-url-loader`](https://www.npmjs.com/package/svg-url-loader)，如果要处理webp可以参考[`webp-loader`](https://www.npmjs.com/package/webp-loader)

## 如何对图片进行优化

对图片进行优化，会带来良好的用户体验。

熟悉图片优化的都知道渐进式（progressive），可参考[nuwen.net](https://nuwen.net/png.html)

jp(e)g可以进行`连续性`处理，这样可保证图片数据请求回来多少，就渲染多少，是自上而下的渲染，也是有模糊到清晰的状态。

png可以进行`交叉`处理，这样也可保证图片数据请求回来多少，就渲染多少，它是整体的显示，而且是又模糊状态到清晰的状态。

gif图片一般使用小图，如果是大图会记号浏览器性能，还不如使用视频，或者用css动画来代替。我个人整理了一个[css 动画集](https://github.com/lvzhenbang/css3-animate)，有需要的可以看一下。

在构建多页面应用中，会使用到[`image-webpack-loader`](https://www.npmjs.com/package/image-webpack-loader)来做优化处理。

其中，配置项`options`中的`mozjpeg` 处理jp(e)g图片，`pngquant`处理png图片，`gifsicle`处理gif图片，`webp`处理webp图片。

## 多页面应用中的图片处理

首先，看一下多页面应用中的目录结构图：

```
./src
│  aboutUs.js
│  contactUs.js
│  css.js
│  index.js
│  recruitment.js
│  
├─assets
│  │  favicon.jpg
│  │  
│  ├─css
│  │  │  index.scss
│  │  │  
│  │  ├─commons
│  │  │  ├─container
│  │  │  │      index.scss
│  │  │  │      
│  │  │  ├─footer
│  │  │  │      index.scss
│  │  │  │      
│  │  │  └─header
│  │  │          index.scss
│  │  │          
│  │  ├─productus
│  │  │      index.scss
│  │  │      productus-sprite.scss
│  │  │      
│  │  └─utils
│  │          btn.scss
│  │          form.scss
│  │          inital.scss
│  │          list.scss
│  │          modeal.scss
│  │          normalize.scss
│  │          pagination.scss
│  │          popover.scss
│  │          table.scss
│  │          text.scss
│  │          tooltip.scss
│  │          
│  └─imgs
│      ├─base64
│      │      fe.jpg
│      │      
│      ├─other
│      │      float.jpg
│      │      productus-sprite.png
│      │      
│      └─sprites
│          └─productus
│                  product-us_01.png
│                  product-us_02.png
│                  product-us_03.png
│                  product-us_04.png
│                  product-us_05.png
│                  product-us_06.png
│                  product-us_07.png
│                  product-us_08.png
│                  product-us_09.png
│                  product-us_10.png
│                  product-us_11.png
│                  product-us_12.png
│                  
├─pages
│  │  recruitment.pug
│  │  template.pug
│  │  
│  └─components
│      ├─commons
│      │  ├─container
│      │  │      index.pug
│      │  │      
│      │  ├─footer
│      │  │      index.pug
│      │  │      
│      │  └─header
│      │          index.pug
│      │          
│      └─productus
│              index.pug
│              
└─utils
        load.js
```

跟以前的实例代码相比，这次的文件目录结构变化较大，这里将要处理的所有文件模块都放在了`src`目录下。

可能有人会问，为什么要要将目录分的这么细，下面我就说一下为什么这么分。

* `aboutUs.js`, `contactUs.js`, `index.js`, `recruitment.js`是四个路由页面，要用到的js代码，`css.js`处理各个路由页面公用的css代码；
* 静态资源目录（assets）下，存放web项目常用的静态资源；
* 静态资源目录下的css目录统一存放整个web项目所用到的css样式。其中commons存放公用的css模块，每个公用模块有创建一个目录存放该公用模块可以使用到的css模块（提醒，不要分的过于细），而其他的如`productus`存放产品模块代码，根据开发的需要可以创建其他的模块目录，目录结构类似于`commons`中的`header`模块，其中`utils`放置自己总结的工具模块代码，如`table`，`form`等。然后，指定`style-loader`,`css-loader`等样式相关的loader处理css样式文件，这样可以减少遍历，缩短构建时间。 
* 静态资源目录下的imgs目录，用来存放整个项目中，用到的图片。在这里，分为`base64`，`sprite`，`ohter`等，为什么要这样分？如果分的话`file-loader`这个webapck的loader会复制并导出`imgs`目下所有的图片，者在构建中并不是我们需要的，这样会增加构建的时间。如果让`url-loader`处理`base64`目录下的图片，`file-loader`处理`ohter`目录下的图片，`webpack-spritesmith`处理`sprite`目录下的图片，并将生成的图片放到`ohter`目录下，用`file-loader`进行二次处理。这样做，webpack处理更精确，可以减少不必要的遍历，极大地减少构建的时间，同样方便对图片的管理，特别是对于需要改变`sprite`的图片的管理。
* 在`imgs`目录下创建`base64`目录，`sprite`目录，使用`file-loader`指定处理`ohter`目录，是为了避免file-loader将所有的图片都拷贝一份并导出到`dist`输出目录中，因为与`base64`相关的文件已经在`css`样式文件中了，再拷贝一份，已经没有意义，而`sprite`相关的文件会被`webpack-spritesmith`插件先处理生成一个文件，所以再拷贝它们也没有意义，还会让构建速度更慢。
* 在`page`目录下，放置所有的html代码块（这里使用pug编译器生成相应的html代码块），它的目录分类和`css`相类似，它们是一一对应的关系。

注意：`iamge-webpack-loader`，要先对所有的图片进行优化处理，然后再用其他loader处理。loader的执行顺序，如果你是`style-loader!css-loader!sass-loader"`使用，它是从右到左方向先后执行，如果你是在配置文件中的`rules: [...]`数组中，它也是从右到左的方向执行，如果你将所有的loader规则有回车符号隔开，那么它就是自下而上的执行。

## 源代码

[webpack4.x multi-page](https://github.com/lvzhenbang/webpack4.x-multi-page)

此后，webpack构建多页面应用系列文章的源代码，都在这个github项目中，[webpack3.x multi-page](https://github.com/lvzhenbang/webpack3.x-multi-page)不在维护。