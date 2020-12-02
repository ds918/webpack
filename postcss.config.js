module.exports = (config) => {
  const postcssNormalize = require('postcss-normalize')
  const isDevelopmentEnv = config.mode === 'development'
  const isProductionEnv = config.mode === 'production'
  return ({
    plugins: [
      ['postcss-flexbugs-fixes'], // 处理 flex-gorw, flex-shrink, flex-basis 以及 flex 简写的兼容性问题
      ['postcss-preset-env', {
        autoprefixer: {
          grid: isProductionEnv
        },
        stage: 3
      }],
      [postcssNormalize()], // reset 样式表, 但是可以被 browserslist 影响
    ]
  })
}