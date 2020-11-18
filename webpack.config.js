const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    return {
        mode: env.NODE_ENV,
        entry: () => ({
            vendor: {
                import: ['lodash', 'moment', 'echarts'],
                filename: 'vendor.[contenthash].js'
            },
            main: {
                import: [path.resolve(__dirname, 'src/index.js')],
                dependOn: 'vendor'
            },
            another: {
                import: path.resolve(__dirname, 'src/another.js'),
                dependOn: 'vendor',
                // chunkLoading: 'jsonp'
            }
        }),
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
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
                    use: [{
                        loader: 'style-loader',
                        options: {
                            // injectType: 'linkTag',
                            // sourceMap: false
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }]
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