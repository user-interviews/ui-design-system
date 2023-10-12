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
      'sass-loader'
    ],
    include: path.resolve(__dirname, '../')
  });

  return config;
};
