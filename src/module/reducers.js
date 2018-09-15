import {combineReducers} from "redux";
import _PUB from './pub.js';

const {first1, first2, first3} = _PUB.reducers;
let reducers = combineReducers({
    first1, first2, first3,
});
export default reducers;
