import { SET_ALERT, CLEAR_ALERT } from '../actions/types';

const initialState = [];

export default(state = initialState, action) => {
  switch(action.type){
    case SET_ALERT:
      return[ ...state, action.payload]
      
    case CLEAR_ALERT:
      return state.filter(alert => alert.id !== action.payload)

    default:
      return state
  }
}