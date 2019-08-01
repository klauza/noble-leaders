import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  login: loginReducer, // object reducers
  alert: alertReducer
});