# webpack 常见问题

### 问题：全局环境下安装webpack4.x无法正常启动

问题描述：在window上使用webpack4.x的同学需要注意了，因为自从webpack4.x开始，将webpack-cli单独的拿了出来，这样webpack-cli成了一个独立的项目包。因此，在使用webpack4.x的时候不仅要安装webpack，也需要安装webpack-cli，在项目中独立使用的时候没问题，但是，如果要在全局使用（windows环境），如果你使用`npm install webpack webpack-cli -g`安装后，然后运行`webpack`脚本命令，会报错，错误提示你需要`npm install -D`安装webpack-cli，这里你明明已经安装过了webapck-cli，然后你执行`npm install webpack-cli -D`，紧接着再次执行`webpack`脚本命令，这时会有一组提示命令，还是安装webpack-cli，你输入`yes`，依然会报错，然后就是循环这样的错误。这时为什么呢？因为webpack-cli被你安装在了控制台现实的当前目录，webpack被安装到了其它目录，因为它们两个有依赖关系，而安装在不同的目录后，这种关系就被切断了。

解决方案：

在系统的某个盘符下（如：D盘）创建一个文件夹，然后在控制台中，切换到这个文件下所在的目录下，执行 `npm i webpack webpack-cli -D` ，安装完成后执行`webpack`脚本命令，这样就得到了你所需要的结果。原因是，此时webpack和webapck-cli都在一个目录`node-modules`下，它们有了可以相互使用的依赖关系。


### 问题：在一个模块中同时使用`require`和`import`

问题描述：在一个模块文件中，使用了`require('module.css)'`引入了css后，又使用了`import $ from 'jquery'`引入了`jquery`，这样同一个文件中`import`和`require()`并存，虽然编译成功了，但是在浏览器中测试应用发现，应用出错，打开控制台出现`Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'`。

解决方案：

在一个模块中只是用一种模块引入方式`import`和`require`二选一。

### 问题：`Invalid Host/Origin Header`

问题描述：用`webpack-dev-server`启动应用，会在控制台不间断的提示这个警告。`v3.1.11` 到 `v3.1.14` 都会出现这个问题。

解决方案：

最简单的就是升级`webpack-dev-server`的版本。

可参考官方对这个[问题](https://github.com/webpack/webpack-dev-server/issues/1604)的讨论。

注：这个问题突然间就出现了，代码未修改，上午还没事儿，下午问题直接就出现了。

### `powsershell` 脚本无法运行

问题描述：在使用`window powershell`是会遇脚本命令无法运行的问题。

解决方案： 以管理员的身份打开`pwershell`，输入`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`，你会看到如下所示的信息：

```
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”):
```

输入`Y`，就行了。具体原因，请参考[`Microsoft doc`](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-6#set-a-different-execution-policy-for-one-session)

### `url-loader` 无法处理`backgorund-iamge: url(...)`

问题描述：在开发的过程中，有时会遇到因为路径的问题，造成`url-loader`无法处理`backgorund-iamge: url(...)`，如：特别是`/assets/imgs/index/logo.png`，它其实和``。

解决方案：`/assets/imgs/index/logo.png`和`http://example.com/assets/imgs/index/logo.png`一样，都代表绝对路径，前者是省略了域名`http://example.com`的路径。而`css-loader`就把这种拥有完整路径的情况排除，就不会调用`url-loader`来处理`backgorund-iamge: url(...)`，所以你需要将那些你需要用`url-loader`处理的`backgorund-iamge: url(...)`改用相对路径即可。

注：用`webpack`构建应用时，对于要用`webpack`的`loader`或`plugin`处理的静态资源文件，一律使用相对路径，而不用`webpack`处理的使用绝对路径（使用绝对路径可以避免开发的项目因为路径的问题发生串联，如：几个小项目合成一个大项目）。
