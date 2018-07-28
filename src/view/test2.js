import React, {Component} from "react"
import S from "./../Rt"
import {routes} from './../router'
import left from './../view/left.js'
import right from './../view/right.js'
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";

class Test extends Component {

    render() {
        return (<div>
            <h1>test2</h1>
            <Link to="/left">返回</Link>
        </div>)
    }
}

export default Test;