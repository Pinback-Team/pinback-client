import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import reactPlugin from 'eslint-plugin-react';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**', '**/node_modules/**'],
  },
  {
    rules: {
      // React 추천 규칙
      ...reactPlugin.configs.recommended.rules,

      // if, for, while 문에 항상 중괄호 사용 강제
      curly: ['error', 'all'],

      // console.log 사용 시 경고 표시
      'no-console': 'warn',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
];
