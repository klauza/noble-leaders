import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';

const Profile = ({loadUser}) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container profile">
      <h2 className="mt-5">you are logged in as </h2>
    </div>
  )
}

export default connect(null, {loadUser})(Profile)
