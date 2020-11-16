const webpackDveServer = require('webpack-dev-server');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })
webpackOptions.plugins.push(new CleanWebpackPlugin())
webpackOptions.devtool = 'inline-source-map'
webpackOptions.mode = 'development'

const options = {
    open: false,
    hot: true,
    noInfo: true,
    overlay: {
        errors: true,
        warnings: true
    },
    contentBase: './dist',
}

/*
 *  打包 HMR 文件代码, 但是 webpack 目前自带了打包文件
 */
// webpackDveServer.addDevServerEntrypoints(webpackOptions, options)

const compiler = webpack(webpackOptions)
const server = new webpackDveServer(compiler, options)
server.listen(8080)
compiler.hooks.done.tap('webpackDveServer', (a) => {
    console.log('\n' + 'http://127.0.0.1:8080/')
})