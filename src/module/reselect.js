import { createSelector } from 'reselect'

const getKeyword = (state) => state.first1

export  const visibleTodosSelector = createSelector(
    [getKeyword ],
    ( first1) => first1
)