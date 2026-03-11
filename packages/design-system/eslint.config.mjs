// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import config from '@pinback/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...storybook.configs['flat/recommended'],
  ...config,
  {
    files: ['**/*.js', '**/*.ts'],
    ignores: [
      'node_modules',
      'dist',
      'build',
      'public',
      'public/**',
      'public/**/*',
      'storybook-static',
      'icons/**/*',
    ],
  },
];
