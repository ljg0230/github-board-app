'use strict';

import lintConfig from '../config/lint/lint.config';
import { off } from 'process';

const rules = {
  // 'prettier/prettier': ['error', { ...lintConfig.rules.prettier }], //not recommended
  ...lintConfig.rules.es,
  ...lintConfig.rules.typescript,
  ...lintConfig.rules.import,
  ...lintConfig.rules.react.react
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@src', './src']]
      }
    }
  },
  ignorePatterns: lintConfig.exclude,
  rules: {
    ...rules,
    'semi': ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};
