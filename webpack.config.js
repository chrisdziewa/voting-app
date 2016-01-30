var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    filename: "./public/bundle.js"
  },
  module: {
  loaders: [
    { 
      test: /\.jsx?$/, 
      exclude: ['node_modules', 'app'], 
      loader: "babel-loader"
    },
    {
        test: /\.scss$/,
        exclude: ['node_modules', 'app'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
  ]
},
  plugins: [
    new ExtractTextPlugin("./public/styles/main.css")
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};