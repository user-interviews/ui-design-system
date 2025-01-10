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
    "files": [
      "stories/**/*.{js,jsx}"
    ],
    "rules": {
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    }
  },
  {
    files: [
      "src/**/*.{js,jsx,ts,tsx}",
      "spec/**/*.{js,jsx,ts,tsx}",
      "stories/**/*.{js,jsx,ts,tsx}",
    ],
    ...reactPlugin.configs.flat.recommended,
    ...importPlugin.flatConfigs.recommended,
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "@babel": babelPlugin,
      "import": importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "no-only-tests": noOnlyTestsPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        "version": "detect",
      },
      // "import/resolver": {
      //   "webpack": {
      //     "config": "config/webpack/webpack.production.config.js",
      //   },
      // },
    },
    languageOptions: {
      parser: typescriptEslintParser,
        globals: {
        "$": "readonly",
          "afterAll": "readonly",
          "afterEach": "readonly",
          "beforeAll": "readonly",
          "beforeEach": "readonly",
          "cy": "readonly",
          "Cypress": "readonly",
          "ENV": "readonly",
          "describe": "readonly",
          "expect": "readonly",
          "gon": "readonly",
          "it": "readonly",
          "jest": "readonly",
          "test": "readonly"
      }
    },
    rules: {
      "@babel/semi": 2,
      "import/no-extraneous-dependencies": [
        "error", {
          "devDependencies": [
            "**/*.stories.*",
            "**/*.test.*"
          ]
        }
      ],
      "import/prefer-default-export": 0,
      "jsx-a11y/anchor-is-valid": 1,
      "jsx-a11y/label-has-for": 0,
      "no-alert": 0,
      "react/destructuring-assignment": 0,
      "react/forbid-prop-types": 0,
      "react/jsx-props-no-spreading": 0,
      "react/jsx-no-target-blank": 1,
      "react/jsx-no-undef": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-sort-props": [2, {
        "callbacksLast": true,
        "ignoreCase": true,
        "noSortAlphabetically": false
      }],
      "react/no-unescaped-entities": ["error", { "forbid": [">", "}"] }],
      "react/prop-types": [2, { "ignore": ["children"] }],
      "react/require-default-props": [2, {
        "functions": "ignore" // ignore rule for function components
      }],
      "react/react-in-jsx-scope": [0],
      "react/sort-comp": [2, {
        "order": [
          "static-methods",
          "constructor",
          "state",
          "own-properties",
          "/^handle.+/",
          "getters",
          "setters",
          "everything-else",
          "lifecycle",
          "/^render.+/",
          "render"
        ],
        "groups": {
          "own-properties": [
            "instance-variables",
            "instance-methods"
          ],
          "react-methods": [
            "displayName",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "mixins",
            "statics",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "getInitialState",
            "getChildContext",
            "getDerivedStateFromProps",
            "componentWillMount",
            "UNSAFE_componentWillMount",
            "componentDidMount",
            "componentWillReceiveProps",
            "UNSAFE_componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "UNSAFE_componentWillUpdate",
            "getSnapshotBeforeUpdate",
            "componentDidUpdate",
            "componentDidCatch",
            "componentWillUnmount"
          ]
        }
      }
      ],
      "react/sort-prop-types": [2, {
        "callbacksLast": true,
        "ignoreCase": true,
        "noSortAlphabetically": false,
        "requiredFirst": false,
        "sortShapeProp": true
      }],
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "semi": 0
    },
  },
]

