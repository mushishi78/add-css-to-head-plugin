var StaticWebpackPlugin = require('static-webpack-plugin');
var AddCSSToHeadPlugin = require('../index.js');

module.exports = {
  entry: './static.js',
  output: {
    filename: 'static.js',
    path: './public',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'raw' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },
  devServer: { contentBase: './public' },
  plugins: [
    new StaticWebpackPlugin('static.js'),
    new AddCSSToHeadPlugin({ amp: true })
  ]
};
