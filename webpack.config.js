const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const VENDOR_LIBS = [];

module.exports = {
    entry: {
        bundle: './src/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src/'),
            path.resolve('./src/js/'),
            path.resolve('./src/scss/'),
            path.resolve('./src/images'),
            'node_modules'
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash"
        }),
        new ExtractTextPlugin("style.[contenthash].css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ImageminPlugin({
            test: /\.(png|svg|jpe?g|gif)$/i,
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                speed: 1
            }
        })
    ]
}