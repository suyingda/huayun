import React, {Component} from "react";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'
import {path} from './../fetch/'

import PropTypes from 'prop-types';
class Left extends Component {
    constructor(arg) {
        super(arg);
        this.state = {
            matchPath: this.props.match.path
        }
    }

    componentDidMount() {/*
        path.user.registerPost()
        path.user.test2(1, 15, "0")*/
    }

    add() {
        let data = {
            id: 1,
            name: '宿营'
        };

        // data     = JSON.stringify(data);
        // let arr = hex_md5(data)
        // console.log(hex_md5(data),213213);
        /*          let b = new Base64();
                  let str = b.encode(JSON.stringify(data));
                  console.log(str,'left')*/


        let path = this.context.routers1(this.state.matchPath, 'cart', data)
        // let path = `${this.state.matchPath}/cart/${GG(data)}`;console.log(path)
        this.props.history.push(path);
    }

    render() {
        console.log(this,'就来看待世界法律考多少分')
        return (
            <div>
                <div
                    style={{
                        width: "200px",
                        height: "500px",
                        border: "1px",
                        background: "white",
                        float: "left"
                    }}
                >
                    <h4>left</h4>
                    <ul>
                        <li>
                            <Link to={this.state.matchPath + '/Footer'}>left </Link>

                        </li>
                        <Link to={this.state.matchPath + '/Cart'}>Cart </Link>
                        <li onClick={this.add.bind(this)}>Cart111111111111111111
                            {/*<Link to={path}>Cart{path}</Link>*/}
                        </li>
                    </ul>
                </div>
                {/*<Right/>*/}
                <div style={{width: "500px", height: "1000px", background: "#ccc"}}>
                    Right
                    <RouteModule routes={this.props}/>
                    {/*{this.props.routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={this.props.match.path}   {...route} />)}*/}
                </div>
            </div>
        );
    }
}
Left.contextTypes = {
    changeValue: PropTypes.func,
    value: PropTypes.string,
    routers1:PropTypes.func,
    routers2:PropTypes.func,
}
export default Left;
