const path = require('path');

module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: (path) => path.endsWith('.module.scss') ? 'local' : 'global'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            quietDeps: true,
            silenceDeprecations: ['import'],
          },
        },
      }
    ],
    include: path.resolve(__dirname, '../')
  },
  {
    test: /\\.(png|jp(e*)g|svg|gif)$/,
    use: ['file-loader'],
  });

  return config;
};
