import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import todo from './todo';

export default combineReducers({
  auth,
  todo,
  routing: routerReducer,
});

