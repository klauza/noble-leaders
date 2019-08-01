import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';


const About = ({login: {isAuthenticated}, loadUser}) => {
  useEffect(() => {
    if(localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);
  
  return (
    <div className="container about">
      <h2 className="mt-5">About project</h2>
      <p>version 1.0</p>
      <p>Author: github-link</p>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(About)
