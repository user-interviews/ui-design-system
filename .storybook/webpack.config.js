import path from 'path';
import { fileURLToPath } from 'url';
import { codecovWebpackPlugin } from '@codecov/webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function({ config }) {
  config.plugins = config.plugins || [];
  config.plugins.push(
    codecovWebpackPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'design-system',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  );

  // Remove existing CSS/SCSS rules from Storybook
  config.module.rules = config.module.rules.filter(rule => {
    const test = rule.test;
    if (!test) return true;
    const testString = test.toString();
    // Filter out rules that match .css or .scss files
    return !testString.includes('css') && !testString.includes('scss');
  });

  // Add our custom CSS and SCSS rules
  config.module.rules.push(
  {
    test: /\.css$/,
    sideEffects: true,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
            localIdentName: '[name]__[local]--[hash:base64:5]',
          }
        }
      },
      'sass-loader'
    ],
    include: path.resolve(__dirname, '../')
  },
  {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    use: ['file-loader'],
  });

  return config;
}
