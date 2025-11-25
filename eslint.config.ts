import { fixupPluginRules } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import jsonc from 'eslint-plugin-jsonc';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import neostandard from 'neostandard';

export default defineConfig([
  {
    ignores: [
      '**/.turbo/',
      'node_modules/',
      'apps/*/dist/',
      'apps/*/node_modules/',
      'packages/*/dist/',
      'packages/*/node_modules/',
      'packages/db-schema/abi/',
      'packages/db-schema/db/',
      'packages/db-schema/src/abi/',
      'packages/db-schema/src/model/',
    ],
  },
  ...neostandard({
    semi: true,
    noStyle: true, // no stylistic rules - using prettier for that
    ts: true,
    files: ['**/*.js', '**/*.ts', '**/*.json'],
    env: ['node', 'es2022'],
  }),
  ...jsonc.configs['flat/recommended-with-json'],
  ...jsonc.configs['flat/prettier'],
  prettierConfig, // disable conflicting eslint rules
  {
    plugins: { prettier }, // use prettier plugin
    rules: {
      'prettier/prettier': 'error',
      curly: ['error', 'all'],
      'no-nested-ternary': 'error',
    },
  },
  {
    files: ['**/test/**/*.ts'],
    languageOptions: { globals: { ...globals.mocha } },
    plugins: { 'chai-friendly': fixupPluginRules(chaiFriendly) },
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
]);
