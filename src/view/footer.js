import React, {Component} from "react"
import S from "./../Rt"
import {routes} from './../router'
import left from './../view/left.js'
import right from './../view/right.js'
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import { RouteWithSubRoutes } from "./../router";
import RouteModule from './../Rt'
import {connect} from "react-redux";
import {visibleTodosSelector}  from '../module/reselect'
class Footer extends Component {
componentDidMount(){

}
    render() {
        return (<div>
            <h1 onClick={()=>{
                this.props.onTodoClick('苏英大');
                console.log(this.props)
            }}>footer</h1>
            <Link to="/left/footer/test">test</Link>
            {/*{this.props.routes.map((route, i) => <RouteWithSubRoutes key={i}  matchpath={this.props.match.path}   {...route} />)}*/}
            <RouteModule routes={this.props}/>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        todos: visibleTodosSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type:'SHOW_COMPLETED',
                todos:[1,2,3,4,5,6]
            })
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Footer);
