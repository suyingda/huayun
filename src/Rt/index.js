import React, {Component} from "react"
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "./../router";

class RouterModule extends Component {
    render() {
        // console.log('点击了我')
        let {routes, match} = this.props.routes;
        return (<div>
            {routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={match.path!=undefined?match.path:undefined}{...route} />)}
            {/*{routes.map((route, i) => <RouteWithSubRoutes key={i}  {...route} />)}*/}
        </div>)
    }
}

export default RouterModule;