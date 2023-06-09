const config = {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        jsxOptions: {
          babelrc: true,
          configFile: true
        }
      }
    },
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-mdx-gfm'
  ],
  docs: {
    autodocs: true,
    defaultName: 'Docs',
  },
  stories: [
    '../stories/Intro.stories.mdx',
    '../src/**/*.stories.@(js|mdx)',
    '../src/**/*.stories.js[x]',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.js[x]'
  ],
  features: {
    storyStoreV7: false,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
};

export default config;
