import { GET_GAMES, UPDATE_SCORE, GET_ALL_USERS, GET_USERS_ERROR, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  users: null, 
  users_error: null
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
      
    case CLEAR_ERRORS:
      return{
        ...state,
        users_error: null
      }

    default:
    return state;
  }
}