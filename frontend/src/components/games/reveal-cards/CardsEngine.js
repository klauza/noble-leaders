import React, {Fragment} from 'react';

import { karta, ciri, geralt, iorweth, jaskier, triss, yen } from '../../../media/images';
import {lotr1, lotr2, lotr3, lotr4, lotr5, lotr6, lotrCard} from '../../../media/images';

const CardsEngine = () => {
  // randomize deck
  var chosenDeck = Math.floor(Math.random()*2);

  // all deck cards
  var allDecks = [
    [ciri, ciri, geralt, geralt, iorweth, iorweth, jaskier, jaskier, triss, triss, yen, yen ],
    [lotr1, lotr1, lotr2, lotr2, lotr3, lotr3, lotr4, lotr4, lotr5, lotr5, lotr6, lotr6] 
  ];

  var cards = allDecks[chosenDeck]


  

  console.log(chosenDeck);
  var newMap = new Array(12); // create empty array 
  let index = 0;

  try{
    do{
      let randNum = Math.floor(Math.random()*cards.length); // 0 - 11, decreasing
      newMap[index] = cards[randNum];
      cards.splice(randNum, 1);

      index++;
    } while(cards.length > 0);
  }catch(err){}



  var c0 = document.getElementById('c0');
  var c1 = document.getElementById('c1');
  var c2 = document.getElementById('c2');
  var c3 = document.getElementById('c3');

  var c4 = document.getElementById('c4');
  var c5 = document.getElementById('c5');
  var c6 = document.getElementById('c6');
  var c7 = document.getElementById('c7');

  var c8 = document.getElementById('c8');
  var c9 = document.getElementById('c9');
  var c10 = document.getElementById('c10');
  var c11 = document.getElementById('c11');


  try{
    c0.addEventListener('click', function(){ revealCard(0); });
    c1.addEventListener('click', function(){ revealCard(1); });
    c2.addEventListener('click', function(){ revealCard(2); });
    c3.addEventListener('click', function(){ revealCard(3); });

    c4.addEventListener('click', function(){ revealCard(4); });
    c5.addEventListener('click', function(){ revealCard(5); });
    c6.addEventListener('click', function(){ revealCard(6); });
    c7.addEventListener('click', function(){ revealCard(7); });

    c8.addEventListener('click', function(){ revealCard(8); });
    c9.addEventListener('click', function(){ revealCard(9); });
    c10.addEventListener('click', function(){ revealCard(10); });
    c11.addEventListener('click', function(){ revealCard(11); });
  } catch(err){

  }

  var oneVisible = false;
  var turnCounter = 0;
  var visible_nr;
  var lock = false; 
  var pairsLeft = newMap.length / 2;
  var compare;

function revealCard(nr) {
  if(nr === compare){
    return null
  } else {

    let clickedCard = document.querySelector('#c'+nr); 
    var  opacityValue = window.getComputedStyle(clickedCard).getPropertyValue("opacity");
    console.log(opacityValue);

    if(opacityValue !== 0 && lock === false){
      lock = true;
      var obraz ="url(" + newMap[nr] + ")";
  
      document.querySelector('#c'+nr).style.backgroundImage = obraz;
      document.querySelector('#c'+nr).classList.add('cardA');
      document.querySelector('#c'+nr).classList.remove('card');

      if(oneVisible === false){
        //first card
        compare = nr;
        oneVisible = true;
        visible_nr = nr;
        lock = false;
      }else {
    
        //second card
        if(newMap[visible_nr] === newMap[nr]){

          setTimeout(function(){
            hide2Cards(nr, visible_nr);
          },500);

        }else { 

          setTimeout(function(){
              restore2Cards(nr, visible_nr);
          },500);

        }

        turnCounter++;
        document.querySelector('.score').textContent = "Turn counter: "+turnCounter;

        oneVisible = false;
        compare = null;
      }
    } 
  }
  

    
    
}

function hide2Cards(nr1, nr2){
  document.querySelector('#c'+nr1).style.opacity = 0;
  document.querySelector('#c'+nr2).style.opacity = 0;
  pairsLeft--;

  if(pairsLeft === 0){
    document.querySelector('.board').innerHTML = `<h1>You win! <br> Done in ${turnCounter} turns</h1>`
  }
  lock = false;
}

function restore2Cards(nr1, nr2){
  document.querySelector('#c'+nr1).style.background = "url("+karta+")";
  document.querySelector('#c'+nr1).classList.add('card');
  document.querySelector('#c'+nr1).classList.remove('cardA');
  
  document.querySelector('#c'+nr2).style.background = "url("+karta+")";
  document.querySelector('#c'+nr2).classList.add('card');
  document.querySelector('#c'+nr2).classList.remove('cardA');
  
  lock = false;
}

  return (
      <Fragment>
      {/* <div className="cards-game">
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
      </div> */}
      </Fragment>
    
  )
}

export default CardsEngine
