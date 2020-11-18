const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    return {
        mode: env.NODE_ENV,
        entry: () => ({
            lodash: ['lodash'],
            main: {
                import: [path.resolve(__dirname, 'src/index.js')],
                dependOn: 'lodash'
            },
            vendor: {
                import: path.resolve(__dirname, 'src/vendor.js'),
                filename: '[name].js',
                dependOn: 'lodash',
                // chunkLoading: 'jsonp'
            },
        }),
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name]-[id].js',
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