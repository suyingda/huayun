import React, {Component} from "react"
import S from "./../Rt"
import {routes} from './../router'
import left from './../view/left.js'
import right from './../view/right.js'
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import { RouteWithSubRoutes } from "./../router";
import RouteModule from './../Rt'
class Footer extends Component {

    render() {
   console.log(this.props,'footer page render')

        return (<div>
            <h1>footer</h1>
            <Link to="/left/footer/test">test</Link>
            {/*{this.props.routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={this.props.match.path}   {...route} />)}*/}
            <RouteModule routes={this.props}/>
        </div>)
    }
}

export default Footer;