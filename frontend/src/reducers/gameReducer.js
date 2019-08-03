import { GET_GAMES, GET_GAMES_ERROR, UPDATE_SCORE, UPDATE_SCORE_ERROR, GET_ALL_USERS, GET_USERS_ERROR, CLEAR_ERRORS, SET_CURRENT, CLEAR_CURRENT } from '../actions/types';

const initialState = {
  users: null, 
  users_error: null,
  games: null,
  games_error: null,
  current: null
};

export default(state = initialState, action) => {
  switch(action.type){
    case GET_ALL_USERS:
      return{
        ...state,
        users: action.payload
      }
    case GET_USERS_ERROR:
      return{
        ...state,
        users_error: action.payload
      }

      
    case GET_GAMES:
      return{
        ...state,
        games: action.payload,
        current: action.currentGame
      }
    case GET_GAMES_ERROR:
      return{
        ...state,
        games_error: action.payload
      }

    case UPDATE_SCORE:
      return{
        ...state,
        games: state.games.map((game) => 
          game._id === action.payload._id ? action.payload : game)
      }
    case UPDATE_SCORE_ERROR:
      return{
        ...state,
        games_error: action.payload
      };
    
      
    case CLEAR_ERRORS:
      return{
        ...state,
        users_error: null,
        games_error: null
      }

    case SET_CURRENT:
      return{
        ...state,
        current: action.payload
      }

    case CLEAR_CURRENT:
      return{
        ...state,
        current: null
      }

    default:
    return state;
  }
}