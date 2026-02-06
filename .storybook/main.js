// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const config = {
  addons: [{
    name: '@storybook/addon-docs',
    options: {
      jsxOptions: {
        babelrc: true,
        configFile: true
      }
    }
  }, '@storybook/addon-a11y', '@storybook/addon-links', {
    name: '@storybook/addon-mcp',
    options: {
      toolsets: {
        dev: true,
        docs: true,
      },
      experimentalFormat: 'markdown',
    },
  }, '@storybook/addon-webpack5-compiler-babel', ({
    name: "@storybook/addon-styling-webpack",

    options: {
      rules: [{
        test: /\.css$/,
        sideEffects: true,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {


            },
          },
        ],
      },],
    }
  })],
  docs: {
    defaultName: 'Docs'
  },
  features: {
    experimentalComponentsManifest: true,
  },
  stories: [
    '../stories/Intro.stories.jsx',
    '../src/**/*.stories.@(js|mdx)',
    '../src/**/*.stories.@(ts|mdx)',
    '../src/**/*.stories.js[x]',
    '../src/**/*.stories.ts[x]',
    '../stories/**/*.stories.js[x]',
    '../stories/**/*.stories.ts[x]'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  typescript: {
    check: true,
    checkOptions: {
      typescript: {
        configFile: '.storybook/tsconfig.json',
      },
    },
  },
};

export default config;
