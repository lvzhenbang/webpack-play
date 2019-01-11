var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = mode => {
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
        },
        mode: mode,
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        optimization: {
            usedExports: true,
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
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
            new LodashModuleReplacementPlugin,
        ]
    }
}