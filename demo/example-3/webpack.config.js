module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            // 添加 css-loader 和style-locader 处理css样式文件
            // 具体 css-loader 使用可参考 https://www.npmjs.com/package/css-loader
            // 具体 style-loader 使用可参考 https://www.npmjs.com/package/style-loader
            // 具体 sass-loader 使用可参考 https://www.npmjs.com/package/sass-loader
            // 具体 less-loader 使用可参考 https://www.npmjs.com/package/less-loader
            // 具体 stylus-loader 使用可参考 https://www.npmjs.com/package/stylus-loader
            /*{
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }，*/
            /*{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }，*/
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: '[name].js'
    },
    watch: true
}