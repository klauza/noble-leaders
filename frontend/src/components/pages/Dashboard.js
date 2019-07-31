import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';

const Dashboard = ({loadUser}) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      dashboard
    </div>
  )
}

export default connect(null, {loadUser})(Dashboard)
