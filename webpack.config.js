const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHardiskPlugin = require('html-webpack-harddisk-plugin')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)
const TerserPlugin = require('terser-webpack-plugin')

const distPath = path.resolve(path.resolve(__dirname, './'), './dist')

const config = {
  mode: process.env.NODE_ENV || 'production',

  entry: [
    './index',
  ],

  output: {
    chunkFilename: '[chunkhash].js',
    filename: '[chunkhash].js',
    jsonpFunction: 'appLoader',
    library: 'mpr',
    libraryTarget: 'umd',
    path: distPath,
    pathinfo: false,
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },

      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                hash: 'sha512',
                digest: 'hex',
                name: '[name].[ext]',
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                bypassOnDebug: true,
                optimizationLevel: 12,
                interlaced: false,
              },
            },
          },
        ],
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      }
    ]
  },

  optimization: {
    removeAvailableModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxSize: 240000,
      minSize: 0,
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV === 'development' ?
        JSON.stringify('development') :
        JSON.stringify('production'),
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
      template: 'src/index.html',
    }),

    new HtmlWebpackHardiskPlugin({
      outputPath: path.resolve(__dirname, './'),
    }),
  ],

  resolve: {
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval-source-map'

  config.devServer = {
    contentBase: path.resolve(__dirname),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: 'Google Chrome',
    port: 8080,
  }

  config.output.chunkFilename = '[name][hash].js'
  config.output.filename = '[name][hash].js'
}

if (process.env.NODE_ENV === 'production') {
  config.optimization.minimize = true
  config.optimization.minimizer = [
    new TerserPlugin({
      cache: './.cache',
      parallel: true,
    }),
  ]
}

module.exports = config
