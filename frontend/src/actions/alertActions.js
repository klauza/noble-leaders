import { SET_ALERT, CLEAR_ALERT } from '../actions/types';
import uuid from 'uuid';


export const setAlert = (msg, type, timeout = 10000) => async dispatch => {
  const id = uuid.v4();

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