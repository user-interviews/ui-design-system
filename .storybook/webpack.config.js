const path = require('path');
const { codecovWebpackPlugin } = require('@codecov/webpack-plugin');

const bootstrapSassFacadeImportWarningPattern =
  /scss[\\/]bootstrap-(variables|buttons|breakpoints)\.scss/;

const isBootstrapSassFacadeImportWarning = (warning) =>
  warning.message?.includes('Sass @import rules are deprecated') &&
  bootstrapSassFacadeImportWarningPattern.test(warning.message);

module.exports = function ({ config }) {
  config.plugins = config.plugins || [];
  config.plugins.push(
    codecovWebpackPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'design-system',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  );

  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: (path) =>
                path.endsWith('.module.scss') ? 'local' : 'global',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              quietDeps: true,
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    },
    {
      test: /\\.(png|jp(e*)g|svg|gif)$/,
      use: ['file-loader'],
    },
  );

  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    // Keep other local @import deprecations visible; these three files are the
    // intentional Bootstrap 5.1 Sass compatibility layer.
    isBootstrapSassFacadeImportWarning,
  ];

  return config;
};
