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
            splitChunks: {
                chunks: "all",
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                cacheGroups: {
                    // commons: {
                    //     name: 'commons',
                    //     minChunks: 2,
                    //     maxInitialRequests: 5,
                    //     minSize: 0
                    // },
                    vendor: {
                        name: "vendor",
                        test: /node_modules/,
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        module: {},
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
    