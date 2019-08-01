import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import {Link} from 'react-router-dom';

const Dashboard = ({login: {isAuthenticated}, loadUser}) => {

  useEffect(() => {
    if(localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container dashboard">
      <div className="grid">
        <div className="dashboard-actor-game-cover"><Link to='/actor-game' className="grid-link"></Link></div>
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
