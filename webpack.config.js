require('babel-polyfill');

// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '/dist/');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssReporter = require('postcss-reporter');
const pleeeaseFilters = require('pleeease-filters');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    'main': [
      process.env.NODE_ENV ? 'react-hot-loader/patch' : '',
      process.env.NODE_ENV ? 'webpack-dev-server/client?http://' + host + ':' + port + '/' : '',
      process.env.NODE_ENV ? 'webpack/hot/dev-server' : '',
      './app.js',
    ]
  },
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['happypack/loader?id=js']},
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        loader: process.env.NODE_ENV === 'development'
          ? 'style!css!postcss'
          : ExtractTextPlugin.extract('style', 'css!postcss'),
      },
      {
        test: /\.scss$/,
        loader: process.env.NODE_ENV === 'development'
          ? 'style!css!postcss!resolve-url!sass?sourceMap'
          : ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass?sourceMap'),
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  },
  progress: true,
  resolve: {
    root: path.resolve(__dirname, 'src'),
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: {
      consts: __dirname + '/src/consts/',
      utils: __dirname + '/src/utils/',
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new HappyPack({
      id: 'js',
      tempDir: './.cache/happypack',
      loaders: [
        {
          loader: 'babel',
          query: {
            cacheDirectory: './.cache/babel',
          },
        },
        { loader: 'eslint-loader' },
      ],
    }),
  ].concat(
    process.env.NODE_ENV === 'development'  ? [
      new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin(),
    ] : [
      new ExtractTextPlugin('[name].bundle.css'),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
      }),
    ]
  ),
  devServer: {
    contentBase: path.join(__dirname, "/dev-static/"),
    compress: true,
    hot: true,
    port: port,
    stats: {
      chunks: false,
    }
  },
  postcss: wbpck => [
    autoprefixer,
    pleeeaseFilters,
    postcssReporter({
      throwError: process.env.NODE_ENV !== 'development',
      clearMessages: true,
    }),
  ],
  eslint: {
    failOnWarning: false,
    failOnError: process.env.NODE_ENV !== 'development',
    fix: true,
    cache: false,
  },
  watchOptions: {
    poll: true,
  },
};
