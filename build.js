const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyWebpackPlugin = require('./my-webpack-plugin/src/index');
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Manifest = require('webpack-manifest-plugin');

const config = {
    mode: 'production',
    // devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(),
        // new Manifest()
        // new MyWebpackPlugin({ name: 'hello dongsen' }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
        }
    }
}

if (process.argv[process.argv.length - 1].substr(2) === 'watch') {
    webpack(merge(webpackOptions, config)).watch({}, stats)
} else {
    webpack(merge(webpackOptions, config)).run(stats)
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