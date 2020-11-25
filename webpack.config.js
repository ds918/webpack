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
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attributes: { // 将图片的 src 属性地址用 import 处理, 然后被 file-loader 处理为标准图片地址
                                    list: [
                                        '...', // 默认配置
                                        {
                                            tag: 'img',
                                            attribute: 'data-src',
                                            type: 'src',
                                            filter: (tag, attribute, attributes, resourcePath) => {
                                                /**
                                                 * @param { tag } 标签
                                                 * @param { attribute } 属性
                                                 * @param { attributes } 所有的属性
                                                 * @param { resourcePath } 文件路径
                                                */
                                                return false
                                            }
                                        }
                                    ]
                                },
                                esModule: true,
                                minimize: {
                                    removeComments: true, // 删除注释
                                },
                                preprocessor: (content, loaderContext) => {
                                    // 预处理 html 文件
                                    return content
                                }
                            }
                        }
                    ]
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
                                     * @description 当使用 function 的时候对文件的处理相当于针对每一个文件的路径, 是不允许出现相同的文件路径的, 所以 options.name 是不生效的
                                     * @param {url: string} 文件名称 ( name )
                                     * @param {resourcePath} 文件的路径
                                     * @param {context} 项目根目录
                                     * @relativePath 文件路径与项目的根目录的相对路径
                                    */
                                    const relativePath = path.relative(context, resourcePath);
                                    return relativePath
                                },
                                publicPath: (url, resourcePath, context) => {
                                    return path.relative(context, resourcePath)
                                }, // 生成的文件前面地址
                                postTransformPublicPath: (p) => {
                                    // 转化 publicPath
                                    /**
                                     * @param { __webpack_public_path__ } 等同于 output.publicPath
                                     * @tips 可以在入口文件 ( main.js/index.js ) 中修改 __webpack_public_path__ ( output.publicPath )
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