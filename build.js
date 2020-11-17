const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyWebpackPlugin = require('./my-webpack-plugin/src/index');
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })

const config = {
    mode: 'production',
    // devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(),
        new MyWebpackPlugin({ name: 'hello dongsen' })
    ]
}

if (process.argv[process.argv.length - 1].substr(2) === 'watch') {
    webpack(merge(webpackOptions,config)).watch({}, stats)
} else {
    webpack(merge(webpackOptions,config)).run(stats)
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