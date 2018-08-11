import React, {Component} from "react";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'

class Left extends Component {
    constructor(arg) {
        super(arg);
        this.state = {
            matchPath: this.props.match.path
        }
    }

    add() {
        let data = {
            id: 1,
            name: '宿营'
        };
        // data     = JSON.stringify(data);
        let arr = hex_md5(data)
        // console.log(hex_md5(data),213213);
        /*          let b = new Base64();
                  let str = b.encode(JSON.stringify(data));
                  console.log(str,'left')*/


        // let path = `${this.state.matchPath}/cart/${GG(data)}`;
        let path = GG(this.state.matchPath, 'cart', data)
        this.props.history.push(path);
    }

    render() {

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
                            <Link to={this.state.matchPath + '/Footer'}>开启112323 </Link>
                        </li>
                        <li onClick={this.add.bind(this)}>Cart
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

export default Left;
