let webpack = require("webpack");
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let devMiddleWare = require("webpack-dev-middleware");
let hotMiddleWare = require("webpack-hot-middleware");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
let baseConfig = require("./webpack.base.config");
module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['react','react-router-dom','react-redux','redux'] //提取react模块作为公共的js文件
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        // path: __dirname,   webpack 4.0前
        filename: '[name].index.js',
        //所有资源的基础路径，而且一定是/结尾
        publicPath: './',
        chunkFilename: '[name].[chunkhash:5].chunk.js',    // 添加 chunkFilename
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            // minify  : true,
            minify: { //压缩HTML文件
                removeComments: true,  //移除HTML中的注释
                collapseWhitespace: true  //删除空白符与换行符
            },
        }), //创建html打包后
        new CleanWebpackPlugin(['dist']),// delete dist,
        new BaseHrefWebpackPlugin({baseHref: '/'}),
        /*   new webpack.HotModuleReplacementPlugin(),
           new webpack.NoEmitOnErrorsPlugin(),*/
        /*  new UglifyJSPlugin({
              uglifyOptions:{
                  ecma: 8,
                  warnings: false,
                  output: {
                      comments: false,
                      beautify: false
                  },
              }
          })*/
    ],

};




