const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
/* 压缩js另外的插件 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const pathName = path.join(__dirname, '..');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '..', 'public/index.html'),
            // minify  : true,
            minify: { //压缩HTML文件
                removeComments: true,  //移除HTML中的注释
                collapseWhitespace: true  //删除空白符与换行符
            },
            // chunksSortMode: 'none'
        }), //创建html打包后
        new CleanWebpackPlugin([path.join(__dirname, '..', '/dist')], {allowExternal: true}),// delete dist,
        // new BaseHrefWebpackPlugin({baseHref: '/'}),
        new ExtractTextPlugin({ //默认其实目录问打包后的入口文件路径，所以需要..
            filename:'css/index.css',
            disable:false,
            allChunks:true
        })
      /*  new UglifyJSPlugin({
            uglifyOptions: {
                ecma: 8,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false
                },
            }
        })*/
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
    // devtool: 'source-map'
});