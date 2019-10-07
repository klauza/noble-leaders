import { CREATE_TOPIC, GET_TOPIC, GET_ALL_TOPICS, UPDATE_TOPIC, TOPIC_ERROR } from '../actions/types';
import { CREATE_COMMENT, GET_TOPIC_COMMENTS } from '../actions/types';

const initialState = {
  topics: []
}

export default(state = initialState, action) => {
  switch(action.type){
    case CREATE_TOPIC:
      return{
        ...state,
        topics: action.payload
      }

    default:
      return state
  }

}