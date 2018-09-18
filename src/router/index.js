import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import {  Redirect } from 'react-router'

import asyncComponent from './Bundle';
/*iimport add from './../add'
import app from './../App'
mport right from './../view/right''*/
import home from './../home'


import Footer from './../view/footer'
import Cart from './../view/Cart'
import left from './../view/left'
import test from './../view/test'
import test2 from './../view/test2'


//首页不变，搜索页面是子页面，我把他切割出来作为单独的一个js文件，cb里面有一个default，表示导出带有**default**的容器组件。
// const Footer = (location, cb) => {require.ensure([], require => {cb(null, require('./../view/footer').default)},'Footer')}


const Sandwiches = () => <h2>Sandwiches</h2>;
const f1 = () => <h2>f1</h2>;
const Not = () => <h2>Not</h2>;


// const Footer     = asyncComponent(() => require('./../view/footer'));
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
                exact:true,
                children: [
                    {
                        path: "/test",
                        component: f1
                    }
                ]
            },
            {
                path: "/Cart",
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

function Setcookie (name, value)

{

    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";

    //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
      var  c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            var    c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

const routersTo = (t, path, value) => {
    // console.log(path,value,'gg函数')
    let b = new Base64();
    return t + "/" + path + "/" + b.encode(JSON.stringify(value))
}
const routerGet = (value) => {
    let b = new Base64();
    return b.decode(value)
}

export const RouteWithSubRoutes = route =>{
    // Setcookie('suyingda','syd')
/*   console.log(getCookie('suyingda'))
    console.log(route,'route match')*/
    return   <div>
        <Route
            path={route.matchpath!=undefined?route.matchpath+route.path:route.path}
            exact={route.exact}
            // render={props =>  <route.component {...props} routes={route.children}/> }
            render={props => !getCookie('suyingda')?<route.component {...props}  routerGo={routersTo} routerGet={routerGet} routes={route.children}/>:<Redirect to="/sandwiches"/>}

        />
    </div>
};


