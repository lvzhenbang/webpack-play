module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            // 添加 css-loader 和style-locader 处理css样式文件
            // 具体 css-loader 使用可参考 https://www.npmjs.com/package/css-loader
            // 具体 style-loader 使用可参考 https://www.npmjs.com/package/style-loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 添加 file-loader 的处理引用文件路径问题
            // 具体 file-loader 使用可参考 https://www.npmjs.com/package/file-loader
            /*{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][hash].[ext]', // 指定编译文件的文件名格式
                        outputPath: 'img/' // 指定编译后文件的目录
                    }
                }]
            },*/
            // 添加 url-loader 的处理引用文件路径问题
            // 具体 url-loader 使用可参考 https://www.npmjs.com/package/url-loader
            {
                test: /\.(jpe?g|woff|svg|eot|ttf)(\?.)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[path][hash].[ext]',
                        outputPath: 'img/'
                    }
                }]
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