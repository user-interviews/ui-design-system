import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const ignorePath = path.resolve(dirname, '.legacyeslintignore')

import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import babelPlugin from '@babel/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  includeIgnoreFile(ignorePath),
  {
    'files': [
      'stories/**/*.{js,jsx}'
    ],
    'rules': {
      'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }]
    }
  },
  {
    files: [
      'src/**/*.{js,jsx,ts,tsx}',
      'spec/**/*.{js,jsx,ts,tsx}',
      'stories/**/*.{js,jsx,ts,tsx}',
    ],
    ...reactPlugin.configs.flat.recommended,
    ...importPlugin.flatConfigs.recommended,
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@babel': babelPlugin,
      'import': importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'no-only-tests': noOnlyTestsPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        'version': 'detect',
      },
    },
    languageOptions: {
      parser: typescriptEslintParser,
        globals: {
        '$': 'readonly',
          'afterAll': 'readonly',
          'afterEach': 'readonly',
          'beforeAll': 'readonly',
          'beforeEach': 'readonly',
          'cy': 'readonly',
          'Cypress': 'readonly',
          'ENV': 'readonly',
          'describe': 'readonly',
          'expect': 'readonly',
          'gon': 'readonly',
          'it': 'readonly',
          'jest': 'readonly',
          'test': 'readonly'
      }
    },
    rules: {
      '@babel/semi': 2,
      'import/no-extraneous-dependencies': [
        'error', {
          'devDependencies': [
            '**/*.stories.*',
            '**/*.test.*'
          ]
        }
      ],
      'import/prefer-default-export': 0,
      'jsx-a11y/anchor-is-valid': 1,
      'jsx-a11y/label-has-for': 0,
      'no-alert': 0,
      'react/destructuring-assignment': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-no-target-blank': 1,
      'react/jsx-no-undef': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-sort-props': [2, {
        'callbacksLast': true,
        'ignoreCase': true,
        'noSortAlphabetically': false
      }],
      'react/no-unescaped-entities': ['error', { 'forbid': ['>', '}'] }],
      'react/prop-types': [2, { 'ignore': ['children'] }],
      'react/require-default-props': [2, {
        'functions': 'ignore' // ignore rule for function components
      }],
      'react/react-in-jsx-scope': [0],
      'react/sort-comp': [2, {
        'order': [
          'static-methods',
          'constructor',
          'state',
          'own-properties',
          '/^handle.+/',
          'getters',
          'setters',
          'everything-else',
          'lifecycle',
          '/^render.+/',
          'render'
        ],
        'groups': {
          'own-properties': [
            'instance-variables',
            'instance-methods'
          ],
          'react-methods': [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount'
          ]
        }
      }
      ],
      'react/sort-prop-types': [2, {
        'callbacksLast': true,
        'ignoreCase': true,
        'noSortAlphabetically': false,
        'requiredFirst': false,
        'sortShapeProp': true
      }],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'semi': 0
    },
  },
  {
    'files': [ '**/*.{ts,tsx}' ],
    'rules': {
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error'
    }
  },
  {
    'files': [ '*' ],
    'settings': {
      'import/resolver': {
        'node': {
          'paths': ['./']
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'import': importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react': reactPlugin,
    },
    'rules': {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'class-methods-use-this': 0,
      'function-paren-newline': ['error', 'consistent'],
      'func-names': ['error', 'never'],
      'implicit-arrow-linebreak': 0,
      'jsx-a11y/label-has-associated-control': [2, {
        'assert': 'either',
        'controlComponents': ['AsyncSelect', 'SingleSelect'],
        'depth': 25,
        'labelAttributes': ['label'],
        'labelComponents': []
      }],
      'linebreak-style': 0,
      'no-case-declarations': 'warn',
      'no-confusing-arrow': 0,
      'no-loop-func': 1,
      'no-plusplus': 0,
      'no-restricted-syntax': 0,
      'no-undef': 0,
      'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
      'no-use-before-define': 0,
      'operator-linebreak': ['error', 'after'],
      'prefer-destructuring': 'warn',
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      'radix': 0,
      'react/jsx-filename-extension': ['error', {
        'extensions': ['.tsx', '.jsx']
      }],
      'react/jsx-fragments': 0,
      'symbol-description': 0,
      'template-curly-spacing': 'off',
      'indent': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          'js': 'never',
          'jsx': 'never',
          'ts': 'never',
          'tsx': 'never'
        }
      ],
      'no-restricted-imports': ['error', {
        'patterns': [
          {
            'group': ['@fortawesome/free-brands-svg-icons/*', '@fortawesome/free-brands-svg-icons'],
            'message': 'Direct imports from @fortawesome/free-brands-svg-icons is not allowed. Import from src/ib/font_awesome/brands instead.'
          },
          {
            'group': ['@fortawesome/pro-regular-svg-icons/*', '@fortawesome/pro-regular-svg-icons'],
            'message': 'Direct imports from @fortawesome/pro-regular-svg-icons is not allowed. Import from src/lib/font_awesome/regular instead.'
          },
          {
            'group': ['@fortawesome/pro-solid-svg-icons/*', '@fortawesome/pro-solid-svg-icons'],
            'message': 'Direct imports from @fortawesome/pro-solid-svg-icons is not allowed. Import from src/lib/font_awesome/solid instead.'
          }
        ]
      }]
    }
  }
]

