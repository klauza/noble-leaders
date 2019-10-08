import React, {Fragment, useEffect, useState} from 'react';
import ProfileGameList from './ProfileGameList';
import {connect} from 'react-redux';
import {loadUser, userUpdate, userDelete, logout} from '../../actions/loginActions';
import { getUserGames, createTheGame, deleteGame } from '../../actions/gameActions';
import {setAlert} from '../../actions/alertActions';
import history from '../../history';
import Loader from '../layout/Loader';

import { cup, actor, snake, cards } from '../../media/images';



const Profile = ({login: {isAuthenticated, user, loading}, loadUser, createTheGame, userUpdate, userDelete, logout, getUserGames, deleteGame, setAlert,  game: { games, gLoading }}) => {

  const [img, setImg] = useState(true);
  const [newQuote, setNewQuote] = useState('');

  const imgs = [actor, snake, cards];

  useEffect(() => {
    if(localStorage.token){

      async function profileInit(){
        if(localStorage.token){
          if(!user) await loadUser();
          if(!games) await getUserGames(null);
        } 
      };

      profileInit();

    }else {
      history.push('/');
    }
  
    //eslint-disable-next-line
  }, []);


  console.log(games);

  if(gLoading === false){
    if(games && games.length === 0){
      async function createAllGamesF(){
        await createTheGame({
          name: 'reveal-cards',
          score: 0,
          rating: 0,
          attempts: 0
        });
        await createTheGame({
          name: 'snake',
          score: 0,
          rating: 0,
          attempts: 0
        });
        await createTheGame({
          name: 'actor-quiz',
          score: 0,
          rating: 0,
          attempts: 0
        });
      } 
      createAllGamesF();


    } 
  } 


  function loadAvatarImage(image1, image2){
    return Promise.all([
      new Promise((resolve, reject) => {
        const img1 = new Image();
        img1.addEventListener('load', event => resolve(img1));
        img1.addEventListener('erorr', reason => reject(new Error('error')));
        img1.src = image1
      }),
      new Promise((resolve, reject) => {
        const img2 = new Image();
        img2.addEventListener('load', event => resolve(img2));
        img2.addEventListener('erorr', reason => reject(new Error('error')));
        img2.src = image2
      })
    ])
  }

  if(user){
    loadAvatarImage(user.avatar, cup)
    .then(() => setImg(false))
    .catch(reason => console.log(reason));
  }
 
  const getQuote = () => {

    // fetch a quote
    async function fetchQuote(){
      try{
        const res = await fetch('https://favqs.com/api/qotd');
        const data = await res.json(); 
        return data
        
      } catch(err){
        const data = "Sorry feature currently not available";
        return data
      }

    }
    fetchQuote()
    .then((data) => {
        (data.quote ? 
          ( data.quote.body.length > 125 ? getQuote() : setNewQuote(data.quote.body) )
        :
          ( setNewQuote(data) )
        )
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
      setAlert("Your quote has been updated", "danger");
    }
  }

  const triggerDeleteAccount = () =>{
    if (window.confirm("are you sure?")) {
      if(user.name === "testacc"){
        setAlert("You cannot delete a test account", "danger");
      } else{
        const deleteUserData = {
          _id: user._id
        }
        // add cover-overlay
        // delete games
        userDelete(deleteUserData);   // delete user
        deleteGame(games[2]);
        deleteGame(games[1]);
        deleteGame(games[0]);
  
  
        setTimeout(()=>{
          logout();
          history.push('/');
          window.location.reload();
        }, 1000);
      }

    } 
  }

    
  if(!user){ return <Loader /> } 

  return (
    <Fragment>
    {games && !img && !loading && !gLoading && games.length > 0 &&
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

          <div className="profile__bottom--item firstEmpty">
            <div></div>
            <div className="item-name">game</div>
            <div className="item-score">
              <div className="item-score__highscore">top score</div>
              <div className="item-score__attempts">attempts</div>
            </div>
          </div>

          {games !== null && !gLoading ? games.map((game, i) => <ProfileGameList image={imgs[i]} key={game._id} game={game} />) : null }
        </div>

        <div className="profile__quote profile-quote-animation">
          <h2>Choose quote that suits you the best</h2>
          <div className="profile__quote--buttons">
            <button className="button button-random-quote" onClick={getQuote}><i className="fa fa-comment"></i>Get a random quote</button>
            <button className="button button-update-quote" onClick={updateQuote}><i className="fa fa-thumbs-up"></i>Update a quote</button>
          </div>
          <div className="profile__quote--text">
            <span className="quote">
              {newQuote !== "" && <strong>" </strong>}{newQuote}{newQuote !== "" && <strong> "</strong>}
            </span>
          </div>
        </div>
        
        <div className="profile__delete">
          <h2>Delete account?</h2>
          <button onClick={triggerDeleteAccount}>Delete</button>
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
export default connect(mapStateToProps, {loadUser, createTheGame, getUserGames, deleteGame, userUpdate, userDelete, logout, setAlert})(Profile)