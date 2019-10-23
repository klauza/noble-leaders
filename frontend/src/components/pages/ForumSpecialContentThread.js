import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/loginActions';
import forumData from './ForumContentThreadData';
import Loader from '../layout/Loader';
import Statistics from './ForumSpecialArticles/Statistics';

const ForumSpecialContentThread = ({props, login: {isAuthenticated}, loadUser}) => {

  const articleName = props.match.params.thread;

  const [currentTopic, setCurrentTopic] = useState(forumData.filter(topicName => topicName.link === articleName));

  useEffect(()=>{

    loadUser();

    if(isAuthenticated){
      // get a topic
      setCurrentTopic(forumData.filter(topicName => topicName.link === articleName));
    }
  }, [isAuthenticated])

  console.log(isAuthenticated);

  if(isAuthenticated){
    
  return (

    <div className="forum-content-wrapper">

      <button className="general-back-button" onClick={()=>history.goBack()}>Back</button>

      <div className="forum-content-thread">

        <Statistics />
      

      </div>
    </div>
    
  )
  
  } else if(localStorage.token){
    return(
      <Loader />
    )
  } else {
    return(
      <div>
        please log in
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  props: ownProps,
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(ForumSpecialContentThread)
