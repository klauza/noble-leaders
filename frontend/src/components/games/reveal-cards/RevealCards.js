import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { loadUser, userUpdate } from '../../../actions/loginActions';
import { getUserGames, updateGameScore } from '../../../actions/gameActions';
import { setAlert } from '../../../actions/alertActions';

import CardsEngine from './CardsEngine';
import Loader from '../../layout/Loader';
import {lotr1, lotr2, lotr3, lotr4, lotr5, lotr6 } from '../../../media/images';
import { ciri, geralt, iorweth, jaskier, triss, yen } from '../../../media/images';
import { lang1, lang2, lang3, lang4, lang5, lang6 } from '../../../media/images';


const RevealCards = ({login: {loading, isAuthenticated, user}, game: { current, gLoading }, setAlert, loadUser, getUserGames, updateGameScore, userUpdate}) => {
  
  const [loader, setLoader] = useState(true);
  const [cards, setCards] = useState(null);

  useEffect(() => {
  
    if(localStorage.token) {
      async function revealCardsInit(){
        setLoader(false);
        await loadUser();
        await getUserGames("reveal-cards");
      }
      revealCardsInit();
    } else {
      setTimeout(() => {
        setLoader(false);
      }, 1)
    }
    

    var allDecks = [
      [ciri, ciri, geralt, geralt, iorweth, iorweth, jaskier, jaskier, triss, triss, yen, yen ],
      [lotr1, lotr1, lotr2, lotr2, lotr3, lotr3, lotr4, lotr4, lotr5, lotr5, lotr6, lotr6] ,
      [lang1, lang2, lang3, lang4, lang5, lang6, lang1, lang2, lang3, lang4, lang5, lang6] 
    ];
    var chosenDeck = Math.floor(Math.random()*3);

    var chosenCards = allDecks[chosenDeck];

    var theCards = chosenCards;
    var newMap = new Array(12); // create empty array 
    let index = 0;
  

    do{
      let randNum = Math.floor(Math.random()*theCards.length); // 0 - 11, decreasing
      newMap[index] = theCards[randNum];
      theCards.splice(randNum, 1);

      index++;
    } while(theCards.length > 0);

    setCards(newMap);
    
    //eslint-disable-next-line
  }, []);



  function updateThePoints(turnCounter){
    console.log(turnCounter);
   
    if(isAuthenticated && current !== null){
      let entryScore = parseInt(current.score, 10);   
      let roundScore = parseInt(turnCounter, 10); 
       setLoader(true);
       document.querySelector('.loader').style.display ="none";
       console.log('loader is: ',loader);
      
      async function updateActorGameScore(){
        if(roundScore > entryScore){
          
        
            setAlert("You have beaten your score, nice job!", 'danger');
            async function sumScore(){
              let userTotalScore = await user.highscore;
              userTotalScore = await userTotalScore - entryScore;
              userTotalScore = await userTotalScore + roundScore;   // just increment total entryScore

          
              // update user's highscore
              const updUserHighscore = await {
                _id: user._id,
                highscore: userTotalScore,
                date: new Date()
              }
              await userUpdate(updUserHighscore);

            
            }
            sumScore();


            async function sumGameScore(){
              // update current game
              const updScore = await {
                _id: current._id,
                score: roundScore,
                date: new Date()
              }
              await updateGameScore(updScore);
            }
            await sumGameScore();
         

      
        } else {
          setAlert("You didn't beat your highscore", 'danger');
          return
        }
        
      }


      async function updt(){
        await updateActorGameScore();
      }
      
      updt();
    
    } else {
      // If not logged in
      setAlert('please log in to update the score', 'danger');
    }
    
  }

  return (
    <div>
      
      <div className="cards-game">
        <header>
          <h1 className="main-title">React Reveal Cards Game</h1>
        </header>
    
        <main>
          <article>
            <div className="board">
              <div className="card" id="c0"></div>
              <div className="card" id="c1"></div>
              <div className="card" id="c2"></div>
              <div className="card" id="c3"></div> 
              
              <div className="card" id="c4"></div> 
              <div className="card" id="c5"></div> 
              <div className="card" id="c6"></div> 
              <div className="card" id="c7"></div> 
              
              <div className="card" id="c8"></div> 
              <div className="card" id="c9"></div> 
              <div className="card" id="c10"></div> 
              <div className="card" id="c11"></div> 
              
            </div>
            <div className="score">Attempts: 0</div>
            <div className="play-again" onClick={()=>window.location.reload(true)}>Play again</div>
          </article>
        </main>
        
      </div>
      { loader ? <Loader /> : <CardsEngine updateThePoints={updateThePoints} isAuthenticated={isAuthenticated} cards={cards}/> }
     
      
     
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {loadUser, getUserGames, updateGameScore, userUpdate, setAlert})(RevealCards)
