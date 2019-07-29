/**
 * ts、js 之类代码使用 eslint 格式化，md、css 之类则用 prettier。
 *   1. 针对不同文件进行不同的配置
 *   2. 在 git add 之前，可以进行多个其他的任务
 *   3. "lint-staged" 也可以配置在 package.json 文件中
 */
module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'stylelint', 'git add'],
  '*.{js,jsx}': ['eslint --fix', 'stylelint', 'git add'],
  '*.{md,html,json}': ['prettier --write', 'git add'],
  '*.{css,scss,less}': [
    "stylelint './src/**/*.css' --config ./.stylelintrc-css.js",
    'prettier --write',
    'git add',
  ],
};
