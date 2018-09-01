import React from "react";

import {connect} from 'react-redux'
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./home";

class Add extends React.Component {
    componentDidMount() {
        this.props.as()
        // this.props.a()
    }

    render() {
        // console.log(this.props.state.pub[0], 'app')
        return (
            <div>
                <Link to="/home">添加</Link>
                <Route path="/home" component={Home}/>
            </div>
        )
    }
}

const mapStateToProps = ((state, props) => {
    // console.log(state, 'mapState')
    return {
        state,
        newdata: state.a
    }
})

function aaaaaa() {
    return {
        type: 'test',
    }
}

function bbbbb() {
    return {
        type: 'setFooter',
    }
}

const mapDispatchToProps = ((dispatch, getState) => {
    return {
        as: () => {
            dispatch({
                type: 'setFooter'
            })
        },
        a: () => {
            dispatch({
                type: 'a',
            })
        }
    }
})

function add() {
    // console.log(1)
    return {
        type: 'test',
    }
}

function adddd() {
    for (var i = 0; i < 50; i++) {
        // console.log('我')
    }
}

function dafdsa() {
    // console.log('我被阻塞了')
}

// function as() {
//     return async (dispatch, getState) => {
//         //分发一个任务
//         dispatch(add())
//         await adddd()
//         dafdsa()
//
//
//     }
// }
const as = () => async (dispatch, getState) => {
    dispatch(add())
    adddd()
    dafdsa()
}
export default connect(mapStateToProps, {as})(Add);

/*
function saveData(data) {
    return {
        type: 'SVAE_DATA',
        date: data
    }
}

exports function getData(){
    return async (dispatch) => {
        const data = await get(`/api`)
        if (result) {
            await dispatch(saveData(data))
        }
    }
}
、redux-thunk中间件的认识
redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
function add() {
    return {
        type: 'ADD',
    }
}

function addIfOdd() {
    return (dispatch, getState) => {
        const currentValue = getState();
        if (currentValue % 2 == 0) {
            return false;
        }
        //分发一个任务
        dispatch(add())
    }*/

