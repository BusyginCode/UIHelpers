"use strict";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const pleeeaseFilters = require('pleeease-filters');
const autoprefixer = require('autoprefixer');

const publicPath = '/dist/';
const config = require('../config');

const srcPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../dist');

module.exports = {
  context: srcPath,
  entry: {
    'bundle': [
      './app.js'
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath,
  },
  target: 'web',
  module: {
    rules: [
      /* JS loader: */
      {
        test: /\.jsx?$/,
        exclude:  /(node_modules)/,
        use: ['happypack/loader?id=js'],
      },
      {
        test: /\.jsx?$/,
        exclude:  /(node_modules|es-ui)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: false,
            fix: true,
            cache: false,
          }
        }],
      },
      /* CSS loader: */
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', "postcss-loader" ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /^((?!\.base64).)*(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=[name]-[hash].[ext]'],
      },
      { test: /\.base64\.(jpe?g|png|gif|svg)$/i, use: ['url-loader'] },
      { test: /\.json$/, use: ['json-loader'] },
    ],
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    alias: {
      public: path.resolve(__dirname, '../public/'),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    proxy: config.proxy,
    contentBase: './dev-static',
    publicPath: '/dist/',
    historyApiFallback: true,
    https: false,
    stats: {
      cached: false,
      exclude: [],
      chunks:false,
      warnings: true,
      errors: true,
    },
    host: config.host,
    port: config.port,
    hot: true,
  },
  plugins: [
    new ProgressBarPlugin(),
    new HappyPack({
      id: 'js',
      tempDir: './.cache/happypack',
      cache: true,
      verbose: true,
      debug: false,
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            cacheDirectory: './.cache/babel',
            presets: [['es2015', { 'loose': true }], 'react', 'stage-0'],
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-object-rest-spread',
              'babel-plugin-add-module-exports',
            ],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("development")
       }
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '../src'),
      manifest: require('./vendor-prod-manifest.json'),
    }),
  ],
};
