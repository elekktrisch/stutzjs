var path = require('path');

var minimist = require('minimist');
var webpack = require('webpack');
var TARGET = minimist(process.argv.slice(2)).TARGET || 'PROD';

var config = {

    context: __dirname + '/src',
    entry: {
        "stutz": 'src/stutz.global.ts'
    },

    resolve: {
        root: [path.join(__dirname, "/"), path.join(__dirname, "/node_modules")],
        extensions: ["", ".webpack.js", ".js", ".ts"]
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel"},
            {test: /\.ts$/, exclude: /node_modules/, loader: "ts"}
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ],

    debug: true,

    devServer: {
        port: 3000
    },

    // support source maps
    devtool: TARGET === "DEV" ? "#cheap-module-eval-source-map" : "none"

};

module.exports = config;