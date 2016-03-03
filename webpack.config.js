var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var PRODUCTION = JSON.parse(process.env.PROD_ENV || false);

module.exports = {
  devtool: PRODUCTION ? '' : 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './public/src/index.js'
  ],
  output: {
    path: path.resolve('./public'),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015", "react", "stage-1", "react-hmre"]
      }
    },
    {
        test: /\.scss$/,
        exclude: ['node_modules', 'app'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test   :  /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
  ]
},
  plugins: PRODUCTION ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./styles/main.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ] : [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./styles/main.css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: false
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};
