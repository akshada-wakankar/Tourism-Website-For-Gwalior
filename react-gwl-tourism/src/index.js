import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css'
import App from "./App";
import {Provider} from "react-redux"
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk";
import cartReducer from "./store/reducers/cart"
import authReducer from "./store/reducers/auth";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export const store= createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))

ReactDOM.render(<Provider  store= {store}><App /></Provider>, document.getElementById("root"));
