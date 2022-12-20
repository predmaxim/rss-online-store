// import path, { join } from 'path';
import PugPlugin, { loader as _loader } from 'pug-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aliases = {
  Src: join(__dirname, './src'),
  Base: join(__dirname, './src/components/base'),
  Footer: join(__dirname, './src/components/footer'),
  HomeHeader: join(__dirname, './src/components/home-header'),
  ShopHeader: join(__dirname, './src/components/shop-header'),
  Home: join(__dirname, './src/pages/home'),
  Shop: join(__dirname, './src/pages/shop'),
};

const devServer = (isDev) =>
  isDev
    ? {
        devServer: {
          open: false,
          hot: true,
          port: 9000,
          compress: false,
          // watchFiles: {
          //   paths: ['src/**/*.*'],
          //   options: { usePolling: true },
          // },
          static: { directory: join(__dirname, 'src') },
        },
        // stats: 'errors-only'
      }
    : {};

export default ({ isDev }) => ({
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: {
    index: './src/pages/home/home.pug',
    shop: './src/pages/shop/shop.pug',
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js', // output filename of JS files
    clean: true,
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    minimize: !isDev,
  },
  resolve: { alias: aliases, extensions: ['.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: _loader,
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
        // include: '/src/**/*',
        generator: { filename: '[name].[contenthash:8][ext][query]' },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: 'asset/resource',
        use: {
          loader: 'responsive-loader',
          options: {
            outputPath: 'assets/img/',
            name: '[name].[hash:8]-[width]w.[ext]',
            quality: 50, // default 85
            format: 'webp',
            esModule: true,
            // publicPath: 'assets/img/',
          },
        },
      },
      {
        test: /\.(?:woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/inline',
        generator: { filename: 'assets/fonts/[name][ext][query]' },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { outputStyle: 'compressed' },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({ test: /\.(js|png|jpg|svg|html|css)(\?.*)?$/i }),
    new PugPlugin({
      pretty: isDev,
      extractCss: { filename: 'assets/css/[name].[contenthash:8].css' },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, 'src/favicon.ico'),
          to: './',
        },
      ],
    }),
  ],
  ...devServer(isDev),
});
