import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {userLogin, loadUser} from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import { populateTopics, clearTopicError } from '../../actions/forumActions';
import ForumConnected from './ForumConnected';


const Forum = ({login: {user, isAuthenticated}, userLogin, populateTopics, loadUser, clearTopicError, setAlert, forum: {topics, loading, error}}) => {

  useEffect(()=>{
    if(localStorage.token){
      loadUser();
      populateTopics();

      if(error !== null){
        setAlert(error, "danger");
        clearTopicError();
      }
    }
    
  // eslint-disable-next-line
  }, [loading, error]);


  const logInOnTestacc = async () => {
    await userLogin({
      email: "testacc@test.acc",
      password: "testacc"
    })
    await window.location.reload(true);
  }
  if(!loading && isAuthenticated && topics){
    return (
      <ForumConnected user={user} topics={topics} />
    )
  } else if(localStorage.token){
    return(
      <div>Loading</div>
    )
  } else{
    return(
      <div className="not-logged-div">
        <h3>Please log in to access a forum</h3>
        <button onClick={()=>logInOnTestacc()}><span>Log in as </span><span>Test Account</span></button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  login: state.login,
  forum: state.forum
})
export default connect(mapStateToProps, {userLogin, loadUser, populateTopics, clearTopicError, setAlert})(Forum)
