import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import ForumConnected from './ForumConnected';


const Forum = ({login: {user, loading, isAuthenticated}, loadUser}) => {

  useEffect(()=>{
    if(localStorage.token && !user){
      loadUser();
    }
    
  // eslint-disable-next-line
  }, [])

  if(!loading && isAuthenticated){
    return (
      <ForumConnected user={user} />
    )
  } else if(localStorage.token){
    return(
      <div>Loading</div>
    )
  } else{
    return(
      <div>please log in; no forum is for everybody, but only logged in users can post threads</div>
    )
  }

}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Forum)
