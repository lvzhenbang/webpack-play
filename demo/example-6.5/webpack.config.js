var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var process = require('process');

var isDev = process.env.DEBUG ? true : false;

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: isDev ? '[name].js' : '[name].[hash].js'
    },
    devServer: {
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 89120, // 8kb
                            name: isDev ? '[name].[ext]' : '[name].[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 89120, // 8kb
                            name: isDev ? '[name].[ext]' : '[name].[hash].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new HtmlWebpackPlugin()
    ]
}
