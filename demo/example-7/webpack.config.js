const webpack = require('webpack');
const path = require('path');

module.exports = [{
    entry: {
        A: ['./moduleA.js'],
        B: ['./moduleB.js'],
        C: ['./moduleC.js'],
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]"
    },
    // watch: true
}, 
{
    entry: {
        A: ['./moduleA.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/A-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}, 
{
    entry: {
        B: ['./moduleB.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/B-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}, 
{
    entry: {
        C: ['./moduleC.js'],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/C-manifest.json'),
            // name: 'js/MyDll.js'
        })
    ],
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js",
    },
    // watch: true
}]