const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Workbox = require('workbox-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './module.js'
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
        jquery: '$',
        window: 'window'
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
        new CopywebpackPlugin([{
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, 'dist')
        }]),
        new Workbox.InjectManifest({
            swSrc: 'workbox-v3.6.3/workbox-sw.js'
        }),
        new Workbox.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            importWorkboxFrom: 'local'
        })
    ]
}