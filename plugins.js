const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    plugins: [
        new webpack.ProgressPlugin({
            profile: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.[contenthash].html',
            template: './index.html',
            title: 'hello world',
        })
    ]
}