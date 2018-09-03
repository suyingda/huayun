const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
module.exports = merge(common, {
    mode: 'development',
    // devtool: 'inline-source-map',
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

    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,
        open: false,
        port: 3002,
        proxy: { // proxy URLs to backend development server
            '/huayun/': 'http://172.254.68.140:8081'
        },
        host: '::', // can be overwritten by process.env.HOST
        // contentBase: "./src/common",
        //服务器打包后输出的路径。
        publicPath: '/',
        historyApiFallback: true,
        // mode     : 'development',//设置环境依赖  4.0报错,
        // inline: true, // 文件改变自动刷新页面
    },

});