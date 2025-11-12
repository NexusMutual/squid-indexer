const jsRules = {
  'comma-dangle': ['warn', 'always-multiline'],
  curly: ['error', 'all'],
  'max-len': ['error', { code: 120 }],
  'no-nested-ternary': 'error',
  'padded-blocks': 'off',
  'space-before-function-paren': 'off',
  'no-useless-constructor': 'off',
  'n/no-process-exit': 'off',
  'n/no-unsupported-features/es-syntax': 'off',
  'n/no-unpublished-import': 'off',
  'n/no-extraneous-import': 'error',
  'import/no-unresolved': 'error',
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
  'import/order': [
    1,
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      'newlines-between': 'always',
    },
  ],
};

module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: ['semistandard', 'plugin:n/recommended', 'prettier'],
  ignorePatterns: ['node_modules/', 'abi', 'db', 'lib', 'src/abi/', 'src/model/', '!.github'],
  parserOptions: { ecmaVersion: 2022 },
  plugins: ['import', 'prettier'],
  rules: jsRules,
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: ['semistandard', 'plugin:@typescript-eslint/recommended', 'plugin:n/recommended', 'prettier'],
      rules: {
        ...jsRules,
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'n/no-missing-import': 'off',
        'import/no-unresolved': 'error',
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
    },
  ],
};
