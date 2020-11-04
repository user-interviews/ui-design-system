module.exports = {
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links/register',
    '@storybook/addon-storysource/register'
  ],
  stories: [
    '../stories/Intro.stories.mdx',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.js[x]'
  ]
};
