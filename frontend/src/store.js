import {combineReducers,applyMiddleware} from "redux";
import {legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer,productDetailsReducer  } from "./reducers/productReducer";

const Reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer
})

let initialState = {};

const middleware = [thunk];

const store = createStore(Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;