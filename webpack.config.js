// var path = require("path");
'use strict';

var path = require("path");
var HTMLWebpackPlugin =  require('html-webpack-plugin');
var root_path = path.resolve(__dirname);
var app_path = path.resolve(root_path, "app");
var build_path = path.resolve(root_path, "build");

module.exports = {
  devtool:'eval-souce-map',
  entry: app_path,
  output: {
    path: build_path,
    filename: "bundle.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Hello World app"
    })
  ],
  devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    progress:true,
    proxy:{
      '/api/*':{
        target:'http:localhost:5000',
        secure:false
      }
    }
  },
  module:{
    loaders:[
        {
          test:/\.js$/,
          loader:'babel',
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.scss$/,
          loader:'style!css!sass',
          include:app_path
        },
        {
          test:/\.(png|jpg)$/,
          loader:"url?limit=40000"
        },
        {
          test:/\.jsx?$/,
          loader:'jshint-loader'
        }
      ]
    },
    jshint:{
      "exnext":true
    }
};
