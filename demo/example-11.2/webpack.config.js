const path = require('path');
const MiniCssExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js'
        },
        devServer: {
            open: true
        },
        mode: mode,
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDev ?{
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        } : MiniCssExtract.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                    path: './config/'                                    
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['A']
            }),
            new MiniCssExtract()
        ]
    }
}