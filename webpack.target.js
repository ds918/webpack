const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = (env) => ({
    mode: env.NODE_ENV,
    entry: {
        target: [path.resolve(__dirname, 'src/target.js')],
    },
    plugins: [
        new webpack.ProgressPlugin({
            profile: false
        }),
        new CleanWebpackPlugin()
    ]
})
module.exports = (env) => {
    let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'].map((target) => {
        let base = merge(config(env), {
            target: target,
            output: {
                path: path.resolve(__dirname, './dist/' + target),
                filename: `[name].${target}.js`
            }
        });
        return base
    });
    return targets
}