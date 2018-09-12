import {combineReducers} from "redux";
import _PUB from './pub.js';

import _A from './a';
const {first1,first2,first3}=_PUB.reducers;
let reducers = combineReducers({
    first1,first2,first3,
    _A
});
export default reducers;
