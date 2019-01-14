const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devServer: {
        open: true,
        // port: 9000
    },
    externals: {
        jquery: 'jQuery',
        jquery: '$'
    },
    module: {
        rules: [
            {
                test: require.resolve('underscore'),
                use: 'imports-loader?_=underscore'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            __: 'lodash',
            // _concat: ['lodash', 'concat']
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-demo',
            template: './template/index.html'
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, 'static/'),
              to: path.resolve(__dirname, 'dist/')
            }
        ])
    ]
}