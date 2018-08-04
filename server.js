// import React from 'react';
/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

import React from 'react';
import {routes}  from './src/router/index.js'

setTimeout(()=>{
    console.log(routes,'123')
},4000)

var app = express();

// console.log(RouterModule, 'i am  route')

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/',
    // historyApiFallback: true,
    stats: {
        colors: true
    }
}))
var fs = require('fs')
var path = require('path')
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //判断是主动导向404页面，还是传来的前端路由。
    //如果是前端路由则如下处理
/*    console.log(res, '我是res')
    console.log(req._parsedUrl.pathname, '13132132132132131323')*/

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
});


app.get('*', async (request, response) => {
    // 若不需要服务端渲染，直接返回页面内容

    let markup;
    let title;
    let store;
    let preloadState;

    let start;
    let firstStart;
    let cost;

    const requestPath = request.url;

    try {
        const routeConfig = require('./src/router/index.js');
        const { defualt:routes, RouteWithSubRoutes} = routeConfig;




        // ------------ 开始 -------------

        // 创建redux.store
        const configureStore = require('../app/store/configureStore');
        store = configureStore();
        const {dispatch} = store;
        const actions = bindActionCreators(actionCreators, dispatch);
        // 设置API远程地址基本信息
        const protocol = request.protocol;
        const host = apiHost.replace(protocol + '://', '');
        actions.storeHostInfo({protocol, host});


        // Match Route Configs
        const matchResults = RouteWithSubRoutes(requestPath);
        if (!matchResults || matchResults.length == 0) {
            justSendHtml(response);
            return;
        }
        const firstMatchResult = matchResults[0];
        const { match:topRouteMatch, route:topRoute } = firstMatchResult;
        const { component:Component, title:routeTitle } = topRoute;
        const { getPageTitle=()=>{} } = Component;



        // Preceding Process
        const redirect = {};
        const cookie = { get: (name) => request.cookies[name] };
        const replace = (url) => { redirect.url = url; };



        // Redirect
        if (redirect.url) {
            response.redirect(302, redirect.url);
            return;
        }

        // Fetch Document title
        // Join all Routes's Titles from Match Results



        // Call Preload Functions
        const preloadPromises = [];
        matchResults
            .filter(r => typeof r.route.component.preload === 'function')
            .forEach(r => {
                // Each route component has its own 'match' argument
                // const p = r.route.component.preload({ ...actions, match:r.match });
                // preloadPromises.push(p);
            });
        // Set preload from server flag
        if (preloadPromises.length > 0) {
            actions.preloadFromServer();
        }
        // Must set await in server side
        await Promise.all(preloadPromises);



        // Server render
        const context = {};
        const { children, ...topRouteRestProps } = topRoute;
        markup = renderToString(
            <Provider store={store}>
                <Router location={requestPath} context={context}>
                    <Route exact { ...topRouteRestProps } />
                </Router>
            </Provider>
        );


    } catch (e) {
        title = `发生错误`;
        markup = `<div style="padding:30px;color:red;" server>error: ${e.stack}</div>`;
        console.log(e);
    } finally {
        // 拿到预加载后的状态树
        if (store) {
            try {
                preloadState = JSON.stringify(store.getState());
            } catch(e2) {/*ignore*/}
        }


        response.header("Content-Type", "text/html;charset=UTF-8");
        response.send(html({title, markup, preloadState}));
    }
});
app.use(express.static(__dirname))

app.listen(9000, function () {
    console.log('Server listening on http://localhost:9000, Ctrl+C to stop')
})