'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlPlugin = require('webpack-html-plugin')
var HasteResolverPlugin = require('haste-resolver-webpack-plugin')

var IP = '0.0.0.0'
var PORT = 3000
var NODE_ENV = process.env.NODE_ENV
var ROOT_PATH = path.resolve(__dirname, '..')
var PROD = 'production'
var DEV = 'development'
let isProd = NODE_ENV === 'production'

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'index.web')
  }
}

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    alias: {
      'react-native': 'ReactWeb'
    },
    extensions: ['', '.js', '.jsx']
  },
  entry: isProd ? [
    'babel-polyfill',
    config.paths.index
  ] : [
    'babel-polyfill',
    'webpack-dev-server/client?http://' + IP + ':' + PORT,
    'webpack/hot/only-dev-server',
    config.paths.index
  ],
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js'
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? PROD : DEV)
      },
      '__DEV__': !isProd
    }),
    isProd ? new webpack.ProvidePlugin({
      React: 'react'
    }) : new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin()
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: [config.paths.src],
      exclude: [/node_modules/]
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-1']
      },
      include: [config.paths.src],
      exclude: [/(node_modules\/(?!react))/, path.join(ROOT_PATH, 'post_npm_install')]
    }, {
      test: /\.(png|gif|svg|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
}
