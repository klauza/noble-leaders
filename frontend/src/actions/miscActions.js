import { MISC_CURRENT_LBOARD_PAGE, MISC_SET_BACK_PAGE } from './types';
import { MISC_SET_FORUM_PAGE } from './types';

export const setLeaderboardPage = (page) => async dispatch => {
  dispatch({ 
    type: MISC_CURRENT_LBOARD_PAGE,
    payload: page
  })
}

export const setBackPage = (bool) => async dispatch => {
  dispatch({ 
    type: MISC_SET_BACK_PAGE,
    payload: bool
  })
}

export const setForumPage = (num) => async dispatch => {
  dispatch({
    type: MISC_SET_FORUM_PAGE,
    payload: num
  })
}