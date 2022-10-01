module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
};
