// import path, { resolve as _resolve, join } from 'path';
import PugPlugin, { loader as _loader } from 'pug-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = ['index'];
const aliases = {
  LightTheme: path.join(__dirname, 'src/themes/theme-light.scss'),
  DarkTheme: path.join(__dirname, 'src/themes/theme-dark.scss'),
  Img: path.join(__dirname, 'src/assets/img/'),
  Base: path.join(__dirname, 'src/components/base/'),
  BirdsDescription: path.join(__dirname, 'src/components/birds-description/'),
  BirdsList: path.join(__dirname, 'src/components/birds-list/'),
  Footer: path.join(__dirname, 'src/components/footer/'),
  Header: path.join(__dirname, 'src/components/header/'),
  Player: path.join(__dirname, 'src/components/player/'),
  Score: path.join(__dirname, 'src/components/score/'),
  Settings: path.join(__dirname, 'src/components/settings/'),
  HomePage: path.join(__dirname, 'src/pages/home/'),
  Slider: path.join(__dirname, 'src/components/slider/'),
  Gallery: path.join(__dirname, 'src/components/gallery/'),
  Lang: path.join(__dirname, 'src/lang/'),
}


const devServer = (isDev) => isDev ? {
  devServer: {
    open: false,
    hot: false,
    port: 9000,
    compress: false,
    watchFiles: {
      paths: ['src/**/*.*'],
      options: { usePolling: true, }
    },
    static: { directory: join(__dirname, 'src'), },
  },
  // stats: 'errors-only'
} : {}


export default ({ isDev }) => ({
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.pug`;
    return config;
  }, {}),
  output: {
    path: join(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js', // output filename of JS files
    clean: true
  },
  optimization: {
    splitChunks: { chunks: "all", },
    minimize: !isDev,
  },
  resolve: { alias: aliases, },
  module: {
    rules: [
      { test: /\.pug$/, loader: _loader, },
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
        generator: { filename: 'assets/fonts/[name][ext][query]' }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['css-loader',
          {
            loader: "sass-loader",
            options: {
              sassOptions: { outputStyle: "compressed", },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CompressionPlugin({ test: /\.(js|png|jpg|svg|html|css)(\?.*)?$/i, }),
    new PugPlugin({
      pretty: isDev,
      extractCss: { filename: 'assets/css/[name].[contenthash:8].css' },
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: join(__dirname, 'src/favicon.ico'),
        to: './'
      }]
    })
  ],
  ...devServer(isDev),
});