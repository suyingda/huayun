import React, {Component} from "react"
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "./../router";

class RouterModule extends Component {
    render() {
        let {routes, match} = this.props.routes;
        console.log(routes)
        return (<div>

            {routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={match.path!=undefined?match.path:undefined}{...route} />)}
        </div>)
    }
}

export default RouterModule;