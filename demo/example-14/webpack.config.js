var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
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
            filename: '[name].js'
        },
        module: {
            rules: [
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
            })
        ]
    }
}