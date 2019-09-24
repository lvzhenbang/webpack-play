const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js'
        },
        devServer: {
            open: true
        },
        mode: mode,
        optimization: {
            splitChunks: {
                chunks: 'initial',
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        maxInitialRequests: 5,
					    minSize: 0
                    },
                    vendor: {
                        name: "vendor",
                        test: /node_modules/,
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].[hash].js'
        },
        devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['commons', 'vendor', 'A']
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css'
            })
        ]
    }
}