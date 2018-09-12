import {createSelector} from "reselect";
let aaa=[];
function getVisibleTodos(first1) {
    first1.forEach((v) => {
        // for(var i =0;i<1000;i++){}
        aaa.push(v + '苏苏苏苏');
    });
    console.log('我没有发横变化啊')
    return aaa;
}

const todosSelector = (state) => state.first1;
export const visibleTodosSelector = createSelector(
    [todosSelector],
    (first1) => getVisibleTodos(first1)
);