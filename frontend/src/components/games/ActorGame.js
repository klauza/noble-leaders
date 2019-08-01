import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/loginActions';

import LocalStorageCtrl from './controllers/LocalStorage.js';
import UICtrl from './controllers/UICtrl.js';
import PersonCtrl from './controllers/PersonCtrl.js';
import LevelCtrl from './controllers/Level.js';
import Questions from './controllers/Questions.js';

const ActorGame = ({login: {isAuthenticated}, loadUser}) => {
  
  useEffect(() => {
    if(localStorage.token) {
      loadUser();
      App.init();
    } else{
      App.init();
    }
    //eslint-disable-next-line
  }, []);

    const App = (function(UICtrl, PersonCtrl, LevelCtrl, Questions){

      // Event Listeners
      const loadEventListeners = function(){
        // window.location.reload(true);
        displayDataFromAPI();
        document.querySelector('.local-storage-reset').addEventListener('click', UICtrl.resetGame); // reset the whole game
      }
    
        ///////////-GAME INIT-//////////
    
      // get API from local file
      function displayDataFromAPI(){
        LevelCtrl.setLevelZero();
        console.log('fetch');
        fetch('./actor-game')
          .then(res => res.json())
          .then(data => {
            UICtrl.showScore();
            UICtrl.renderPeople(data);    // render actors on screen
            console.log(data);
            console.log('kloc');
          })
          .then(()=>{
            UICtrl.getItemClickEvents(); //animations and stuff apply to each block of person
            document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)}); //add listener to each block
            document.querySelector('.random-block').addEventListener('click', randomPerson);
          })
          .catch(err => console.log(err));
      }
      
    
      ///////////-GAME START-//////////
    
      const personClick = function(){   
        let id = parseInt(this.id); // get the ID of chosen actor
        let person = UICtrl.getPersonById(id);  // get json person
    
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
        init: function(){
          
          loadEventListeners();
        }
      }
    })(UICtrl, PersonCtrl, LevelCtrl, Questions);
    


  return (
    <div className="actor-game">
      <div className="fill-background-top">
        <span className="welcome-text">Welcome, pick an actor/actress to begin.<br/>
          Also feel free to come back later - your progress is being saved.</span>
          
        <div className="social-icons-block">
          <a href="https://www.linkedin.com/in/michal-klauza-b22318186/"><i className="fa fa-linkedin-square"></i></a>
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
        <button id="restart">ok</button>
      </div>
    
      <div className="add-score"><i className="fa fa-plus"></i></div>
      <div className="scoreDiv">your score: <span className="scoreValue"></span> </div>
      <button className="local-storage-reset">Reset Game</button>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(ActorGame);
