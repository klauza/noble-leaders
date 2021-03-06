import { CLEAR_ERROR, SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, USER_UPDATE, USER_UPDATE_ERROR, LOGIN_FAIL, LOGOUT, USER_DELETE, USER_DELETE_ERROR } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// LOAD USER IF(TOKEN)
export const loadUser = () => async dispatch => {
  // load token
  setLoading();

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
 
  setLoading();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    const res = await axios.post('/api/users', user, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    
    loadUser();

  } catch(err){
    // console.log(err.response);
    if(err.response.data.errors){
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors
      })
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    } 
  }
} 

export const userLogin = (user) => async dispatch => {
  setLoading();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try{
    const res = await axios.post('/api/auth', user, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser();

  } catch(err){
    
    if(err.response.data.errors){
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors
      })
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Invalid Password"
      })
    }
    
  }
}

export const userUpdate = (user) => async dispatch => {
  
  setLoading();

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    const res = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({
      type: USER_UPDATE,
      payload: res.data
    })

  } catch(err){
    dispatch({
      type: USER_UPDATE_ERROR,
      payload: err.response.msg
    })
  }
}

export const userDelete = (user) => async dispatch => {
  setLoading();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    const res = await axios.delete(`/api/users/${user._id}`, user, config);
    
    dispatch({
      type: USER_DELETE,
      payload: res.data
    })

  } catch(err){
    dispatch({
      type: USER_DELETE_ERROR,
      payload: err.response.msg
    })
  }

}

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT})
}


export const setLoading = () => async dispatch => {
  dispatch({type: SET_LOADING})
}

export const clearError = () => async dispatch => {
  dispatch({type: CLEAR_ERROR})
}