import { combineReducers } from 'redux';

import { initialData } from './data'


export const Reducer = combineReducers({
    /* your app’s top-level reducers */
    data: initialData
});