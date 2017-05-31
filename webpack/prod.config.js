"use strict";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const pleeeaseFilters = require('pleeease-filters');
const autoprefixer = require('autoprefixer');

const publicPath = '';
const config = require('../config');

const srcPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../dist');

const extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].bundle.scss',
});

module.exports = {
  context: srcPath,
  entry: {
    'bundle': './app.js'
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
            failOnError: true,
            fix: true,
            cache: false,
          }
        }],
      },
      /* CSS loader: */
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          use: [ 'style-loader', 'css-loader', "postcss-loader" ],
        }),
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [
            { loader: "css-loader" },
            { loader: "sass-loader"}
          ],
          fallback: "style-loader",
        }),
      },
      {
        test: /^((?!\.base64).)*(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=/assets/img/[name].[ext]']
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
    extractTextPlugin,
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          autoprefixer,
          pleeeaseFilters,
        ]
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  stats: {
    assets: true,
    children: false,
    maxModules: 0,
  },
};
