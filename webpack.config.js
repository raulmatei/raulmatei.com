var path = require('path');
var webpack = require('webpack');
var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2));

module.exports = {
  entry: {
    javascript: './index'
  },

  output: {
    filename: './dist/application.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=dist/images/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=12&interlaced=false'
        ]
      },

      {
        test: /\.less$/,
        loader: "style!css!less"
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=dist/fonts/[hash].[ext]'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': argv.env === 'development' ? '"development"' : '"production"'
      }
    })
  ]
};
