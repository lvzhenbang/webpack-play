var webpack = require('webpack');

module.exports = {
    entry: {
        // app: './main.js',
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'common',
            names: ['common'],
            // filename: 'common.js',
            // chilrdren: true,
            minChunks: 3
        })
    ],
    output: {
        filename: '[name].js'
    },
    watch: true
}