import { combineReducers } from 'redux';         //combineReducers是将应用的state进行组合。

import userReducer from './User.js';

import BreadcrumbReducer from './BreadcrumbReducer';

import SearchKeyReducer from './SearchKey'





export default combineReducers({
    // assetsList,
    userReducer,
    BreadcrumbReducer,
    SearchKeyReducer

});
