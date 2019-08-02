import { GET_GAMES, UPDATE_SCORE, GET_ALL_USERS, GET_USERS_ERROR } from './types';
import axios from 'axios';


export const getAllUsers = () => async dispatch => {
 

  try{
    const res = await axios.get('/api/allusers');
    dispatch({ type: GET_ALL_USERS, payload: res.data });

  } catch(err){
    console.log('error: ',err);
    dispatch({ type: GET_USERS_ERROR})
  }
}