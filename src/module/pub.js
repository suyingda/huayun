import {arr} from './data.js';
import {arr2} from './data2.js';

const all = {
    selectors: {
        setfooter: "",
        setFooter: "",
    },
    actions: {
        as: (v) => (dispatch, getState) => {
            dispatch({
                type: 'setFooter',
                data: arr
            })

        }, aadf: (v) => (dispatch, getState) => {
            dispatch({
                type: 'set3',
                data:arr2
            })

        }

    },
    reducers: {
        first1: (data = [], action) => {
            console.log(action.type,'frist1')
            console.time('start1')
            switch (action.type) {
                case "setFooter":
                    // let aaa= action.data.sort(function(a,b){return a-b;});
                    return action.data;
                // return action.data;
                default:
                    return data;
            }
        },
        first2: (data = [], action) => {
            console.log(action,'frist2')
            // console.time('start2')
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
