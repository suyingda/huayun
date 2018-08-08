var WebpackConfig = require('./webpack.config')

var express = require('express')
var app = express();
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleWare = require('webpack-hot-middleware');
const compiler = webpack(WebpackConfig)

const instance = webpackDevMiddleware(compiler);


var fs = require('fs')
var path = require('path')
// app.use(instance);

/*
setTimeout(() => {
    // After a short delay the configuration is changed and a banner plugin is added
    // to the config
    compiler.apply(new webpack.BannerPlugin('A new banner'));
    // Recompile the bundle with the banner plugin:
    instance.invalidate();
},1000);

*/
import Home from './src/home'
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

const store = createStore(reducers, applyMiddleware(thunk));


const html = (_html) => (
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
        <div id="root">${_html}</div>
        </body>
        </html>`
)
app.get("*", (req, res) => {
    const context = {};
    const _html = renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
                <div>
                    <Home/>
                    {routes.map((route, i) => <RouteWithSubRoutes key={i} excat={route.excat}   {...route} />)}
                </div>
            </Provider>
        </StaticRouter>
    );

    /*    fs.readFile(__dirname+'/public/index.html', function (err, data) {
            if (err) {
                // console.log(err, data);
                res.send('后台错误');
            } else {
                console.log(data);
                res.writeHead(200, {
                    'Content-type': 'text/html',
                    'Connection': 'keep-alive'
                });
                res.end(html(_html));
            }
        })*/
    res.status(200).send(html(_html));

});


app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: WebpackConfig.output.publicPath,
    // port: 8000,
    progress: true,
    inline: true,
    stats: {
        colors: true,
        chunks: false
    },
    hot: true,
    // serverSideRender: true
}))
// app.use(webpackHotMiddleWare(webpack(WebpackConfig)));
app.use(webpackHotMiddleWare(compiler));
// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    //判断是主动导向404页面，还是传来的前端路由。
    //如果是前端路由则如下处理
/!*    console.log(res, '我是res')
    console.log(req._parsedUrl.pathname, '13132132132132131323')*!/

    fs.readFile(__dirname + '/dist/index.html', function (err, data) {
        if (err) {
            // console.log(err, data);
            res.send('后台错误');
        } else {
            console.log(data);
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection': 'keep-alive'
            });
            res.end(data);
        }
    })
});*/


// app.use(express.static(__dirname))


var PORT = process.env.PORT || 9000
app.listen(PORT, function () {
    console.log('Server listening on http://localhost:9000---start, Ctrl+C to stop')
})