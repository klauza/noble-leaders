import { CREATE_TOPIC, GET_TOPIC, GET_ALL_TOPICS, UPDATE_TOPIC, TOPIC_ERROR, SET_LOADING, CLEAR_FORUM_ERROR } from './types';
import { CREATE_COMMENT, GET_TOPIC_COMMENTS } from './types';
import axios from 'axios';

export const clearTopicError = () => async dispatch => {
  dispatch({ type: CLEAR_FORUM_ERROR })
}

export const createTopic = (topic) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(topic);

  try{
    const res = await axios.post('/api/forum', topic, config);

    dispatch({
      type: CREATE_TOPIC,
      payload: res.data
    })
    
  }catch(err){
    // console.log(err.response);
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.data.msg
    })
  }

}

export const updateTopic = (topic) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try{
    const res = await axios.put(`/api/forum/${topic._id}`, topic, config);
    dispatch({
      type: UPDATE_TOPIC,
      payload: res.data
    })

  } catch(err){
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.msg
    })
  }
}



export const populateTopics = () => async dispatch => {
  try{
    const res = await axios.get('/api/forum');

    dispatch({ 
      type: GET_ALL_TOPICS,
      payload: res.data
    });
  } catch(err){
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.data.errors
    })
  }
}

export const getATopic = (topicLink) => async dispatch => {
  setForumLoading();

  try{
    const res = await axios.get(`/api/forum/${topicLink}`);


    dispatch({ 
      type: GET_TOPIC,
      payload: res.data[0]
    });

  }catch(err){
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.data.errors
    })
  }
}

export const setForumLoading = () => async dispatch => {

  dispatch({
    type: SET_LOADING,
    payload: true
  })
}

// COMMENTS

export const createTopicComment = (id, comm) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try{
    const res = await axios.post(`/api/comments/${id}`, comm, config);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: TOPIC_ERROR,
      payload: err.response.data.errors
    })
  }
}
export const getTopicComments = (id) => async dispatch => {

  try{
    const res = await axios.get(`/api/comments/${id}`);

    dispatch({
      type: GET_TOPIC_COMMENTS,
      payload: res.data
    })

  }catch(err){
    console.log(err);
  }
}