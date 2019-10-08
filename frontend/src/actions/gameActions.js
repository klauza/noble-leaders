import {  DELETE_GAME_ERROR, CREATE_THE_GAME, CREATE_GAME_FAIL, SET_GAME_LOADING, GET_GAMES, GET_GAMES_ERROR, UPDATE_SCORE, UPDATE_SCORE_ERROR, GET_ALL_USERS, GET_USERS_ERROR, SET_CURRENT, CLEAR_CURRENT, GET_GAMES_DATA, GET_GAMES_DATA_ERROR } from './types';
import axios from 'axios';


// Get all games - score, attempts, rating (public)
export const getGamesData = () => async dispatch => {
  try{
    const res = await axios.get('/api/games/all');
    dispatch({ type: GET_GAMES_DATA, payload: res.data });

  } catch(err){
    console.log('error: ',err);
    dispatch({ type: GET_GAMES_DATA_ERROR})
  }
}

// Get all users, sorted descending by highscore
export const getAllUsers = () => async dispatch => {
  gameLoading();
 

  try{
    const res = await axios.get('/api/allusers');
    dispatch({ type: GET_ALL_USERS, payload: res.data });

  } catch(err){
    console.log('error: ',err);
    dispatch({ type: GET_USERS_ERROR})
  }
}

// Create one game
export const createTheGame = (theGame) => async dispatch => {
  gameLoading();

  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try{
    
    const res = await axios.post('/api/games', theGame, config);

    // create all games for user
    dispatch({
      type: CREATE_THE_GAME,
      payload: res.data
    })
  } catch(err){
    console.log(err.response);
    dispatch({
      type: CREATE_GAME_FAIL,
      payload: err.response.data.errors
    })
  }
}

export const getUserGames = (game) => async dispatch => {
  gameLoading();
 

  try{
    const res = await axios.get('/api/games');

        // SET CURRENT
        if(game !== null){
          
          res.data.forEach(prop => { 
          
            if(prop.name === game){
              const chosen = prop;
              dispatch({ 
                type: GET_GAMES,
                payload: res.data,
                currentGame: chosen
              });
            
              // load current game
             
            }
          })  
        } else {
          // loading all games
          dispatch({ 
            type: GET_GAMES,
            payload: res.data,
            currentGame: null
          });
        }
      


  } catch(err){
    dispatch({
      type: GET_GAMES_ERROR,
      payload: err.response.msg
    });
  }
}

export const updateGameScore = (game) => async dispatch => {
  gameLoading();
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    const res = await axios.put(`/api/games/${game._id}`, game, config);
    dispatch({
      type: UPDATE_SCORE,
      payload: res.data
    })

  } catch(err){
    dispatch({
      type: UPDATE_SCORE_ERROR,
      payload: err.response.msg
    })
  }
}

export const deleteGame = (game) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    await axios.delete(`/api/games/${game._id}`, game, config);


  } catch(err){
    dispatch({
      type: DELETE_GAME_ERROR,
      payload: err.response.msg
    })
  }
}

// Set current log on Edit
export const setCurrent = (game) => async dispatch => {
  
  try{
    dispatch({
      type: SET_CURRENT,
      payload: game
    })
  } catch(err){
    console.log('error from dispatch: ',err);
  }

}


// Clear current log on Edit
export const clearCurrent = () => async dispatch =>{
  dispatch({
    type: CLEAR_CURRENT
  })
}

export const gameLoading = () => async dispatch => {
  dispatch({type: SET_GAME_LOADING})
}