const path = require('path');

module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  });

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];

  return config;
};
