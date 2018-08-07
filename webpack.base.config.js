let express = require("express");
let webpack = require("webpack");
const fs = require("fs");
let app = express();
let port;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");
const path = require("path");

const baseHref = "/";
module.exports = {
  entry: {
    app: ["webpack-hot-middleware/client", "./src/index.js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // 　path: '/',
　 
    //所有资源的基础路径，而且一定是/结尾
    publicPath: "./" //所有资源的基础路径，而且一定是/结尾
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      // minify  : true,
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }), //创建html打包后
   
    new BaseHrefWebpackPlugin({ baseHref: baseHref }),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ],

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
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    open: false,
    port: 9000,
    host: "::", // can be overwritten by process.env.HOST
    // contentBase: "./src/common",
    //服务器打包后输出的路径。
    publicPath: "/",
    historyApiFallback: true
    // mode     : 'development',//设置环境依赖  4.0报错,
    // inline: true, // 文件改变自动刷新页面
  }
};
