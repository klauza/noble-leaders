import React, {Fragment, useEffect, useState} from 'react';
import ProfileList from './ProfileList';
import {connect} from 'react-redux';
import {loadUser, userUpdate} from '../../actions/loginActions';
import { getUserGames, createTheGame } from '../../actions/gameActions';
import history from '../../history';
import cup from '../../media/puchar.png';
import Loader from '../layout/Loader';

const Profile = ({login: {isAuthenticated, user, loading}, loadUser, createTheGame, userUpdate, getUserGames, game: { games, gLoading }}) => {

  const [img, setImg] = useState(true);
  const [newQuote, setNewQuote] = useState('');
 

  useEffect(() => {
    if(localStorage.token){

      async function profileInit(){
        if(localStorage.token){
          await loadUser();
          await getUserGames(null);
        } 
      };

      profileInit();

    }else {
      history.push('/');
    }
  
    //eslint-disable-next-line
  }, []);


  if(gLoading === false){
    if(games && games.length === 0){
      createTheGame({
        name: 'tomb-raider',
        score: 0
      });
      createTheGame({
        name: 'snake',
        score: 0
      });
      createTheGame({
        name: 'actor-game',
        score: 0
      });

    } 
  } 


  function loadAvatarImage(image){
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', event => resolve(img));
      img.addEventListener('erorr', reason => reject(new Error('error')));
      img.src = image
    })
  }
  if(user){
    loadAvatarImage(user.avatar)
    .then(() => setImg(false))
    .catch(reason => console.log(reason));
  }
 
  const getQuote = () => {
    // fetch new quote
  
    async function fetchQuote(){
      const res = await fetch('https://favqs.com/api/qotd');
      const data = await res.json();
      return data
    }
    fetchQuote()
    .then((data) => {
      setNewQuote(data.quote.body);
    })
  }

  const updateQuote = () => {
    if(newQuote !== ''){

      const updateUserQuote = {
        _id: user._id,
        quote: newQuote,
        date: new Date()
      }
      userUpdate(updateUserQuote);
      console.log('quote updated!');
    }
  }

    
  if(loading || gLoading || img){ return <Loader /> } 

  return (
    <Fragment>
    {games && !loading && !gLoading && games.length === 3 &&
      <div className="profile">

        <div className="profile__top profile-top-animation">
          <div className="profile__top--score">
            <div className="score-title">Your total score</div>
            <div className="score-points">
              <div className="cup"><img src={cup} alt=""/></div>
              <div className="points">{user.highscore}</div>
            </div>
          </div>
          <div className="profile__top--image">
            <div className="user-name"><span>{user.name}</span></div>
            <div className="img-holder"><img src={user.avatar} alt=""/></div>
          </div>
        </div>
        
        
        
        <div className="profile__bottom profile-bot-animation">
          {games !== null && !gLoading ? games.map((game) => <ProfileList key={game._id} game={game} />) : null }
        </div>

        <div className="profile__quote">
          <div className="profile__quote--buttons">
            <button className="button button-random-quote" onClick={getQuote}>Get a random quote</button>
            <button className="button button-update-quote" onClick={updateQuote}>Update quote</button>
          </div>
          <div className="profile__quote--text">
            <span className="quote">
              {newQuote}
            </span>
          </div>
        </div>
        
      </div>
    }
    </Fragment>
 
    
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {loadUser, createTheGame, getUserGames, userUpdate})(Profile)
