const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = mode => {
    let isDev = mode === "development" ? true : false ;
    let baseConfig = WebpackMerge([
        {
            entry: {
                app: './main.js'
            },
            output: {
                path: path.join(__dirname, 'dist/'),
                filename: '[name].js'
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
                                    name: isDev ? '[name].[ext]' : '[name].[hash].[ext]'
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
                                    name: isDev ? '[name].[ext]' : '[name].[hash].[ext]'
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    __DEV__: JSON.stringify(JSON.parse(isDev || 'false'))
                }),
                new HtmlWebpackPlugin()
            ]
        }
    ])

    let devConfig = WebpackMerge([
        {
            devServer: {
                open: true
            },
            devtool: 'cheap-module-eval-source-map'
        }
    ])

    let proConfig = WebpackMerge([
        {
            plugins: [
                new MiniCssExtractPlugin('style.css')
            ],
            devtool: 'cheap-module-source-map'
        }
    ])

    if (mode === "development") {
        return WebpackMerge( { mode }, baseConfig, devConfig)
    }

    return WebpackMerge( { mode }, baseConfig, proConfig)
} 
