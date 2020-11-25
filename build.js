const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MyWebpackPlugin = require('./my-webpack-plugin/src/index');
const webpackOptions = require('./webpack.config')({ NODE_ENV: 'development' })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css',
            chunkFilename: 'assets/css/[name].[contenthash].css',
            linkType: 'text/css'
        }),
        // new MyWebpackPlugin({ name: 'hello dongsen' }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true
                            }
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: true,
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
    },
    optimization: {
        // runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            '...', // 默认的压缩配置
            new CssMinimizerPlugin({ // 压缩 css 代码
                cache: true,
                test: /\.css$/i
            }),
        ],
        splitChunks: {
            cacheGroups: {
                styles: { // 提取所有的css到一个文件
                    name: 'common',
                    test: /\.css$/i,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
}

// analyzer
if(process.argv.includes('--analyze')) config.plugins.push(new BundleAnalyzerPlugin())

if (process.argv.includes('--watch')) {
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