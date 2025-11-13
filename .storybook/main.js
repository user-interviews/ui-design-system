import webpackConfig from './webpack.config.js';

const config = {
  addons: [{
    name: '@storybook/addon-docs',
    options: {
      jsxOptions: {
        babelrc: true,
        configFile: true
      }
    }
  }, '@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-webpack5-compiler-babel'],
  staticDirs: ['../public'],
  docs: {
    autodocs: true,
    defaultName: 'Docs',
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
  },
  webpackFinal: async (config) => {
    // Apply custom webpack config
    return webpackConfig({ config });
  },
};

export default config;
