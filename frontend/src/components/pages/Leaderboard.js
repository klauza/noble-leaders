import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import {getAllUsers} from '../../actions/gameActions';

import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {user, isAuthenticated, loading}, getAllUsers, loadUser, game: {users, gLoading}}) => {
  
  const [img, setImg] = useState(true);

  useEffect(() => {
    console.log(gLoading);

    
    function loadImageAsync(image){
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', event => resolve(img));
        img.addEventListener('erorr', reason => reject(new Error('error')));
        img.src = image
      })
    }
    
    async function initLeaderBoard(){
      if(localStorage.token){
        await getAllUsers();
        await loadUser();
        await loadImageAsync(laurelsImg)
          .then(() => setImg(false))
          .catch(reason => console.log(reason));

      } else {
        console.log('not auth');
        getAllUsers();
        await loadImageAsync(laurelsImg)
          .then(() => setImg(false))
          .catch(reason => console.log(reason));
      }
      
    }

    initLeaderBoard()

    
    //eslint-disable-next-line
  }, [isAuthenticated]);

  if(isAuthenticated){
    if(loading || gLoading || img){ return <p>loading....</p>} 
  } else {
    if(gLoading || img){ return <p>loading....</p>} 
  }


  return (
    <div className="leaderboard">
      <h2 className="leaderboard__title">LEADERBOARD</h2>
      <div className="leaderboard__img"><img src={laurelsImg} alt=""/></div>
      <input className="leaderboard__search" type="text" placeholder="search user" />

      <ul className="leaderboard-ul">
        {users !== null ? 
        (
          (users.map(item => 
          <li className={`leaderboard-ul__li ${isAuthenticated && item.name === user.name && "selected"}`} key={item._id} >
            <span>{item.highscore}</span>
            <span>{item.name}</span> 
          </li>
          ))
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
