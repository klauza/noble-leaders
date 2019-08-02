import { GET_GAMES, GET_GAMES_ERROR, UPDATE_SCORE, GET_ALL_USERS, GET_USERS_ERROR } from './types';
import axios from 'axios';

// Get all users, sorted descending by highscore
export const getAllUsers = () => async dispatch => {
 

  try{
    const res = await axios.get('/api/allusers');
    dispatch({ type: GET_ALL_USERS, payload: res.data });

  } catch(err){
    console.log('error: ',err);
    dispatch({ type: GET_USERS_ERROR})
  }
}


export const getUserGames = () => async dispatch => {
  try{
    const res = await axios.get('/api/games');

    dispatch({ 
      type: GET_GAMES,
      payload: res.data
    });
  } catch(err){
    dispatch({
      type: GET_GAMES_ERROR,
      payload: err.response.msg
    });
  }
}