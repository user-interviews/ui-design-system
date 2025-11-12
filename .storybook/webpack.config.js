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

  // Filter out Storybook's default SCSS rules to avoid conflicts
  config.module.rules = config.module.rules.filter(rule => {
    if (!rule.test) return true;
    const testString = rule.test.toString();
    return !testString.includes('.scss') && !testString.includes('.sass');
  });

  // Add our custom SCSS rules with CSS module support
  config.module.rules.push(
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
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            quietDeps: true, // Suppress deprecation warnings from dependencies
          },
        },
      }
    ],
    include: path.resolve(__dirname, '../')
  },
  {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    use: ['file-loader'],
  });

  return config;
}
