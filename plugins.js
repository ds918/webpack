const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.ProgressPlugin({
            profile: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名
            title: 'index',
            template: './assets/index.html',
            // title: 'hello world',
        }),
    ]
}