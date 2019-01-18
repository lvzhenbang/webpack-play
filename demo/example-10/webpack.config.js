const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
    let isDev = mode !== 'production' ? true : false;
    return {
        entry: {
            A: './moduleA.js',
            B: './moduleB.js',
            coommons: './commons.js'            
        },
        devServer: {
            open: true
        },
        mode: mode,
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
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-dynamic-import']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './template/index.html',
                chunks: ['commons', 'A', 'B']
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css'
            })
        ]
    }
}