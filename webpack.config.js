var path = require('path');
var webpack = require('webpack');
var parseArgs = require('minimist');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var argv = parseArgs(process.argv.slice(2));
var distPath = path.resolve(path.resolve(__dirname, './'), './dist');

module.exports = {
  entry: {
    application: './index'
  },

  output: {
    path: distPath,
    filename: 'js/[name].js'
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
          'file?hash=sha512&digest=hex&name=images/[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=12&interlaced=false'
        ]
      },

      {
        test: /\.less$/,
        loader: "style!css!less"
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less', { publicPath: '../' })
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
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
};
