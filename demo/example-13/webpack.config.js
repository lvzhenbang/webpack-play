var webpack = require('webpack');
var path = require('path');

module.exports = mode => {
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            C: './moduleC.js',
        },
        mode: mode,
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
        module: {},
        externals: {
            jquery: 'window.$'
        },
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     names: ['common'],
            //     minChunks: 2
            // })
        ],
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        }
    }
}
    