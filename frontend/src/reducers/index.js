import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import alertReducer from './alertReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  login: loginReducer, // object reducers
  alert: alertReducer,
  game: gameReducer
});