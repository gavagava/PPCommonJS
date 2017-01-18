'use strict';

module.exports = {
    cache: true,
    context: __dirname + '/src',
    entry: {
        main: './app.ts'
    },
    output: {
        path: __dirname + '/build',
        filename: 'test.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2016&presets[]=es2015!ts-loader'
        }, {
            test: '\.js$',
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2016', 'es2015']
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']
        }]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devtool: 'source-map'
};