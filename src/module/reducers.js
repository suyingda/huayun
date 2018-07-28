import {combineReducers} from "redux";
import pub from './pub'
import a from './a'

let reducers = combineReducers({
    pub,
    a
});
export default reducers;
