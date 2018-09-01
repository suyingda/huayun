import {arr} from './data.js';
import {arr2} from './data.js';

const all = {
    selectors: {
        setfooter: "",
        setFooter: "",
    },
    actions: {
        as: (v) => (dispatch, getState) => {
            if (v == 1) {
                dispatch({
                    type: 'setHeader',

                })
            } else if (v == 2) {
                dispatch({
                    type: 'setFooter',
                    data:arr
                })
            } else {
                dispatch({ 
                    type: 'set3',
                    data:arr.concat(['苏英大'])
                })
            }

        },
        aadf: (v) => (dispatch, getState) => {
            dispatch({
                type: 'setFooter',
            })
        },

    },
    reducers: {

        first1: (data = [], action) => {

            console.log(action.type)
            switch (action.type) {
                case "setHeader":
                    return 123123123123123123123123;
                case "setFooter":
                    // let aaa= action.data.sort(function(a,b){return a-b;});
                    return arr
                    // return action.data;
                case "set3":
                    return arr
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
