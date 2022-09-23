module.exports = {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { mdxBabelOptions: { babelrc: true, configFile: true } },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links/register',
    '@storybook/addon-storysource/register'
  ],
  stories: [
    '../stories/Intro.stories.mdx',
    '../src/**/*.stories.@(js|mdx)',
    '../src/**/*.stories.js[x]',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.js[x]'
  ]
};
