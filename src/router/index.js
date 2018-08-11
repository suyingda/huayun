import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import asyncComponent from './Bundle';
/*iimport add from './../add'
import app from './../App'
mport right from './../view/right''*/
import home from './../home'


// import Footer from './../view/footer'
import Cart from './../view/Cart'
import left from './../view/left'
import test from './../view/test'
import test2 from './../view/test2'


//首页不变，搜索页面是子页面，我把他切割出来作为单独的一个js文件，cb里面有一个default，表示导出带有**default**的容器组件。
// const Footer = (location, cb) => {require.ensure([], require => {cb(null, require('./../view/footer').default)},'Footer')}


const Sandwiches = () => <h2>Sandwiches</h2>;
const f1 = () => <h2>f1</h2>;
const Not = () => <h2>Not</h2>;


const Footer     = asyncComponent(() => require('./../view/footer'));
export const routes = [
    {
        path:'/',
        exact:true,
        component: home,
    },
    {
        path: "/f1",
        component: f1
    },
    {
        path: "/sandwiches",
        component: Sandwiches
    },

    {
        path: "/left",
        component: left,
        children: [
            {
                path: "/Footer",
                component:Footer,
                children: [
                    {
                        path: "/test",
                        component: f1
                    }
                ]
            },
            {
                path: "/cart/:obj",
                component: Cart,
                children: [
                    {
                        path: "/test2",
                        component: test2
                    }
                ]
            },

        ]
    }
].concat(
    [{
        path:'*',
        component: Not,
    }])



export const RouteWithSubRoutes = route => (
            <div>
                <Route
                    path={route.matchpath!=undefined?route.matchpath+route.path:route.path}
                    exact={route.exact}
                    render={props =>  <route.component {...props} routes={route.children}/> }
                />
            </div>
        );


