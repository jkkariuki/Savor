import { combineReducers, createStore } from "redux";

import ProgressReducer from '../reducers/progress';

const combineReducers = combineReducers({ 
    progress:ProgressReducer;
});

const Store = createStore(combinedReducers);

export default Store;