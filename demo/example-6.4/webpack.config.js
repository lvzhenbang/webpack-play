const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    devServer: {
        open: true,
        // port: 9000
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
           {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
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