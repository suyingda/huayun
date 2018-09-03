import {renderToString} from "react-dom/server";
// import {routes} from "./src/router";

const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
const path = require('path');
var fs=require('fs')

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
const html = ({_html=""}) => (
    ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">     
                        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
                            <!--<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">-->
                                <title>React App</title>
                                 <!--<script src="/dist/bundle.js"></script>-->
        </head>
        <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root"></div>
        </body>
        </html>`
)
const justSendHtml = (response) => {
    // 若服务端找不到路由，交给客户端渲染即可
    response.header("Content-Type", "text/html;charset=UTF-8");
    try {
        response.send(html({}));
    } catch (e) {
        response.send(`<div style="padding:30px;color:red;" >error: ${e.stack}</div>`);
        console.log(e);
    }
};

app.get("/", (req, res) => {
        const context = {};
        const _html = renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                    <div>
                        {routes.map((route, i) => <RouteWithSubRoutes key={i} excat={route.excat}   {...route} />)}
                    </div>
                </Provider>
            </StaticRouter>
        );
    // justSendHtml(res)
    // res.send(<div>1</div>);

    //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
    // res.writeHead(200,{'Content-Type':'text/html'})
    // res.send(html({_html}));
    // 如果url=‘/' ,读取指定文件下的html文件，渲染到页面。
/*    fs.readFile(__dirname+'/public/index.html','utf-8',function(err,data){
        if(err){
            throw err ;
        }
        res.end(data);
    });*/
 /*   res.type('html');*/
    res.status(200).send(html({_html}));

});


// const port = process.env.PORT || 3000

/*
// 通常用于加载静态资源
app.use(express.static(__dirname + '/'))

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
*/


// Render your site
/*app.get('/index.htm', function(req,res){
    res.sendFile(__dirname+'/huayun/public/index.html');
});*/


app.listen(3001, () => {
    console.log('Listening on: http://localhost:3000');
});
