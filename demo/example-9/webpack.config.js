const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 8090, // 监听端口，默认8080
        contentBase: path.join(__dirname, './dist/'), // Server会根据浏览器地址栏中的地址，访问 './dist/' 目录下的文件
        https: true, // 可以传入true，支持https访问，反之支持http。
        /*https: {  // 支持https,也可以传入自定义的证书。
            key: fs.readFileSync("/path/to/server.key"),
            cert: fs.readFileSync("/path/to/server.crt"),
            ca: fs.readFileSync("/path/to/ca.pem"), 
        },*/
        inline: true, // 可以监控js变化
        hot: true, // 传入一个Boolean值，通知Server是否启动HTMR
        compress: true, // 传入一个Boolean值，通知Server是否启用gzip
        proxy: {
            "/api": "http://localhsot:3030"
        }

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 使webpack启动全局的 HTMR
        new HtmlWebpackPlugin({ // 生成简单的html文件
            title: 'html-webpack-plugin',
            filename: './index.html',
        }),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js'
    }
}