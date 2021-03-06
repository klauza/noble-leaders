import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import alertReducer from './alertReducer';
import gameReducer from './gameReducer';
import miscReducer from './miscReducer';
import forumReducer from './forumReducer';

export default combineReducers({
  login: loginReducer, // object reducers
  alert: alertReducer,
  game: gameReducer,
  misc: miscReducer,
  forum: forumReducer
});