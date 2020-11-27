const path = require('path');
const { merge } = require('webpack-merge')
const webpackDveServer = require('webpack-dev-server');
const MyWebpackPlugin = require('./my-webpack-plugin/src/index');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })
/*
 * analyze the bundles distribution
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new CleanWebpackPlugin(),
        // new MyWebpackPlugin({ name: 'hello dongsen' }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        runtimeChunk: 'single'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                sideEffects: true,
                exclude: [/\.module\.css$/i],
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // injectType: 'linkTag',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                        }
                    }
                ],
            },
            {
                test: /\.module\.css$/i,
                sideEffects: true,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // injectType: 'linkTag',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            modules: {
                                // namedExport: true,
                                localIdentName: '[name]__[local]--[hash:6]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                        }
                    }
                ]
            }
        ]
    }
}

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
// webpackDveServer.addDevServerEntrypoints(merge(config,webpackOptions), options)

const compiler = webpack(merge(webpackOptions, config))
const server = new webpackDveServer(compiler, options)
server.listen(8080)
compiler.hooks.done.tap('webpackDveServer', (a) => {
    console.log('\n' + 'http://127.0.0.1:8080/')
})