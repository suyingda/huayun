import arr from './data.js';
import {arr2} from './data2.js';
import {request} from './../fetch'
import {createSelector} from "reselect";
import {visibleTodosSelector, XHL_forEach} from './reselect'
function getVisibleTodos(first1) {
    let aaa = [];
    first1 && first1.forEach((v) => {
        aaa.push(v + '苏英大');
    });
    console.log('change!!!')
    return aaa;
}

const all = {
    state: {
        setfooter: "",
        setFooter: "",
    },
    aaa:{
        // visibleTodosSelector:visibleTodosSelector(getVisibleTodos,'first1').reselect,
        visibleTodosSelector: (selectors)=>{
            let aaa=[]
            selectors.first1.forEach((v)=>{
                aaa.push(v+'dsjfldskfldsfsjfk')
            });
            return aaa
        },
        first2:(selectors)=>selectors.first2
    },
    selectors: (state) => {
        /* const fu=  (first1) =>{
             let aaa=[]
        first1.forEach((v) => {
            aaa.push(v + 'update update');
        });
        console.log('change!!!')
        return aaa;
    }*/
        XHL_forEach(getVisibleTodos(state.first1))
        return {
            visibleTodosSelector: visibleTodosSelector(state)
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
                data: [1, 2, 3, 4, 5,'first2']
            })
        },
        c: (v) => (dispatch, getState) => {
            dispatch({
                type: 'cccc',
                data: [1, 2, 3, 4, 5, 6, 66, 7, 8]
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
