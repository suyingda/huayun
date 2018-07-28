import React, {Component} from "react"
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'
class Right extends Component {
    render() {
        return (<div style={{width: '500px', height: '1000px', background: '#ccc'}}>Right
            {/*{routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={this.props.match.path}{...route} />)}*/}
            <RouteModule routes={this.props} />
        </div>)
    }
}

export default Right;