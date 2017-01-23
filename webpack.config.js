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
            use: {
                loader: 'babel-loader',
                options: {
                   presets: ['es2016', 'es2015'] 
                }
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: {
                loaders: [
                    'style-loader', 
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader']
            }
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map'
};