import { CREATE_TOPIC, GET_TOPIC, GET_ALL_TOPICS, SET_LOADING, UPDATE_TOPIC, TOPIC_ERROR } from '../actions/types';
import { CREATE_COMMENT, GET_TOPIC_COMMENTS } from '../actions/types';

const initialState = {
  topics: [],
  current: null,
  loading: true
}

export default(state = initialState, action) => {
  switch(action.type){
    case CREATE_TOPIC:
      return{
        ...state,
        topics: [action.payload, ...state.topics]
      }

    case GET_ALL_TOPICS:
      return{
        ...state,
        topics: action.payload
      }

    case GET_TOPIC:
      return{
        ...state,
        loading: false,
        current: action.payload
      }
    case SET_LOADING:
      return{
        ...state,
        loading: action.payload
      }

    default:
      return state
  }

}