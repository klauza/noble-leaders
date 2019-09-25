import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import ForumConnected from './ForumConnected';


const Forum = ({login: {user, loading, isAuthenticated}, loadUser}) => {

  useEffect(()=>{
    if(localStorage.token){
      loadUser();
    }
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
      <div>please log in</div>
    )
  }

}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Forum)
