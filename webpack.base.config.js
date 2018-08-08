let express = require("express");
let webpack = require("webpack");
const fs = require("fs");
let app = express();
let port;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");
const path = require("path");

module.exports = {
  module: {
    /**
     * 安装babel-loader  babel-core babel-preset-react
     *
     */
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: 'babel-loader',
            loader: "babel-loader?cacheDirectory=true" // 使用cache提升编译速度
            /*  options: {
                          presets: ["react", "env"],
                          plugins: ["transform-object-rest-spread"] // ...展开符号插件安装
                        } */
          }
        ],

        exclude: [path.resolve(__dirname, "node_modules/")]
      }
    ]
  }
};
