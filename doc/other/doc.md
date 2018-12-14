# webpack 常见问题

问题：全局环境下安装webpack4.x无法正常启动

问题描述：在window上使用webpack4.x的同学需要注意了，因为自从webpack4.x开始，将webpack-cli单独的拿了出来，这样webpack-cli成了一个独立的项目包。因此，在使用webpack4.x的时候不仅要安装webpack，也需要安装webpack-cli，在项目中独立使用的时候没问题，但是，如果要在全局使用（windows环境），如果你使用`npm install webpack webpack-cli -g`安装后，然后运行`webpack`脚本命令，会报错，错误提示你需要`npm install -D`安装webpack-cli，这里你明明已经安装过了webapck-cli，然后你执行`npm install webpack-cli -D`，紧接着再次执行`webpack`脚本命令，这时会有一组提示命令，还是安装webpack-cli，你输入`yes`，依然会报错，然后就是循环这样的错误。这时为什么呢？因为webpack-cli被你安装在了控制台现实的当前目录，webpack被安装到了其它目录，因为它们两个有依赖关系，而安装在不同的目录后，这种关系就被切断了。

解决方案：

在系统的某个盘符下（如：D盘）创建一个文件夹，然后在控制台中，切换到这个文件下所在的目录下，执行 `npm i webpack webpack-cli -D` ，安装完成后执行`webpack`脚本命令，这样就得到了你所需要的结果。原因是，此时webpack和webapck-cli都在一个目录`node-modules`下，它们有了可以相互使用的依赖关系。