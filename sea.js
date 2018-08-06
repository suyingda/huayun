
import React from 'react';
import ReactDOM from "react-dom";
import {RouteWithSubRoutes, routes, RouteConfigExample} from './src/router/index.js'
import {renderToString} from 'react-dom/server'
import {match, RouterContext, StaticRouter, Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './src/App.js'

import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducers from "./src/module/reducers";
var fs =require('fs')
const store = createStore(reducers, applyMiddleware(thunk));
var express = require('express');
var app = express();


app.use('/', require('connect-history-api-fallback')());
app.use('/', express.static('public'));

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var webpackCompiled = webpack(webpackConfig);
    // 配置运行时打包
    var webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(webpackCompiled, {
        publicPath: "/",
        stats: {colors: true},
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
    }));

    // 配置热更新
    var webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(webpackCompiled));
}

fs.readFile(__dirname+'/public/index.html', function (err, data) {
    if (err) {
        // console.log(err, data);
        res.send('后台错误');
    } else {
        console.log(data);
        res.writeHead(200, {
            'Content-type': 'text/html',
            'Connection': 'keep-alive'
        });
        res.end(<div>1</div>);
    }
})
var server = app.listen(9000, function () {
    var port = server.address().port;
    console.log('Open http://localhost:%s', port);
});