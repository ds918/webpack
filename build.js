const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyWebpackPlugin = require('./my-webpack-plugin/src/index');
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })
webpackOptions.plugins.push(new CleanWebpackPlugin())
webpackOptions.plugins.push(new MyWebpackPlugin({ name: 'hello dongsen' }))
// webpackOptions.devtool = 'nosources-source-map'
webpackOptions.mode = 'production'
if (process.argv[process.argv.length - 1].substr(2) === 'watch') {
    webpack(webpackOptions).watch({}, stats)
} else {
    webpack(webpackOptions).run(stats)
}

function stats(err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
}