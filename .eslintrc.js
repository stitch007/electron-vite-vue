module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    'no-console': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'curly': [
      2,
      'all',
    ],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/order': 'off',
  },
}
