import { GET_GAMES, GET_GAMES_ERROR, UPDATE_SCORE, UPDATE_SCORE_ERROR, GET_ALL_USERS, GET_USERS_ERROR, SET_CURRENT, CLEAR_CURRENT } from './types';
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


export const getUserGames = (game) => async dispatch => {
 
  console.log('chosen game in string: ',game);
  try{
    const res = await axios.get('/api/games');

      
        if(game !== null){
          
          res.data.forEach(prop => { 
          
            console.log(prop);
            if(prop.name === game){
              const chosen = prop;
              dispatch({ 
                type: GET_GAMES,
                payload: res.data,
                currentGame: chosen
              });
            
              console.log(prop);
              console.log('current: set');
            }
          })  
        } else {
          console.log('No game found');
          dispatch({ 
            type: GET_GAMES,
            payload: res.data,
            currentGame: null
          });
        }
      

    // dispatch({ 
    //   type: GET_GAMES,
    //   payload: res.data,
    //   currentGame: chosen
    // });
  } catch(err){
    dispatch({
      type: GET_GAMES_ERROR,
      payload: err.response.msg
    });
  }
}

export const updateGameScore = (game) => async dispatch => {
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