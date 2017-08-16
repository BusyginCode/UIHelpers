const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, '../src/vendors.js')]
  },
  output: {
    filename: '[name]-dll.bundle.js',
    path: path.join(__dirname, '../dist-dll'),
    library: 'uihelpers_[name]'
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-prod-manifest.json'),
      name: 'uihelpers_[name]',
      context: path.resolve(__dirname, '../src')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
        // unused: true,
        // dead_code: true, // big one--strip code that will never execute
        // warnings: false, // good for prod apps so users can't peek behind curtain
        // drop_debugger: true,
        // conditionals: true,
        // evaluate: true,
        // drop_console: true, // strips console statements
        // sequences: true,
        // booleans: true,
      },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: {
      'fbjs/lib/memoizeStringOnly': '../node_modules/fbjs/lib/memoizeStringOnly'
    }
  },
  devtool: 'source-map',
  stats: {
    assets: true,
    children: false,
    maxModules: 0,
  },
};
