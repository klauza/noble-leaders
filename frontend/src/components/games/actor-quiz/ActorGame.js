import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { loadUser, userUpdate } from '../../../actions/loginActions';
import { getUserGames, updateGameScore, setCurrent } from '../../../actions/gameActions';
import UpdateThisGame from '../UpdateThisGame';

import LocalStorageCtrl from './controllers/LocalStorage.js';
import UICtrl from './controllers/UICtrl.js';
import PersonCtrl from './controllers/PersonCtrl.js';
import LevelCtrl from './controllers/Level.js';
import Loader from '../../layout/Loader';
import backgroundImage from '../../../media/games/actor-game-bg.jpg';


const ActorGame = ({login: {isAuthenticated, user, loading}, setAlert, loadUser, getUserGames, updateGameScore, userUpdate, setCurrent, game: { games, current, gLoading }}) => {

  const [img, setImg] = useState(true);
  const [entryAttempts, setEntryAttempts] = useState(null);
  const [theEntryScore, setTheEntryScore] = useState(null);
  const [theRoundScore, setTheRoundScore] = useState(null);

  useEffect(() => {

    function loadImageAsync(image){
      return new Promise((resolve, reject) => {
        const img1 = new Image();
        img1.addEventListener('load', event => resolve(img1));
        img1.addEventListener('erorr', reason => reject(new Error('error')));
        img1.src = image
      })
    }

    if(localStorage.token) {
    
        async function actorGameInit(){
          await loadUser();
          if(entryAttempts === null) await getUserGames("actor-quiz");
          if(current && current.name === "actor-quiz" && entryAttempts === null) await setEntryAttempts(prevState => current.attempts + 1);
          if(current && current.name === "actor-quiz") await setTheEntryScore(current.score);
       
          try{
            
            await loadImageAsync(backgroundImage)
              .then(() => setImg(false))
              .then(() => App.init())
              .catch(reason => console.log(reason));
           
          } catch(err){
            console.log('avoided crash');
          }
     
        }
        actorGameInit();
       
    } else {
      try{
        loadImageAsync(backgroundImage)
          .then(() => setImg(false))
          .then(()=> App.init() )
          .catch(reason => console.log(reason));
      } catch(err){  }
    }
    //eslint-disable-next-line
  }, [current]);

  
    const App = (function(UICtrl, PersonCtrl, LevelCtrl, LocalStorageCtrl){
      
        // Event Listeners
        const loadEventListeners = function(){
          
          // console.log(entryAttempts);
          displayDataFromAPI();
         
        document.querySelector('.local-storage-reset').addEventListener('click', UICtrl.resetGame); // reset the whole game

      }
    
        ///////////-GAME INIT-//////////
    
      // get API from local file
      function displayDataFromAPI(){
        LevelCtrl.setLevelZero();
        
        
        fetch('./api/actor-game')
          .then(res => res.json())
          .then(data => {
            UICtrl.showScore();
            UICtrl.renderPeople(data);    // render actors on screen
            UICtrl.entryAnimations();
            
          })
          .then(()=>{
            UICtrl.getItemClickEvents(); //animations and stuff apply to each block of person
            document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)}); //add listener to each block
            document.querySelector('.random-block').addEventListener('click', randomPerson);
          })
          .catch(err => {});
      }
      
    
      ///////////-GAME START-//////////
    
      const personClick = function(){   
        let id = parseInt(this.id); // get the ID of chosen actor
        let person = UICtrl.getPersonById(id);  // get json person

        document.querySelector('.progress_bar').style.animation = "progress-bar-animation forwards 1500ms";
        document.querySelector('.progress_bar').style.animationDelay = "2000ms";
    
        PersonCtrl.savePerson(person);                    // save locally
        LocalStorageCtrl.setPersonToLocalStorage(person); // save to LS
        
        LevelCtrl.initText();   // initialization of game start           /* GAME STARTS HERE */
      }
    
      const randomPerson = function(){
        let allActors = Array.from(document.querySelectorAll('.person-block'));
    
        let actorCount = allActors.length;  // 7
        let id = Math.random() * actorCount;  // from 0 to 6
        id = Math.floor(id);
        
        let pickActor = allActors[id];  //target actor with randomized id
    
        pickActor.click();  // auto-click on actor with random id
      }
    

      return {
        // init: function(games){
        init: function(){
            loadEventListeners();
        },
        refreshGame: function(){
          UICtrl.resetGame();
        },

        appUpdate: function(){
          // If logged in
          if(isAuthenticated){
            // setEntryAttempts(prevState => prevState+1);
            setTheRoundScore( Number(LevelCtrl.getScore()) )
           

            

          } else {
            // If not logged in
            setAlert('please log in to update the score', 'danger');
          }

          
          // show exit button and update
          UICtrl.showExitButton();
        }
           
      }
    })(UICtrl, PersonCtrl, LevelCtrl, LocalStorageCtrl);

    

  if(isAuthenticated){
    if(loading || gLoading || img){ return <Loader />} 
  } else {
    if(img){ return <Loader />} 
  }

  return (
    <div className="actor-game whitedrop">
      <div className="fill-background-top">
        {isAuthenticated ? <span className="user-logged-score">Your best highscore is: {(current !== null) ? current.score : '-'}</span> : <span className="user-not-logged-score">log in to see your score</span>}
        <span className="welcome-text">Welcome, pick an actor/actress to begin.<br/>
          Also feel free to come back later - your progress is being saved.</span>
          
        <div className="social-icons-block">
          <a href="https://github.com/klauza/actorDiscovery"><i className="fa fa-github-square"></i></a>
        </div>
      

        <div className="next-question-container">
          <div className="merge-buttons">
            <div className="button-front"><i className="fa fa-hourglass-half"></i></div>
            <div className="button-top">NEXT <i className="fa fa-angle-double-right"></i></div>
          </div>
        </div>
      </div>

      
      <div className="content">
        {/* ACTOR BLOCKS RENDER HERE */}
      </div>
    

      <div className="progress_bar">
        <div className="progress_bar--1"><span>1</span></div>
        <div className="progress_bar--2"><span>2</span></div>
        <div className="progress_bar--3"><span>3</span></div>
        <div className="progress_bar--4"><span>4</span></div>
      </div>


      <div className="answers">
        <button className="answer" data-num="1"><div className="test-text"></div></button>
        <button className="answer" data-num="2"><div className="test-text"></div></button>
        <button className="answer" data-num="3"><div className="test-text"></div></button>
      </div>
      <div className="tip">Buy a hint for 2 points</div>

      <div className="game-over">
        <h3>The game is over!</h3>
        <p>you have scored <span id="game-over-points"></span></p>
        <button id="restart" className="but-updt" onClick={App.appUpdate}>OK - updt</button>
        <button id="restart" className="but-quit hidden" onClick={App.refreshGame}>EXIT</button>
      </div>
    
      <div className="add-score"><i className="fa fa-plus"></i></div>
      <div className="scoreDiv">your score: <span className="scoreValue"></span> </div>
      <button className="local-storage-reset">Reset Game</button>


      {current && entryAttempts !== null && theEntryScore !== null && theRoundScore !== null ? <UpdateThisGame user={user} current={current} theAttempts={entryAttempts} theGame={"actor-quiz"} setEntryAttempts={setEntryAttempts} setTheEntryScore={setTheEntryScore} theEntryScore={theEntryScore} theRoundScore={theRoundScore} /> : null }
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {loadUser, setAlert, getUserGames, updateGameScore, userUpdate, setCurrent})(ActorGame);
