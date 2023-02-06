import {combineReducers,applyMiddleware} from "redux";
import {legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

const Reducer = combineReducers({
    products: productReducer,
})

let initialState = {};

const middleware = [thunk];

const store = createStore(Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;