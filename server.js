var dev = require('./webpack.dev.config')
var base = require('./webpack.base.config')
var express = require('express')
var app = express();
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleWare = require('webpack-hot-middleware');
// let webpackconfig = Object.assign({}, dev, base); // console.log(webpackconfig);
let webpackconfig = require('./webpack.config')
var compiler = webpack(webpackconfig()); // console.log(compiler);
app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
        },
        historyApiFallback: true,

    })
);
app.use(webpackHotMiddleWare(compiler));
app.listen(9000, () => {
    console.log('服务器启动成功')
})