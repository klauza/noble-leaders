import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {userLogin, loadUser} from '../../actions/loginActions';
import ForumConnected from './ForumConnected';


const Forum = ({login: {user, loading, isAuthenticated}, userLogin, loadUser}) => {

  useEffect(()=>{
    if(localStorage.token && !user){
      loadUser();
    }
    
  // eslint-disable-next-line
  }, [user])

  const logInOnTestacc = async () => {
    await userLogin({
      email: "testacc@test.acc",
      password: "testacc"
    })
    await window.location.reload(true);
  }

  if(!loading && user && isAuthenticated){
    return (
      <ForumConnected user={user} />
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
  login: state.login
})
export default connect(mapStateToProps, {userLogin, loadUser})(Forum)
