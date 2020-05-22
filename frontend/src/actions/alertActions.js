import { SET_ALERT, CLEAR_ALERT } from '../actions/types';
import { v4 as uuidv4 } from 'uuid';


export const setAlert = (msg, type, timeout = 2500) => async dispatch => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: {msg, type, id}
  })

  setTimeout(() => {
    dispatch({
      type: CLEAR_ALERT,
      payload: id
    })
  }, timeout)
}