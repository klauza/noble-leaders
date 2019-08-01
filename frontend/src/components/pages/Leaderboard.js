import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {isAuthenticated}, loadUser}) => {
  useEffect(() => {
    if(localStorage.token){
      loadUser();
    }
   
    //eslint-disable-next-line
  }, []);

  return (
    <div className="leaderboard container mt-5">
      <h2 className="leaderboard__title">LEADERBOARD</h2>
      <div className="leaderboard__img"><img src={laurelsImg} alt=""/></div>
      <input className="leaderboard__search" type="text" placeholder="search user" />

      <ul className="leaderboard-ul">
        <li className="leaderboard-ul__li">Bob</li>
        <li className="leaderboard-ul__li">Xaviery</li>
        <li className="leaderboard-ul__li">Sarah</li>
        <li className="leaderboard-ul__li">Elizabeth</li>
        <li className="leaderboard-ul__li">Michael</li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(Leaderboard)
