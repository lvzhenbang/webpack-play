const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            // 处理url引用问题
            {
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][hash].[ext]',
                        outputPath: 'img/'
                    }
                }]
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                parser: 'postcss-scss', // 标准化 sass
                                indent: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-sprites')(), // 将小图片生成雪碧图
                                    require('postcss-cssnext')(),
                                    require('cssnano')(),
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}