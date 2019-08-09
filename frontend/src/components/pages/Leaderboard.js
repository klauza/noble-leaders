import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadUser, userUpdate} from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';
import {getAllUsers} from '../../actions/gameActions';
import Loader from '../layout/Loader';

import laurelsImg from '../../media/laurels.png';

const Leaderboard = ({login: {user, isAuthenticated, loading}, getAllUsers, setAlert, loadUser, userUpdate, game: {users, gLoading}}) => {
  
  const [img, setImg] = useState(true);

  useEffect(() => {

    async function initLeaderBoard(){
      if(localStorage.token){
        await getAllUsers();
        await loadUser();

      } else {
        getAllUsers();
      }
    }

    initLeaderBoard()

    //eslint-disable-next-line
  }, [isAuthenticated]);


  function loadImageAsync(image){
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', event => resolve(img));
      img.addEventListener('erorr', reason => reject(new Error('error')));
      img.src = image
    })
  }
  loadImageAsync(laurelsImg)
    .then(() => setImg(false))
    .catch(reason => console.log(reason));

  const deleteQuote = () => {
    let q = "smthing";
    const updateUserQuote = {
      _id: user._id,
      quote: q.replace("smthing","-"),
      date: new Date()
    }

    async function updateThenLoadUsers(){
      await userUpdate(updateUserQuote);
      await setAlert("Quote deleted", "danger");
      await getAllUsers();
    }
    updateThenLoadUsers();
  }

  if(isAuthenticated){
    if(loading || gLoading || img){ return <Loader />} 
  } else {
    if(gLoading || img){ return <Loader />} 
  }


  return (
    <div className="leaderboard test-animation">
      <h2 className="leaderboard__title">LEADERBOARD</h2>
      <div className="leaderboard__img"><img src={laurelsImg} alt=""/></div>

      <ul className="leaderboard-ul">
        <li className="sticky-li leaderboard-ul__li">
          <span><strong>Highscore</strong></span>
          <span><strong>Name</strong></span> 
          <span><strong>Quote</strong></span>
        </li>

        {users !== null ? 
          (
            (users.map(item => 
            <li className={`leaderboard-ul__li ${isAuthenticated && item.name === user.name && "selected"}`} key={item._id} >
              <span>{item.highscore}</span>
              <span>{item.name}</span> 
              <span>{isAuthenticated && item.quote === "-" && user._id === item._id ? <span className="no-quote"><Link to="/profile">Click to set your quote</Link></span> : item.quote}</span>
              {isAuthenticated && user._id === item._id && item.quote !== "-" && <span className="delete-quote" onClick={deleteQuote}><i className="fa fa-times"></i></span> }
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
export default connect(mapStateToProps, {getAllUsers, loadUser, userUpdate, setAlert})(Leaderboard)
