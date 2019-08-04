import { SET_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, HIGHSCORE_UPDATE, HIGHSCORE_UPDATE_ERROR, LOGIN_FAIL, LOGOUT, CLEAR_ERROR } from '../actions/types';

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

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
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
    case LOGIN_FAIL:
    case LOGOUT:
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

    case CLEAR_ERROR:
      return{
        ...state,
        error: null
      }

    case HIGHSCORE_UPDATE:
      return{
        ...state,
        user: action.payload,
        loading: false
      }

    case HIGHSCORE_UPDATE_ERROR:
      return{
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state;
  }
}