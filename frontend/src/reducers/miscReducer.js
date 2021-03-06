import { MISC_CURRENT_LBOARD_PAGE, MISC_SET_BACK_PAGE } from '../actions/types';
import { MISC_SET_FORUM_PAGE } from '../actions/types';

const initialState = {
  currPage: 1,
  isBackPageSet: false,
  forumPage: 0
}

export default(state = initialState, action) => {
  switch(action.type){
    case MISC_CURRENT_LBOARD_PAGE:
      return{
        ...state,
        currPage: action.payload
      }

    case MISC_SET_BACK_PAGE:
      return{
        ...state,
        isBackPageSet: action.payload
      }

    case MISC_SET_FORUM_PAGE:
      return{
        ...state,
        forumPage: action.payload
      }

    default:
      return state;
  }
}