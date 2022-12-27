// import path, { join } from 'path';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import PugPlugin, { loader as pugLoader } from 'pug-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = ['index', 'home', 'shop', '404', 'cart', 'product'];

const aliases = {
  Src: join(__dirname, './src'),
  Img: join(__dirname, './src/assets/img'),
  Base: join(__dirname, './src/components/base'),
  Footer: join(__dirname, './src/components/footer'),
  HomeHeader: join(__dirname, './src/components/home-header'),
  HeaderMenu: join(__dirname, './src/components/header-menu'),
  ShopHeader: join(__dirname, './src/components/shop-header'),
  MiniCart: join(__dirname, './src/components/mini-cart'),
  Buttons: join(__dirname, './src/components/buttons'),
  Themes: join(__dirname, './src/components/themes'),
  Filter: join(__dirname, './src/components/filter'),
  Sort: join(__dirname, './src/components/sort'),
  View: join(__dirname, './src/components/view'),
  ProductGrid: join(__dirname, './src/components/product-grid'),
  Home: join(__dirname, './src/pages/home'),
  Shop: join(__dirname, './src/pages/shop'),
  Cart: join(__dirname, './src/pages/cart'),
  Product: join(__dirname, './src/pages/product'),
  404: join(__dirname, './src/pages/404'),
  Routing: join(__dirname, './src/components/routing'),
};

const devServer = (isDev) =>
  isDev
    ? {
        devServer: {
          open: false,
          hot: false,
          port: 9000,
          // historyApiFallback: true,
        },
        stats: 'errors-only',
      }
    : {};

export default ({ isDev }) => ({
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: pages.reduce((config, page) => {
    page === 'index' ? (config[page] = `./src/${page}.pug`) : (config[page] = `./src/pages/${page}/${page}.pug`);
    return config;
  }, {}),
  output: {
    path: join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'assets/js/[name].[contenthash:8].js', // output filename of JS files
    clean: true,
  },
  optimization: {
    // splitChunks: { chunks: 'all' },
    minimize: !isDev,
  },
  resolve: { alias: aliases, extensions: ['.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: pugLoader,
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
        // include: '/src/**/*',
        generator: { filename: '[name].[contenthash:8][ext]' },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
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
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/img/[name][ext]' },
      },
      // {
      //   test: /\.(?:woff(2)?|eot|ttf|otf)$/i,
      //   type: 'asset/inline',
      //   generator: { filename: 'assets/fonts/[name][ext]' },
      // },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // sassOptions: { outputStyle: 'compressed' },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({ test: /\.(js|png|jpg|svg|html|css)(\?.*)?$/i }),
    new PugPlugin({
      pretty: true,
      extractCss: { filename: 'assets/css/[name].[contenthash:8].css' },
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: join(__dirname, 'src/favicon.ico'),
    //       to: './',
    //     },
    //   ],
    // }),
  ],
  ...devServer(isDev),
});
