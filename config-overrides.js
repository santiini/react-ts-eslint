/**
 * customize-cra -- 基于 react-app-rewired 的修改 webpack 配置
 *   1. api说明： https://github.com/arackaf/customize-cra/blob/master/api.md
 *   2. ant-design 使用： https://ant.design/docs/react/use-with-create-react-app-cn
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = {
  webpack: override(
    // antd 按需加载
    // fixBabelImports('import', {
    fixBabelImports('babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    // antd 自定义主题： https://ant.design/docs/react/customize-theme-cn
    addLessLoader({
      javascriptEnabled: true,
      sourceMap: true, // should skip in production
      importLoaders: true,
      modifyVars: {
        '@primary-color': '#1890ff', // 全局颜色
        '@font-size-base': '12px', // 主字号
        '@heading-color': 'rgba(0, 0, 0, 0.95)',
        '@text-color': 'rgba(0, 0, 0, 0.85)',
        '@text-color-secondary': 'rgba(0, 0, 0, .45)',
        '@text-color-secondary-dark': 'rgba(255, 255, 255, 0.85)',
      },
    })
  ),
};
