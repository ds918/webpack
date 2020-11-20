const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    return {
        mode: env.NODE_ENV,
        target: 'web',
        entry: () => ({
            vendor: {
                import: ['lodash', 'core-js'],
                filename: 'vendor.[contenthash].js'
            },
            main: {
                import: [path.resolve(__dirname, 'src/index.js')],
                dependOn: 'vendor'
            },
            another: {
                import: path.resolve(__dirname, 'src/another.js'),
                dependOn: 'vendor'
            }
        }),
        externals: {
            moment: 'moment',
            echarts: 'echarts'
        },
        output: {
            charset: true,
            filename: '[name].bundle.js',
            chunkFilename: '[name].js',
            chunkLoading: 'jsonp',
            chunkFormat: 'array-push',
            crossOriginLoading: 'anonymous',
            path: path.resolve(__dirname, 'dist'),
            environment: {
                arrowFunction: true,
                const: true
            },
            sourcePrefix: '\t',
            pathinfo: true,
            library: ['MyLibrary', '[name]']
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        esModule: true
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                // injectType: 'linkTag',
                                // sourceMap: false
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin({
                profile: false
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'hello world',
            })
            // new MiniCssExtractPlugin()
        ]
    }
}