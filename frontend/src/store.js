import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const Reducer = combineReducers({})

let initilaState = {};

const middleware = [thunk];

const store = createStore(Reducer,initilaState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;