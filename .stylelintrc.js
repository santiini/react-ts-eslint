/**
 * jsx, tsx 中 emotion 的 stylelint
 */
module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  plugins: [],
  rules: {},
};
