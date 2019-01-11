var path = require('path');

module.exports = {
    entry: {
        app: ['./main.js']
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: '[name].js'
    },
    // watch: true
}