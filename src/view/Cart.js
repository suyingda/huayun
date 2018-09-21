import React, {Component} from "react";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteWithSubRoutes, routes} from "./../router";
import RouteModule from './../Rt'
import {connect} from 'react-redux';
// import Transition from './../animation/Transition'
import {request} from './../fetch'

import PropTypes from 'prop-types';
import PUB from './../module/pub'
import ChildTwo from "../context/two";
import styles from './csscss/css.css';

class Cart extends Component {
    /*    constructor(props, _this) {
            super(props);
         console.log(_this,'jdsflkdsaf')
        }*/
    componentWillMount() {
        // this.props.as();
        /*  request('/project/projectApi/searchById',["afc24d3e-6667-45f2-9b42-07c86280d58a"]).then((v)=>{
              console.log(v,'就肯定是激发了肯定撒就分厘卡电视机发了')
          });*/
        /*  path.user.registerPost(["PROJ_OBSERVE_AND_IMPOSE_TIME_POINT_TYPE", ""]).then(()=>{
              console.log('successful');
              alert(1)
          }).catch(()=>{
              console.log('error') ;  alert(1)
          })*/
        // console.log(this.props,'actions')
    }

    abc = () => {
        this.props.aadf(3);
    }

    handleChange = (e) => {
        const { changeValue } = this.context
        changeValue(e.target.value)
    }
    render() {
        console.log(this.props);


        // console.time('ss')
        /*    console.log(this.props.first1, 'first1');
            console.log(this.props.first2, 'first2');*/
        // console.timeEnd('ss')
        // let {match} = this.props;
        // console.log(GGG(match.params.obj), '打印成功解析的数据')
        // console.log(b.decode(match.params.obj),'等待着花开');
        //解密

        //将 Blob对象 读成字符串
        // console.log(typeof JSON.parse(this.props.match.params.id),'cart')
        return (

            <div>

                {/*<div className={styles.header}>Cart</div>*/}
                子组件一
                <p>{this.context.value}</p>
                <input onChange={this.handleChange} />

                <ul>

                    <h1 onClick={() => {

                        // const res = await this.props.as(2);
                        // console.log(res,'异步')
                        // res && console.log(res, '先行一步');

                        this.props.as(2);
                    }}>11111111111</h1>
                    <h1 onClick={()=>{

                        this.abc()
                    }}>2222222222</h1>
                    <h1 onClick={() => {
                        this.props.c();
                    }}>33333333333</h1>
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
// import {visibleTodosSelector} from './../module/reselect'
// import {createSelector} from "reselect";

const mapStateToProps = ((state, props) => {
    const {visibleTodosSelector, first2} = PUB.aaa;
    return {
        first1: visibleTodosSelector(state),
        first2: first2(state),
        first3: [1, 2, 3, 4]

        // newdata: state.a
    }
})

const {as, aadf, c} = PUB.actions;
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

Cart.contextTypes = {
    changeValue: PropTypes.func,
    value: PropTypes.string,

}

export default connect(mapStateToProps, {as, aadf, c})(Cart);
