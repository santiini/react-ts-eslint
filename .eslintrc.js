module.exports = {
  // env: {
  //   browser: true,
  //   es6: true
  // },

  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly'
  // },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'react-app',
    // 保证 plugin:prettier/recommended 在最后
    'plugin:prettier/recommended',
    // 'plugin:react/recommended', // 优先级高于 prettier/recommented, 会有差异性的校验
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // overwrite rules specified from the extended configs
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {allowTypedFunctionExpressions: true},
    ],
    // '@typescript-eslint/explicit-function-return-type': 'error',
    trailingComma: true,
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'always-multiline'],
    'no-console': ['error', {allow: ['warn', 'error']}],
    '@typescript-eslint/no-non-null-assertion': [0],
    // 'react-hooks/exhaustive-deps': false, // hooks deps warns
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
