import { SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState= {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null
}

export default(state = initialState, action) => {
  switch(action.type){
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }

    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
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