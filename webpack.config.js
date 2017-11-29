var path = require('path');
var webpack = require('webpack');
var parseArgs = require('minimist');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var argv = parseArgs(process.argv.slice(2));
var distPath = path.resolve(path.resolve(__dirname, './'), './dist');

module.exports = {
  entry: {
    application: './index'
  },

  devtool: 'eval-source-map',

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
              hash: 'sha512',
              digest: 'hex',
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 12,
              interlaced: false,
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
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
         {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
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
      'process.env': {
        'NODE_ENV': argv.env === 'development' ? '"development"' : '"production"'
      }
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
      template: 'index.html',
    }),

    new webpack.HotModuleReplacementPlugin(),
  ].concat(argv.env === 'development' ? [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        },
      },
    }),
  ] : []),

  devServer: {
    contentBase: path.resolve(__dirname, './'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: 'Google Chrome',
    port: 8080,
  }
};
