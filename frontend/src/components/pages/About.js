import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';


const About = ({loadUser}) => {
  useEffect(() => {
    loadUser();
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

export default connect(null, {loadUser})(About)
