import { CREATE_TOPIC, GET_TOPIC, GET_ALL_TOPICS, UPDATE_TOPIC, TOPIC_ERROR } from './types';
import { CREATE_COMMENT, GET_TOPIC_COMMENTS } from './types';
import axios from 'axios';

export const createTopic = (topic) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try{
    const res = await axios.post(`/api/forum`, topic, config);

    console.log(res);

    dispatch({
      type: CREATE_TOPIC,
      payload: res.data
    })
    
  }catch(err){
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.msg
    })
  }

}