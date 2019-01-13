var path = require('path');
var webpack = require('webpack');

var HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
        vendor: ['lodash'],
        // common: []  // 在webpack3.10.0之前的某些版本中，可能需要使用到它
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js'
    },
    devServer: {
        open: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor'],
            minChunks: 2,
            filename: '[name]-[hash].js'
        }),
        new HtmlWebPackPlugin()
    ]
}