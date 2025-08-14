const config = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {},
              },
            ],
          },
        ],
      }
    }
  ],
  docs: {
    autodocs: true,
    defaultName: 'Docs',
  },
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx)',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  typescript: {
    check: true,
  },
  webpackFinal: async (config) => {
    // Add MDX loader
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: require.resolve('@storybook/mdx2-csf/loader'),
          options: {
            mdxCompileOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default config;
