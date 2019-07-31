import { SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState= {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null
}

export default(state = initialState, action) => {
  switch(action.type){

    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return{
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: action.payload
      }
    case SET_LOADING:
      return{
        ...state,
        loading: true
      }
      
    default:
      return state;
  }
}