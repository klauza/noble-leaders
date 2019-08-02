import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import {getAllUsers} from '../../actions/gameActions';

import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {isAuthenticated, loading}, getAllUsers, loadUser, game: {users}}) => {
  useEffect(() => {
    getAllUsers();
    
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
        {users !== null ? 
        (
          (users.map(user => <li key={user._id} className="leaderboard-ul__li" >{user.name} {user.highscore}</li>))
        ) 
        : 
        (
          <p>no user in database</p>
        )
        }
      </ul>

    </div>
      
  )
}

const mapStateToProps = state => ({
  login: state.login,   // state.login -> reducer
  game: state.game
})
export default connect(mapStateToProps, {getAllUsers, loadUser})(Leaderboard)
