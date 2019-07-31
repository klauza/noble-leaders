import { SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
// import axios from 'axios';


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

  } catch(err){
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    })
  }
} 

export const userLogin = () => {

}

export const setLoading = () => {
  return{
    type: SET_LOADING
  }
}