import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import history from '../../history';

const Profile = ({login: {isAuthenticated, user}, loadUser}) => {
  useEffect(() => {
    if(localStorage.token){
      loadUser();
    } else {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

 
  return (
    <div className="container profile">
      <h2 className="mt-5">you are logged in as {user && user.name}</h2>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Profile)
