import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';

const Dashboard = ({login: {isAuthenticated}, loadUser}) => {

  useEffect(() => {
    if(isAuthenticated) {
      loadUser();
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="container dashboard">
      <div className="grid">
        <div>1</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Dashboard)
