delete process.env.BROWSER;

import express from 'express';
import httpProxy from 'http-proxy';
import path from 'path';
import fetch from 'isomorphic-fetch';

import bodyParser from 'body-parser';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {Route, StaticRouter as Router, matchPath} from 'react-router';

import {Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import cookieParser from 'cookie-parser';
import {normalize} from 'normalizr';

import * as config from '../app/config';

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));

let {
    isHotLoad,
    webpackPort,
    serverPort,
    isBench,
    apiHost,
    isServerRender,
    isDev,
    serverHostName
} = config;

// 若开启服务端渲染，则需要处理css、less的required解析
if (isServerRender) {
    console.log("css require hook...");
    const cssHook = require('css-modules-require-hook');
    const cssHookConfig = require('../../cmrh.conf');
    cssHook({
        ...cssHookConfig,
        processorOpts: {parser: require('postcss-less').parse}
    });
}

const args = process.argv;
if (args.length > 2) {
    serverPort = process.argv[2];
    if (args.length > 3) {
        webpackPort = process.argv[3];
    }
}

const app = express();
app.use(express.static(__dirname + './../../public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.set('views', __dirname + './../../views');
//app.set('view engine', 'ejs');

if (isHotLoad) {
    const proxy = httpProxy.createProxyServer();
    const bundle = require("./bundle").default;
    bundle({
        webpackPort
    });

    app.all('/static/*', (req, res) => {
        proxy.web(req, res, {
            target: `http://${serverHostName}:${webpackPort}`
        });
    });

    proxy.on('error', () => {
        console.log('Could not connect to proxy, please try again...');
    });
}

// 读取api文件夹，动态进行注册
const apiDir = path.join(__dirname, '.', 'api');
fs.readdirSync(apiDir).forEach(name => {
    const apiFile = path.join(apiDir, name);
    const stat = fs.statAsync(apiFile);
    const apiModule = require(apiFile);
    const before = apiModule.before;
    const apiObject = apiModule.default;
    if (apiObject) {
        isDev && console.log('   [api-registry] %s', apiFile);
        Object.keys(apiObject).forEach(key => {
            const keySplit = key.split(' ');
            const method = keySplit.length > 1 ? keySplit[0].toLowerCase() : 'get';
            const url = keySplit.length > 1 ? keySplit[1] : keySplit[0];
            const handler = (req, res, next) => {
                try {
                    return apiObject[key](req, res, next);
                } catch (e) {
                    console.log(e);
                    res.status(500).send(e.stack);
                }

            };
            try {
                if (before) {
                    app[method](url, before, handler);
                    isDev && console.log('       [success]before -> %s', key);
                } else {
                    app[method](url, handler);
                    isDev && console.log('       [success]-> %s', key);
                }
            } catch (e) {
                console.error(e);
                console.error('       [error]-> %s', key);
            }
        });
        isDev && console.log('\r\n');
    }
});

//============================================================================
// <script src="/doc/jquery.min.js"></script>
// <script src="/doc/pageoffice.js" id="po_js_main"></script>
const html = ({title = '', preloadState = '{}', markup = ''}) => (
    `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta content='ie=edge' http-equiv='x-ua-compatible'>
                <meta content='webkit' name='renderer'>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta http-equiv="expires" content="0">
                <title>${title}</title>
                <link rel="stylesheet" href="/static/bundle.css" />
                <link rel="stylesheet" href="/static/reset.css" />
                <script src="/static/tinymce/tinymce.min.js"></script>
                <script src="/static/kindeditor/kindeditor.all.js"></script>
                <script src="/static/kindeditor/zh-CN.js"></script>
                <script src="/static/kindeditor/plugins/autoheight/autoheight.js"></script>
                <!-- <script src="/doc/jquery.min.js"></script>
                <script src="/doc/pageoffice.js" id="po_js_main"></script>-->
                <script>window.preloadState = ${preloadState};</script>
                <style>
                    #ibp-index-spinner {
                        top: 40%;
                        left: 50%;
                        width: 120px;
                        height: 120px;
                        position: fixed;
                        transition: all .3s ease;
                        transform: translateX(-60px);
                    }
                    .cms-logo-spinner {
                        position: relative;
                        background: center center/100% 100% no-repeat url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMxMzYwMzgzNjkyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjczMTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAyMy40MjgyMTkgNDg4LjM2NDE4N2E1MTEuOTgyMjM0IDUxMS45ODIyMzQgMCAxIDAtNDg3Ljc2NTQ3NCA1MzUuMDcyNjMzIDUxMS45ODIyMzQgNTExLjk4MjIzNCAwIDAgMCA0ODcuNzY1NDc0LTUzNS4wNzI2MzNNNjMuMjA1NTM5IDY5MC4xODc1ODNhNDgwLjgwMjUxNiA0ODAuODAyNTE2IDAgMCAxLTMzLjQ4MzYzOC0xNTUuNzk2MTk0cS0wLjUxMTk4Mi0xMS4zNjYwMDYtMC41MTE5ODItMjIuNzMyMDExQTQ4Mi44NTA0NDUgNDgyLjg1MDQ0NSAwIDAgMSA0ODkuNjM1NTQyIDI5LjgzMjg5OGM3LjYyODUzNS0wLjQwOTU4NiAxNS4zNTk0NjctMC41MTE5ODIgMjIuNjgwODEzLTAuNTExOTgzYTQ4MS4yNjMzIDQ4MS4yNjMzIDAgMCAxIDMyOS4yNTU3NzUgMTMwLjE0NTg4NEM3OTcuNDM5MjYxIDE5MS43MjE2OCA3MjcuMDQxNzA0IDIzOS4wMjg4MzggNjUwLjI0NDM2OSAyNzAuNjE4MTQyYzEwLjIzOTY0NS00MS4yNjU3NjggMTguNDgyNTU5LTc0LjAzMjYzMSAxOC41MzM3NTctNzQuMzM5ODJhMTQuODQ3NDg1IDE0Ljg0NzQ4NSAwIDAgMC0xOS4yNTA1MzItMTguNzM4NTVoLTAuMzU4Mzg4YTcuMDY1MzU1IDcuMDY1MzU1IDAgMCAwLTEuODQzMTM2IDAuNzY3OTc0Yy0zLjQ4MTQ3OSAxLjQzMzU1LTExNi45MzY3NDIgOTIuNDYzOTkxLTIyNy4wNjQxMjEgMTM4LjY0NDc4OSAxMC4yMzk2NDUtNDAuMzQ0MiAxOS42NjAxMTgtNzguNzk0MDY2IDE5LjcxMTMxNi03OS4xNTI0NTRBMTAuNTQ2ODM0IDEwLjU0NjgzNCAwIDAgMCA0NDAuMzMxNjUzIDIzNS41NDczNTl2LTAuODE5MTcxYTcuNDc0OTQxIDcuNDc0OTQxIDAgMCAwIDAtMS42MzgzNDN2LTAuODcwMzdBMTMuNzcyMzIyIDEzLjc3MjMyMiAwIDAgMCA0MzMuMTYzOTAxIDIyMC4xODc4OTJjLTAuNTYzMTggMC0xLjE3NzU1OS0wLjU2MzE4LTEuNzQwNzM5LTAuNzY3OTczYTEwLjkwNTIyMiAxMC45MDUyMjIgMCAwIDAtMS44NDMxMzYtMC41NjMxODEgMTQuNTkxNDk0IDE0LjU5MTQ5NCAwIDAgMC0xMS4zNjYwMDYgMS44NDMxMzdjLTEwLjIzOTY0NSA3LjY3OTczNC0xMDcuMDA0Mjg3IDkwLjQ2NzI2MS0yMjUuOTg4OTU4IDE0MC41OTAzMjEgMCAwLTE0LjI4NDMwNCA1Ny45MDUxOTEtMTQuNzQ1MDg4IDU5LjU0MzUzNGw0MC40OTc3OTQtOC4xNDA1MThhMjIuNDI0ODIyIDIyLjQyNDgyMiAwIDAgMSAyMS41MDMyNTQgOC44NTcyOTNjMC40NjA3ODQgMC43Njc5NzMgMC45MjE1NjggMS41ODcxNDUgMS4zMzExNTQgMi4zNTUxMThhNy43ODIxMyA3Ljc4MjEzIDAgMCAwIDAuNTExOTgyIDEuMjI4NzU4IDE0LjAyODMxMyAxNC4wMjgzMTMgMCAwIDEgMC42NjU1NzcgMS44OTQzMzQgMjYuMDU5ODk2IDI2LjA1OTg5NiAwIDAgMS0wLjY2NTU3NyAxMy4zMTE1MzhjLTUuMTE5ODIyIDIwLjQ3OTI4OS02Mi4zMDgyMzggMjU5LjQ3MjU5Ni02My4zMzIyMDIgMjYzLjgyNDQ0NS00MS43Nzc3NS0zLjEyMzA5Mi03Ni43OTczMzUtNy45MzU3MjUtMTE0Ljc4NjQxNy0xNC4wNzk1MTFtNjMzLjg4NTIwNC0zMjUuMzY0NzFhNS43ODUzOTkgNS43ODUzOTkgMCAwIDEgMCAwLjk3Mjc2NiAxNi4wNzYyNDIgMTYuMDc2MjQyIDAgMCAxLTAuMzA3MTg5IDEuNjM4MzQzYzAgMS4wNzUxNjMtNzUuNTE3MzggMzE1Ljg0MTg0LTc1Ljc3MzM3MSAzMTcuMTIxNzk2LTI1LjI0MDcyNCAzLjczNzQ3LTUwLjY4NjI0MSA2Ljg2MDU2Mi03Ni4yMzQxNTUgOS42NzY0NjQgNi42NTU3NjktMjYuNjc0Mjc0IDY3LjQyODA2LTI3MC42MzM4MDkgODYuMDY0MjE0LTM0NS40MzQ0MTNsNDUuNzIwMDEzLTcuMDY1MzU1YTE2Ljc0MTgxOSAxNi43NDE4MTkgMCAwIDEgMi4zNTUxMTkgMCA5LjA2MjA4NiA5LjA2MjA4NiAwIDAgMSAxLjg0MzEzNiAwIDIyLjI3MTIyNyAyMi4yNzEyMjcgMCAwIDEgMTMuNDY1MTMzIDkuMjY2ODc5IDIxLjM0OTY1OSAyMS4zNDk2NTkgMCAwIDEgMi45Njk0OTcgMTMuMjYwMzRNNDY5LjIwNzQ1MSA0MDQuNTAxNDk3Yy0xLjUzNTk0NyA2LjI5NzM4MS01OC43MjQzNjIgMjQyLjkzNTU3LTcyLjc1MjY3NiAzMDEuMTQ3OTUtMjQuNzI4NzQyIDAuOTcyNzY2LTQ5LjE1MDI5NCAxLjU4NzE0NS03My41MjA2NDkgMS45NDU1MzIgMjEuMTk2MDY0LTg0Ljc4NDI1OCA1NC45ODY4OTItMjIwLjYxMzE0NSA4MC44NDE5OTUtMzI0LjM5MTk0MyAwIDAgNDQuMjg2NDYzLTYuODA5MzY0IDQ0Ljg0OTY0NC02LjgwOTM2NGEyMS4xOTYwNjQgMjEuMTk2MDY0IDAgMCAxIDIwLjQ3OTI4OSAyOC4xMDc4MjVtNjUuMDIxNzQ0IDU4OS45NTcxMjhjLTcuNjI4NTM1IDAtMTUuMzU5NDY3IDAuNDYwNzg0LTIyLjczMjAxMSAwLjQ2MDc4NGE0ODEuNjcyODg2IDQ4MS42NzI4ODYgMCAwIDEtMzUxLjIxOTgxMy0xNTIuMDU4NzIzYzM2NC4wMTkzNjktOS40NzE2NzEgNjI1Ljg5ODI4MS04Mi45OTIzMiA4MDQuNTI4ODgzLTE2My44MzQzMTVhNDgzLjA1NTIzOCA0ODMuMDU1MjM4IDAgMCAxLTQzMC43MzA2NTQgMzE1LjM4MTA1Nm00NTQuNjQwMjI0LTQwNy4xNzk0NzFBMTY0Ny4zNTQwMzcgMTY0Ny4zNTQwMzcgMCAwIDEgNzczLjEyMDEwNSA2NTYuMzk2NzU2YzI0LjE2NTU2MS05Ny4yNzY2MjUgODMuNjA2Njk5LTMzNC42MzE1ODggMTEyLjM4MDEtNDQ5Ljk4MTE4NmE0ODAuMDg1NzQxIDQ4MC4wODU3NDEgMCAwIDEgMTA4LjY5MzgyOSAyODMuNDMzMzY1YzAuMzU4Mzg4IDcuNTc3MzM3IDAuNTExOTgyIDE1LjM1OTQ2NyAwLjUxMTk4MiAyMi42ODA4MTNhNDkwLjAxODE5NiA0OTAuMDE4MTk2IDAgMCAxLTUuNzM0MjAxIDc0Ljc0OTQwNiIgZmlsbD0iI2NjY2NjYyIgcC1pZD0iNzMxMSI+PC9wYXRoPjwvc3ZnPg==');
                    }
                    .cms-logo-spinner:before {
                        top: 0;
                        left: 0;
                        content: "";
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        animation: rotates 1s linear infinite;
                        background: center center/100% 100% no-repeat url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMxMzYwNjEzMDkwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc1MjUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODUyLjE3MjY2NCAxNzEuODI3NTQxbDIxLjg2MjM5MS0yMS44NjIzOTFBNTEwLjQxMjU5NiA1MTAuNDEyNTk2IDAgMCAwIDUxMiAwLjAwMDQxdjMwLjcxOTk4N2E0NzkuNzk1MDA4IDQ3OS43OTUwMDggMCAwIDEgMzQwLjE3MjY2NCAxNDEuMTA3MTQ0eiIgcC1pZD0iNzUyNiIgZmlsbD0iI0JGODMyRSI+PC9wYXRoPjwvc3ZnPg==');
                    }
                    @keyframes rotates {
                        0% { transform: rotate(0deg) }
                        100% { transform: rotate(360deg) }
                    }
                </style>
            </head>
            <body>
                <div id="root">${markup}</div>
                <div id="ibp-index-spinner" class="cms-logo-spinner-index cms-logo-spinner"></div>
                <script src="/static/lib.js"></script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    `
);

const justSendHtml = (response) => {
    // 若服务端找不到路由，交给客户端渲染即可
    response.header("Content-Type", "text/html;charset=UTF-8");
    try {
        response.send(html({}));
    } catch (e) {
        response.send(`<div style="padding:30px;color:red;" server>error: ${e.stack}</div>`);
        console.log(e);
    }
};

// 正文开始
// 处理客户端请求
app.get('*', async (request, response) => {
    // 若不需要服务端渲染，直接返回页面内容
    if (!isServerRender) {
        justSendHtml(response);
        return;
    }
    let markup;
    let title;
    let store;
    let preloadState;

    let start;
    let firstStart;
    let cost;

    const requestPath = request.url;

    try {
        const routeConfig = require('../app/routes');
        const { defualt:routes, prepare, matchRouteByPath} = routeConfig;
        const models = require('../app/models');
        const { actions:actionCreators, MenuModel } = models ;
        const { joinRouteTitles } = require('../app/utils/helper');

        if (isBench) {
            start = new Date().getTime();
            firstStart = start;
            console.log("\r\n===<<<<<<<<<    Benchmark start    <<<<<<<<<===");
        }
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

        if (isBench) {
            cost = (new Date().getTime() - start);
            console.log(`Page[${requestPath}] Create Redux Store and Bind ActionCreators(${cost}ms)`);
            start = new Date().getTime();
        }

        // Match Route Configs
        const matchResults = matchRouteByPath(requestPath);
        if (!matchResults || matchResults.length == 0) {
            justSendHtml(response);
            return;
        }
        const firstMatchResult = matchResults[0];
        const { match:topRouteMatch, route:topRoute } = firstMatchResult;
        const { component:Component, title:routeTitle } = topRoute;
        const { getPageTitle=()=>{} } = Component;

        if (isBench) {
            cost = (new Date().getTime() - start);
            console.log(`Page[${requestPath}] Match Route Configs(${cost}ms)`);
            start = new Date().getTime();
        }

        // Preceding Process
        const redirect = {};
        const cookie = { get: (name) => request.cookies[name] };
        const replace = (url) => { redirect.url = url; };
        prepare({ store, path:requestPath, cookie, replace });

        if (isBench) {
            cost = (new Date().getTime() - start);
            console.log(`Page[${requestPath}] Preceding Process(${cost}ms)`);
            start = new Date().getTime();
        }

        // Redirect
        if (redirect.url) {
            response.redirect(302, redirect.url);
            return;
        }

        // Fetch Document title
        // Join all Routes's Titles from Match Results
        const joinsTitle = joinRouteTitles(matchResults);
        title =
            joinsTitle ||
            getPageTitle({...actions, match: topRouteMatch}) ||
            MenuModel.selectors(store.getState()).getCurrentActiveMenuText() ||
            routeTitle;

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

        if (isBench) {
            cost = (new Date().getTime() - start);
            console.log(`Page[${requestPath}] Preload(${cost}ms)`);
            start = new Date().getTime();
        }

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

        if (isBench) {
            cost = (new Date().getTime() - start);
            console.log(`Page[${requestPath}] Server Render(${cost}ms)`);
            start = new Date().getTime();
        }
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

        // 性能统计
        if (isBench) {
            cost = (new Date().getTime() - firstStart);
            console.log(`Page[${requestPath}] Server Process Completed(${cost}ms)`);
            console.log("===>>>>>>>>>    Benchmark end    >>>>>>>>>===\r\n");
        }

        response.header("Content-Type", "text/html;charset=UTF-8");
        response.send(html({title, markup, preloadState}));
    }
});

app.listen(9000, function () {
    console.log('Server listening on http://localhost:9000, Ctrl+C to stop')
})