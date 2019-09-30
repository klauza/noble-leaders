import { SET_GAME_LOADING, CREATE_THE_GAME, CREATE_GAME_FAIL, GET_GAMES, GET_GAMES_ERROR, UPDATE_SCORE, UPDATE_SCORE_ERROR, GET_ALL_USERS, GET_USERS_ERROR, CLEAR_ERRORS, SET_CURRENT, CLEAR_CURRENT, GET_GAMES_DATA, GET_GAMES_DATA_ERROR } from '../actions/types';

const initialState = {
  users: null, 
  users_error: null,
  games: null,
  games_error: null,
  current: null,
  gLoading: true,
  gamesData: null
};

export default(state = initialState, action) => {
  switch(action.type){

    case GET_GAMES_DATA:
      return{
        ...state,
        gamesData: action.payload
      }

    case GET_ALL_USERS:
      return{
        ...state,
        users: action.payload,
        gLoading: false
      }
    case GET_USERS_ERROR:
      return{
        ...state,
        users_error: action.payload
      }

    case CREATE_THE_GAME:
      // console.log('reducer - create game: ', action.payload);
      return{
        ...state,
        games: [action.payload, ...state.games],
        gLoading: false
      }
    case CREATE_GAME_FAIL:
      return{
        ...state,
        games_error: action.payload
      }

    case GET_GAMES:
      return{
        ...state,
        games: action.payload,
        current: action.currentGame,
        gLoading: false
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
          game._id === action.payload._id ? action.payload : game),
        gLoading: false
      }
    case GET_GAMES_DATA_ERROR:
    case UPDATE_SCORE_ERROR:
      return{
        ...state,
        games_error: action.payload,
        gLoading: false
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
    case SET_GAME_LOADING:
      return{
        ...state,
        gLoading: true
      }

    default:
    return state;
  }
}