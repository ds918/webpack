const path = require('path');

module.exports = {
    auxiliaryComment: { // 生成 library 时的不同环境下的注释内容
        root: 'root comment',
        commonjs: 'commonjs comment',
        commonjs2: 'commonjs2 comment',
        amd: 'amd comment',
    },
    chunkFilename: '[name].js', // non-initital ( important()导入的文件 ) chunk 文件输出路径
    chunkLoadingGlobal: 'chunkData', // 加载 chunk 的全局变量 ( 打包的所有代码以及代码的路径信息 )
    chunkLoading: 'jsonp', // 加载 chunk 的方式 jsonp ( web ) | require ( node )
    chunkFormat: 'array-push', // chunk 的代码格式  commonjs ( node ) | array-push ( web )
    enabledChunkLoadingTypes: ['jsonp', 'require'], // 启用 chunk 加载类型列表
    crossOriginLoading: 'anonymous', // 启用 script 的 cross-origin 属性
    // devtoolFallbackModuleFilenameTemplate: '',
    // devtoolModuleFilenameTemplate: '',
    // devtoolNamespace: '',
    filename: '[name].bundle.js', // 导出的 chunk name
    path: path.resolve(__dirname, 'dist'),
    environment: {
        arrowFunction: true,
        const: true
    },
    sourcePrefix: '\t',
    pathinfo: false,
    library: ['MyLibrary', '[name]'],
    // scriptType: 'module',
    libraryTarget: 'umd',
}