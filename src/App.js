import React, {Component} from "react";

import {RouteWithSubRoutes, routes, RouteConfigExample} from "./router";
import left from "./home";
import right from "./add";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
// import {re} from './reducers'
// import './css/css.css'
// import './css/cs.css'
import Styles from './css/cs.css';
import RouteModule from './Rt'
import ChildOne from './context/one'
import ChildTwo from './context/two'
console.log(Styles)
class App extends Component {

    /*   constructor(arg,_this){
           super(arg);
       }*/

    routers1 = (t, path, value) => {
        // console.log(path,value,'gg函数')
        let b = new Base64();
        return t + "/" + path + "/" + b.encode(JSON.stringify(value))
    }
    routers2 = (value) => {
        let b = new Base64();
        return b.decode(value)
    }

    componentDidMount() {
        window.callback = () => _this.callback()
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
    state = {value: ''}
    changeValue = value => {
        this.setState({value})
    }

    getChildContext() {
        return {
            value: this.state.value,
            changeValue: this.changeValue,
            routers1: this.routers1,
            routers2: this.routers2
        }
    }



    render() {

        // console.log(this,'修改')
        return (
            <BrowserRouter>
                <div >
                    <ChildOne/>

                    {/*<h1 >{this.props.pub[0]?this.props.pub[0].footer:''}</h1>*/}
                    {/*   <h1 onClick={()=>{
                        console.log(this.props.pub[0].footer)
                    }}>首页</h1>*/}
                    <nav>
                        <svg style={{width:'100px',height:'100px',color:'red'}}   aria-hidden="true">
                            <use xlinkHref="#icon-bianji"/>
                        </svg>

                        <div className={Styles.aaa}>13213312</div>
                        {/*<div className={aaa}>13213312</div>*/}
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
//这样我们的context中已经注册了config对象了
App.childContextTypes = {
    routers1: PropTypes.func,
    routers2: PropTypes.func,
    value: PropTypes.string,
    changeValue: PropTypes.func
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
