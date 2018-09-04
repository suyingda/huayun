import React, {Component} from "react";

import {RouteWithSubRoutes, routes, RouteConfigExample} from "./router";
import left from "./home";
import right from "./add";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
// import {re} from './reducers'

import RouteModule from './Rt'

class App extends Component {

    /*   constructor(arg,_this){
           super(arg);
       }*/


    componentDidMount() {

        // this.props.a()
    }

    /*  static getDerivedStateFromProps(nextProps, prevState) {
          console.log(nextProps,'123')
          console.log(prevState,'456')
          return {
              Name:'第一个更改',
          };
          /!*  if (nextProps.translateX !== prevState.translateX) {
                return {
                    translateX: nextProps.translateX,
                };
            }*!/

      }
      componentDidUpdate(prevProps, prevState) {
          console.log(prevProps,'789')
          console.log(prevState,'000')
          /!*    if (!prevState.isLogin && this.props.isLogin) {
                  this.handleClose();
              }*!/
      }*/
    render() {

        // console.log(this.props,'修改')
        return (
            <BrowserRouter>
                <div>
                    {/*<h1 >{this.props.pub[0]?this.props.pub[0].footer:''}</h1>*/}
                    {/*   <h1 onClick={()=>{
                        console.log(this.props.pub[0].footer)
                    }}>首页</h1>*/}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/left">left</Link>
                            </li>
                            <li>
                                <Link to="/sandwiches">Sandwiches</Link>
                            </li>
                        </ul>
                        {/*<Link to="/add">添加页面</Link>*/}
                    </nav>
                    {/*<RouteConfigExample/>*/}
                    <Switch>
                        {routes.map((route, i) => <RouteWithSubRoutes key={i} excat={route.excat}   {...route} />)}
                    </Switch>
                    {/*<RouteModule routes={this.props}/>*/}
                </div>
            </BrowserRouter>
        );
    }
}

/*App.propTypes = {
    title: React.PropTypes.string.isRequired
}*/

const mapStateToProps = ((state, props) => {
    return state
})
const mapDispatchToProps = ((dispatch) => {
    return {
        /*  a: () => {
              dispatch({
                  type: 'setHeader'
              })
          }*/
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
