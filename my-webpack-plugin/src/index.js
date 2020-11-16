/**
 * See the webpack docs for more information about plugins:
 * https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

class MyWebpackPlugin {
  constructor(obj) {
    this.name = obj.name || 'Hello World!'
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap('MyWebpackPlugin', (a, b) => {
      // console.log(a, b);
    })
    compiler.hooks.make.tap('MyWebpackPlugin', (compilation) => {

    })
    compiler.hooks.shouldEmit.tap('MyWebpackPlugin', (compilation) => {
      return true
    })
    compiler.hooks.emit.tap('MyWebpackPlugin', (compilation) => {
      // console.dir(compilation.assets['index.html']);
      compilation.hooks.processAssets.tap(
        {
          name: 'MyPlugin',
          //stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          // code here
          console.log(assets);
        }
      )
    })
    compiler.hooks.assetEmitted.tap('MyWebpackPlugin', (file, info) => {
      // console.log(file);
    })
    compiler.hooks.done.tap('MyWebpackPlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      require('fs').writeFile('./stats.json', JSON.stringify(stats.toJson(), null, '\t'), () => { })
    });
  }
}

module.exports = MyWebpackPlugin;
