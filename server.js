import {renderToString} from "react-dom/server";
// import {routes} from "./src/router";

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import {createServer} from 'http'
// import ReactDOMServer from 'react-dom/server'


const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
const path = require('path');
var fs = require('fs')
import App from './src/app.js'
import React from 'react';
import ReactDOM from "react-dom";
import {RouteWithSubRoutes, routes, RouteConfigExample} from './src/router/index.js'
import {match, RouterContext, StaticRouter, Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducers from "./src/module/reducers";

const store = createStore(reducers, applyMiddleware(thunk));
console.log(store)
app.all('*', function (response, res, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    response.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    response.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.use(express.static('public'));
//app.use(express.static('client'));

// Add middleware for http proxying    http://172.254.68.140:8081
/*
const apiProxy = proxy('/huayun', {target: 'http://172.254.68.140:8081', changeOrigin: true});//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/huayun/!*', apiProxy);//api子目录下的都是用代理
*/


var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleWare = require('webpack-hot-middleware');
var webpackconfig = require('./config/webpack.dev')
var compiler = webpack(webpackconfig); // console.log(compiler);

app.use(webpackDevMiddleware(compiler, {
        /*  open: true,
          publicPath: '/',

          historyApiFallback: true,*/
    })
);



// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist/index.html'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'html');
/*

const markup = renderToString(
    <Provider store={store}>
        <App/>
    </Provider>
);
*/


/*app.set('view >>enigne<<', 'jade')

app.set('view engine', 'html');*/
// 对所有(/)URL或路由返回index.html
app.get('*', function (req, res) {
    // justSendHtml(res);
    // res.send('12321321213')
    res.render(__dirname+'/dist');
});


/*app.engine('.ejs', require('ejs').__express)
app.set('views', __dirname +'/src/views');*/


app.use(require("webpack-hot-middleware")(compiler));
// app.use(webpackHotMiddleWare(compiler));
app.listen(3001, () => {
    console.log('Listening on: http://localhost:3001');
});
