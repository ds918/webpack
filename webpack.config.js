const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
    return {
        mode: env.NODE_ENV,
        entry: {
            main: [path.resolve(__dirname, 'src/index.js')],
            vendor: [path.resolve(__dirname, 'src/vendor.js')],
        },
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