var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/public/src',
    './public/src/index.js'
  ],
  output: {
    path: './public',
    filename: "bundle.js",
    publicPath: '/public/'
  },
  module: {
  loaders: [
    { 
      test: /\.jsx?$/, 
      exclude: ['node_modules', 'app'], 
      loader: "babel-loader",
      query: {
        presets: ["es2015", "react", "stage-1", "react-hmre"]
      }
    },
    {
        test: /\.scss$/,
        exclude: ['node_modules', 'app'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
  ]
},
  plugins: [
    new ExtractTextPlugin("./public/styles/main.css"),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};