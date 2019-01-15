const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
            // minimizer: [
            //     new UglifyJsPlugin({
            //       cache: true,
            //       parallel: true,
            //       sourceMap: true
            //     }),
            //     new OptimizeCSSAssetsPlugin({})
            // ],
            splitChunks: {
                chunks: 'all',
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
            new MiniCssExtractPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                      inline: false
                    }
                }
            }),
            new PurifyCSSPlugin({
                paths: glob.sync(path.join(__dirname, '*.html')),
            })
        ]
    }
}