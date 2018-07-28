import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
/*iimport add from './../add'
import app from './../App'
mport right from './../view/right''*/
import home from './../home'


import Footer from './../view/footer'
import Cart from './../view/Cart'
import left from './../view/left'
import test from './../view/test'
import test2 from './../view/test2'




const Sandwiches = () => <h2>Sandwiches</h2>;
const f1 = () => <h2>f1</h2>;
const Not = () => <h2>Not</h2>;



export const routes = [
    {
        path:'/',
        exact:true,
        component:()=>(<div>index</div>)
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
                component: Footer,
                children: [
                    {
                        path: "/test",
                        component: test
                    }
                ]
            },
            {
                path: "/cart",
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
                    render={props => (
                        <route.component {...props} routes={route.children}/>
                    )}
                />
            </div>
        );


