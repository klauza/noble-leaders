import { CREATE_TOPIC, GET_TOPIC, GET_ALL_TOPICS, SET_LOADING, UPDATE_TOPIC, TOPIC_ERROR, CLEAR_FORUM_ERROR } from '../actions/types';
import { CREATE_COMMENT, GET_TOPIC_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT } from '../actions/types';

const initialState = {
  topics: [],
  current: null,
  loading: true,
  error: null,
  comments: null
}

export default(state = initialState, action) => {
  switch(action.type){
    case CREATE_TOPIC:
      return{
        ...state,
        topics: [action.payload, ...state.topics]
      }

    case UPDATE_TOPIC:
      return{
        ...state,
        current: action.payload
      }

    case GET_ALL_TOPICS:
      return{
        ...state,
        loading: false,
        current: null,
        comments: [],
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
    case TOPIC_ERROR:
      return{
        ...state,
        error: action.payload
      }

    case CLEAR_FORUM_ERROR:
      return{
        ...state,
        error: null
      }

      // comments
    case CREATE_COMMENT:
      return{
        ...state,
        comments: [action.payload, ...state.comments]
      }
    case UPDATE_COMMENT:
      return{
        ...state,
        comments: state.comments.map((com) => com._id === action.payload._id ? action.payload : com),
      }
    case DELETE_COMMENT: 
    return{
      ...state,
      comments: state.comments.filter(comm => comm._id !== action.payload._id )
    }
    case GET_TOPIC_COMMENTS:
      return{
        ...state,
        comments: action.payload
      }
    default:
      return state
  }

}