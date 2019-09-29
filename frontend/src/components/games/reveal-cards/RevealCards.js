import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { loadUser, userUpdate } from '../../../actions/loginActions';
import { getUserGames, updateGameScore } from '../../../actions/gameActions';
import { setAlert } from '../../../actions/alertActions';
import UpdateThisGame from '../UpdateThisGame';

import CardsEngine from './CardsEngine';
import Loader from '../../layout/Loader';
import {lotr1, lotr2, lotr3, lotr4, lotr5, lotr6 } from '../../../media/images';
import { ciri, geralt, iorweth, jaskier, triss, yen } from '../../../media/images';
import { lang1, lang2, lang3, lang4, lang5, lang6 } from '../../../media/images';


const RevealCards = ({login: {loading, isAuthenticated, user}, game: { current, gLoading }, setAlert, loadUser, getUserGames, updateGameScore, userUpdate}) => {
  
  const [cards, setCards] = useState(null);
  
  const [entryAttempts, setEntryAttempts] = useState(null);
  const [theEntryScore, setTheEntryScore] = useState(null);
  const [theRoundScore, setTheRoundScore] = useState(null);

  useEffect(() => {
  
    if(localStorage.token) {
      async function revealCardsInit(){
        await loadUser();
        if(entryAttempts === null) await getUserGames("reveal-cards");
        if(current && current.name === "reveal-cards") await setEntryAttempts(current.attempts);
        if(current && current.name === "reveal-cards") await setTheEntryScore(current.score);
        if(entryAttempts !== null) await setEntryAttempts(prevState => prevState+1);
      }
      revealCardsInit();
    } else {
      // not logged in
    }
    
    if(cards === null){
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
    }

    
    //eslint-disable-next-line
  }, [current]);


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
      { (cards === null) ? <Loader /> : <CardsEngine setEntryAttempts={setEntryAttempts} setTheRoundScore={setTheRoundScore} isAuthenticated={isAuthenticated} cards={cards}/> }
      {current && entryAttempts !== null && theEntryScore !== null && theRoundScore !== null ? <UpdateThisGame user={user} current={current} theAttempts={entryAttempts} theGame={"reveal-cards"} setEntryAttempts={setEntryAttempts} setTheEntryScore={setTheEntryScore} theEntryScore={theEntryScore} setTheRoundScore={setTheRoundScore} theRoundScore={theRoundScore} /> : null }
      
     
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  game: state.game
})
export default connect(mapStateToProps, {loadUser, getUserGames, updateGameScore, userUpdate, setAlert})(RevealCards)
