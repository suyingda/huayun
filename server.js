import {renderToString} from "react-dom/server";
// import {routes} from "./src/router";

const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
const path = require('path');
var fs=require('fs')
import App from './src/App.js'
import React from 'react';
import ReactDOM from "react-dom";
import {RouteWithSubRoutes, routes, RouteConfigExample} from './src/router/index.js'
import {match, RouterContext, StaticRouter, Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducers from "./src/module/reducers";

const store = createStore(reducers, applyMiddleware(thunk));
app.all('*', function(response, res, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    response.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    response.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.use(express.static('public'));
//app.use(express.static('client'));

// Add middleware for http proxying    http://172.254.68.140:8081
const apiProxy = proxy('/huayun', {target: 'http://172.254.68.140:8081', changeOrigin: true});//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/huayun/*', apiProxy);//api子目录下的都是用代理


var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleWare = require('webpack-hot-middleware');
var webpackconfig = require('./webpack.dev')
var compiler = webpack(webpackconfig); // console.log(compiler);
app.use(webpackDevMiddleware(compiler, {
    open: false,
    publicPath: '/',
    historyApiFallback: true,
    })
);
app.get("/left", (req, res) => {
    res.send(<div>
      123213
    </div>);
});
app.listen(3001, () => {
    console.log('Listening on: http://localhost:3000');
});
