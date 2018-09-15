import {createSelector} from "reselect";

/*export const params = (v) => {
    if (v) {
        return v
    } else {
        return v
    }

}
export const params2 = (v) => {
    return v
}
export const actions = (state, v) => {
    if (typeof v == "function") {
        return v(state)
    } else {
        return true;
    }
}

export const XHL_forEach = (first1) => {

    if(typeof first1==='function'){
        console.log(first1(),'打印')
        return first1()
    }else{
        return first1
    }

}*/

/*function getVisibleTodos(first1) {
    let aaa = []
    first1.forEach((v) => {
        aaa.push(v + '苏英大');
    });
    console.log('change!!!')
    return aaa;
}*/
export const visibleTodosSelector =(state,params)=> {
    return {
        reselect:createSelector([(data) => data[params]], (params) =>state(params))
    }

}
/*let aaa = [];

function getVisibleTodos(first1) {
    first1.forEach((v) => {
        aaa.push(v + '苏英大');
    });
    console.log('change!!!')
    return aaa;
}

const todosSelector = (v) => v.first1;*/
/*
export const visibleTodosSelector = createSelector(
    [todosSelector],
    (first1) => getVisibleTodos(first1)
);
*/
/*
export const visibleTodosSelector = createSelector(
    [(v) => v.first1],
    (first1) =>{
        let aaa=[]
        first1.forEach((v) => {
            aaa.push(v + 'update update');
        });
        console.log('change!!!')
        return aaa;
    }
)
*/


/*

 export const visibleTodosSelector=(newData,fun)=>{
     const todosSelector =(v) => v[newData];
     return createSelector(
         [todosSelector],
         (newData) =>  fun(newData)
     );
 }
*/
