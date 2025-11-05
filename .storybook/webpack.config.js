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
  },
  {
    test: /\\.(png|jp(e*)g|svg|gif)$/,
    use: ['file-loader'],
  });

  return config;
}
