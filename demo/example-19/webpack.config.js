const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './main.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devServer: {
        open: true,
        // port: 9000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
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
        })
    ]
}