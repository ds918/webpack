const path = require('path');
const output = require('./output')
const plugins = require('./plugins').plugins

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
        externals: {},
        output,
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
        plugins
    }
}