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
      <h3 style={{textAlign: "center", margin: "50px auto", fontWeight: "700"}}>Please log in to access forum</h3>
    )
  }

}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Forum)
