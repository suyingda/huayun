const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    // devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,
        open: false,
        port: 9000,
        host: '::', // can be overwritten by process.env.HOST
        // contentBase: "./src/common",
        //服务器打包后输出的路径。
        publicPath: '/',
        historyApiFallback: true,
        // mode     : 'development',//设置环境依赖  4.0报错,
        // inline: true, // 文件改变自动刷新页面
    },

});