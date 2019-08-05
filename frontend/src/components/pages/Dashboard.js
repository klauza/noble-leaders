import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import { getUserGames } from '../../actions/gameActions';
import {Link} from 'react-router-dom';
import actorQuizCover from '../../media/games/actor-quiz-cover.jpg';

const Dashboard = ({login: {isAuthenticated}, loadUser, getUserGames}) => {

  const [img, setImg] = useState(true);

  useEffect(() => {
    if(localStorage.token) {
      loadUser();
      getUserGames(null);
    }

    function loadImageAsync(image){
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', event => resolve(img));
        img.addEventListener('erorr', reason => reject(new Error('error')));
        img.src = image
      })
    }
    loadImageAsync(actorQuizCover)
      .then(() => setImg(false))
      .catch(reason => console.log(reason));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container dashboard">
      <div className="grid">
        <div className={`${img ? "image-placeholder" : "dashboard-actor-game-cover"}`}><Link to='/actor-game' className="grid-link"></Link></div>
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
