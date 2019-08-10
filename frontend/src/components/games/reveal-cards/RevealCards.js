import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/loginActions';
import { getUserGames } from '../../../actions/gameActions';
import CardsEngine from './CardsEngine';


const RevealCards = ({login: {isAuthenticated}, loadUser, getUserGames}) => {
  

  useEffect(() => {
  
    if(localStorage.token) {
      async function revealCardsInit(){
        await loadUser();
        await getUserGames("reveal-cards");

      }
      revealCardsInit();

    } 
    
    //eslint-disable-next-line
  }, []);

  return (
    <div>
    <div className="cards-game">
        <header>
          <h1>Gwent memory test</h1>
          <p>Inspired by Gwent the Witcher Card Game</p>
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
              
              <div className="score">Turn counter: 0</div>
            </div>
          </article>
        </main>
      </div>
      
      {isAuthenticated && 
      <CardsEngine />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser, getUserGames})(RevealCards)
