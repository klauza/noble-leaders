import { SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// LOAD USER IF(TOKEN)
export const loadUser = () => async dispatch => {
  // load token
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try{
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });

  } catch(err){
    dispatch({ type: AUTH_ERROR})
  }
}

// REGISTER NEW USER
export const userRegister = (user) => async dispatch => {
  console.log(user);
  try{
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });

    loadUser();

  } catch(err){
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    })
  }
} 

export const userLogin = (user) => async dispatch => {

  try{
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    loadUser();

  } catch(err){
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    })
  }
}



export const setLoading = () => {
  return{
    type: SET_LOADING
  }
}