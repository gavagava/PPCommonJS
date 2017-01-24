'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: true,
    context: path.resolve(__dirname, './src'),
    entry: {
        App: './app.ts',        
        Vendor: ['lodash', 'events'],
        Babel: 'babel-polyfill'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'PP.[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'es2016']
                }
            }, 'ts-loader']
        }, {
            test: '\.js$',
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2016', 'es2015']
                }
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader']
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin({
        names: ['Vendor', 'Babel'],
        minChunks: Infinity
    })],
    devtool: 'source-map'
};