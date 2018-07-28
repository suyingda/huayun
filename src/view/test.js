import React, {Component} from "react"
import S from "./../Rt"
import {routes} from './../router'
import left from './../view/left.js'
import right from './../view/right.js'
import {Prompt,Link, BrowserRouter, Route, Switch} from "react-router-dom";

class Test extends Component {

    render() {
        return (<div>
            <h1>test</h1>
            <Link to="/left">返回</Link>
            <Prompt message="您确定您要离开当前页面吗？"/>
        </div>)
    }
}

export default Test;