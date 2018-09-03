import React, {Component} from "react";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'
import {connect} from 'react-redux';
// import Transition from './../animation/Transition'
import {arequest} from './../fetch'
import PUB from './../module/pub'

class Cart extends Component {
    componentWillMount() {
        arequest('http://172.254.68.140:8081/project/projectApi/searchById',["afc24d3e-6667-45f2-9b42-07c86280d58a"]);
      /*  path.user.registerPost(["PROJ_OBSERVE_AND_IMPOSE_TIME_POINT_TYPE", ""]).then(()=>{
            console.log('successful');
            alert(1)
        }).catch(()=>{
            console.log('error') ;  alert(1)
        })*/
        // console.log(this.props,'actions')
    }


    render() {
        // console.time('ss')
        console.log(this.props.first1, 'first1');
        console.log(this.props.first2, 'first2');
        // console.timeEnd('ss')
        let {match} = this.props;
        // console.log(GGG(match.params.obj), '打印成功解析的数据')
        // console.log(b.decode(match.params.obj),'等待着花开');
        //解密

        //将 Blob对象 读成字符串
        // console.log(typeof JSON.parse(this.props.match.params.id),'cart')
        return (

            <div>
                Cart
                <ul>
                    <h1 onClick={() => {
                        this.props.as(1);
                    }}>update Footer</h1>
                    <h1 onClick={() => {
                        this.props.as(2);
                    }}>update Footer</h1>
                    <h1 onClick={() => {
                        this.props.aadf(3);
                    }}>update Footer</h1>
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

// import { createSelector } from 'reselect';
import {visibleTodosSelector} from './../module/reselect'
import {createSelector} from "reselect";

const mapStateToProps = ((state, props) => {
    function getVisibleTodos(vv) {
        // console.log('update success', vv);
        return vv.sort(function (a, b) {
            return b-a;
        });
    }

    const todosSelector = (state) => state.first1;
    const visibleTodosSelector = createSelector(
        [todosSelector],
        (first1) => {
            return getVisibleTodos(first1)
        }
    );
    let aaa=state.first1.sort(function(a,b){return b-a;});
    // let aa2a=state.first2.sort(function(a,b){return a-b;});
    console.timeEnd('start1')
    // console.timeEnd('start2')
    return {
        first1:aaa,
        // first1: visibleTodosSelector(state),
        first2:[1,2,3,4],

        // newdata: state.a
    }
})


/*
const mapDispatchToProps = ((dispatch, getState) => {
    return {
        as: () => {
            dispatch({
                type: 'setFooter'
            })
        },
        aadf: () => {
            dispatch({
                type: 'setHeader',
            })
        }
    }
})*/

const {as, aadf} = PUB.actions;
export default connect(mapStateToProps, {as, aadf})(Cart);
