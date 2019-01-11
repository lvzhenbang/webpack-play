var webpack = require('webpack');

module.exports = {
    entry: {
        // app: './main.js',
        A: './moduleA.js',
        B: './moduleB.js',
        C: './moduleC.js',
    },
    module: {},
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            minChunks: 3
        })
    ],
    output: {
        filename: '[name].js'
    }
}