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
                        attributes: false,
                        // esModule: true,
                    }
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name]-[contenthash:6].[ext]',
                                outputPath: (url, resourcePath, context) => {
                                    /**
                                     * @param {url: string} 文件名称 ( name )
                                     * @param {resourcePath} 文件的路径
                                     * @param {context} 项目根目录
                                     * @relativePath 文件路径与项目的根目录的相对路径
                                    */
                                    const relativePath = path.relative(context, resourcePath);
                                    console.log(relativePath,url);
                                    return relativePath
                                },
                                publicPath: (url, resourcePath, context) => {
                                    return path.relative(context, resourcePath)
                                }, // 生成的文件前面地址
                                postTransformPublicPath: (p) => {
                                    // 转化 publicPath
                                    /**
                                     * @param { __webpack_public_path__ } 等同于 output.publicPath
                                    */
                                    return `__webpack_public_path__ + ${p}`
                                },
                                useRelativePath: true, // 生成相对的url的地址
                                emitFile: true, // 是否生成 file 文件
                            }
                        },
                    ],
                }
            ]
        },
        plugins
    }
}