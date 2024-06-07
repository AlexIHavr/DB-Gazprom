module.exports = {
  noInlineConfig: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'fsd-stable', '@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    // 'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { overrides: { constructors: 'off' } },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    // 'no-undef': 'off',
    // 'multiline-ternary': 'off',
    // '@typescript-eslint/no-inferrable-types': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    'fsd-stable/fsd-paths-checker': 'error',
    'fsd-stable/public-api-imports-only': 'error',
    'fsd-stable/fsd-layer-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
};
