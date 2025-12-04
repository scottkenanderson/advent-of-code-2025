// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  stylisticJs.configs['all-flat'],
  {
    ignores: ['**/dist/', '**/jest.config.js'],
  },
  {
    rules: {
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/array-element-newline': ['error',
        {
          consistent: true,
          multiline: true,
        }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    },
  },
);
