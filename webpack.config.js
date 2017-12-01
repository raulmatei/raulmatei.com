var path = require('path');
var webpack = require('webpack');
var parseArgs = require('minimist');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHardiskPlugin = require('html-webpack-harddisk-plugin')

var argv = parseArgs(process.argv.slice(2));
var distPath = path.resolve(path.resolve(__dirname, './'), './dist');

const config = {
  entry: {
    application: './index'
  },

  output: {
    path: distPath,
    filename: 'js/[name].js',
    publicPath: 'dist',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
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
                name: 'images/[name].[ext]',
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
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
            },
          ],
          publicPath: '../'
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': argv.env === 'development' ?
        JSON.stringify('development') :
        JSON.stringify('production'),
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      hash: true,
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
};

if (argv.env === 'development') {
  config.devtool = 'eval-source-map'

  config.devServer = {
    contentBase: path.resolve(__dirname),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: 'Google Chrome',
    port: 8080,
  }

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        },
      },
    })
  )
}

module.exports = config
