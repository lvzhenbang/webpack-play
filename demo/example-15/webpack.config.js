var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
        },
        devServer: {
            open: true
        },
        mode: mode,
        optimization: {
            splitChunks: {
                chunks: 'async',
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
            filename: '[name].js'
        },
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
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['lodash']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['commons', 'vendor', 'A']
            }),
            new MiniCssExtractPlugin()
        ]
    }
}