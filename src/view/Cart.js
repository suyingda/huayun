import React, {Component} from "react";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'

class Cart extends Component {
    render() {
        console.log(this.props)
        // console.log(typeof JSON.parse(this.props.match.params.id),'cart')
        return (

            <div>
                Cart
                <ul>
                    <li>
                        <Link to="/left/cart/test2">test2</Link>
                    </li>
                </ul>
                {/*{this.props.routes.map((route, i) => <RouteWithSubRoutes key={i}   matchpath={this.props.match.path} {...route} />)}*/}
                <RouteModule routes={this.props}/>
            </div>
        );
    }
}

export default Cart;
