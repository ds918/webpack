const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    return {
        mode: env.NODE_ENV,
        target: 'web',
        entry: () => ({
            main: {
                import: [path.resolve(__dirname, 'src/index.js')],
                dependOn: 'vendor'
            },
            another: {
                import: path.resolve(__dirname, 'src/another.js'),
                dependOn: 'vendor'
            },
            vendor: {
                import: ['lodash', 'core-js'],
                filename: 'vendor.[contenthash].js'
            },
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
            pathinfo: false,
            library: 'MyLibrary'
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
                },
                {
                    test: /\\.js$/i,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
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