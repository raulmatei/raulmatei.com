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
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader']
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=12&interlaced=false'
        ]
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
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
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({minimize: true}),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
};
