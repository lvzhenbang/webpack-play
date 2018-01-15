const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
           {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo',
            template: './template/index.html'
        })
    ],
    externals: {
        jquery: 'window.$'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: '[name]_[hash]'
    },
    // watch: true
}