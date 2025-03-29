import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // For async actions
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

// Combine all reducers (for now, only userReducer)
const rootReducer = combineReducers({
  user: userReducer,
});

// Create Redux Store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
