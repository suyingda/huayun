import arr from './data.js';
import {arr2} from './data2.js';
import {request} from './../fetch'
import {createSelector} from "reselect";
import Reselect from './reselect'

const all = {
    state: {
        setfooter: "",
        setFooter: "",
    },
    selectors: (state) => {
        const getVisibleTodos=(vv)=> {
           return  vv.filter((v)=>{ return 0==v%2});
        };
        const todosSelector = (state) => state.first1;
        return {
            visibleTodosSelector: createSelector(
                [todosSelector],
                (first1) => {
                    return getVisibleTodos(first1)
                }
            ),
            abccc: 123
        }
    },
    actions: {

        as: (v) => (dispatch, getState) => {
            /*      return all.Api.asApi().then((v) => {
                      return v;
                  }).catch((error)=>{
                      console.log(error,'接口获取失败')
                      return 0;
                  });*/
            dispatch({
                type: 'setFooter',
                data: arr
            })
        },
        aadf: (v) => (dispatch, getState) => {
            dispatch({
                type: 'set3',
                data: [1, 2, 3, 4, 5]
            })
        },
        c: (v) => (dispatch, getState) => {
            dispatch({
                type: 'cccc',
                data: [1, 2, 3, 4, 5,6,66,7,8]
            })
        }
    },
    Api: {
        asApi: () => {
            return request('/project/projectApi/searchById', ["afc24d3e-6667-45f2-9b42-07c86280d58a"]);
        }
    },
    reducers: {
        first1: (data = [], action) => {

            switch (action.type) {
                case "setFooter":
                    return action.data;
                default:
                    return data;
            }
        },
        first3: (data = [], action) => {
            switch (action.type) {
                case "cccc":
                    return action.data
                default:
                    return data;
            }
        },
        first2: (data = [], action) => {
            switch (action.type) {
                case "set3":
                    return action.data
                default:
                    return data;
            }
        }
    }


}

/*
function all(data = [], action) {
    // console.log(action,'pub')
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
    })

    switch (action.type) {
        case "add":
            return [
                ...data,
                {
                    title: action.title
                }
            ];
        case "setHeader":
            return [
                {
                    footer: '我是setHeader'
                }
            ];
        case "setFooter":
            return [
                {
                    footer: 'footer'
                }
            ];
        case "test":
            return [
                {
                    footer: 'test'
                }
            ];

    }
    return data


}*/

export default all;
