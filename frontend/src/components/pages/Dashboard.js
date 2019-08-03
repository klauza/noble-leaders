import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import { getUserGames } from '../../actions/gameActions';
import {Link} from 'react-router-dom';

const Dashboard = ({login: {isAuthenticated}, loadUser, getUserGames}) => {

  useEffect(() => {
    if(localStorage.token) {
      loadUser();
      getUserGames(null);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container dashboard">
      <div className="grid">
        <div className="dashboard-actor-game-cover"><Link to='/actor-game' className="grid-link"></Link></div>
        <div className="dashboard-snake-cover"><Link to='/snake' className="grid-link"></Link></div>
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
export default connect(mapStateToProps, {loadUser, getUserGames})(Dashboard)
