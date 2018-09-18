import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducers from "./module/reducers";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
const store = createStore(reducers, applyMiddleware(thunk));
// const store =createStore(reducers)
/* console.log(store.getState());
store.dispatch({
  type: "add",
  title: "苏英大"
});
console.log(store.getState()); */

/*
if (module.hot) {
    module.hot.accept();
}
*/


ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById("root")
);
 if (process.env.NODE_ENV !== 'production'){
       console.log('Looks like we are in development mode!');
   }else{
     console.log('Looks like we are in prod mode!');
 }

