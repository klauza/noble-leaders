import React, {Fragment} from 'react';

//eslint-disable-next-line
import { karta } from '../../../media/images';
// import {lotr1, lotr2, lotr3, lotr4, lotr5, lotr6 } from '../../../media/images';

const CardsEngine = ({cards, isAuthenticated, setTheRoundScore, setEntryAttempts}) => {
  
  
  // animations
  document.querySelector('.board').style.opacity = "1";
  document.querySelector('.board').style.transition = "500ms opacity ease";

  document.querySelector('.main-title').style.opacity = "1";
  document.querySelector('.main-title').style.transition = "500ms opacity ease";
  document.querySelector('.main-title').style.transitionDelay = "1125ms";

  document.querySelector('.score').style.opacity = "1";
  document.querySelector('.score').style.transition = "500ms opacity ease";
  document.querySelector('.score').style.transitionDelay = "1125ms";

  let delay;
  async function asyncCardAnimation(){
    await document.querySelectorAll('.card').forEach((card,index) => {
      card.style.opacity = "1";
      card.style.transitionDelay = index*75+'ms';
      card.style.transform = "rotate(0deg)";
  
    }) 
    delay = 75*document.querySelectorAll('.card').length;;
  }
  asyncCardAnimation().then(()=>{
    setTimeout(()=>{
      document.querySelectorAll('.card').forEach(card => {
        card.style.transitionDelay = "0ms";
      }) ;
    }, delay)
  })



  // getting chosen cards
  var newMap = cards;

  document.getElementById('c0').addEventListener('click', function(){ revealCard(0); });
  document.getElementById('c1').addEventListener('click', function(){ revealCard(1); });
  document.getElementById('c2').addEventListener('click', function(){ revealCard(2); });
  document.getElementById('c3').addEventListener('click', function(){ revealCard(3); });

  document.getElementById('c4').addEventListener('click', function(){ revealCard(4); });
  document.getElementById('c5').addEventListener('click', function(){ revealCard(5); });
  document.getElementById('c6').addEventListener('click', function(){ revealCard(6); });
  document.getElementById('c7').addEventListener('click', function(){ revealCard(7); });

  document.getElementById('c8').addEventListener('click', function(){ revealCard(8); });
  document.getElementById('c9').addEventListener('click', function(){ revealCard(9); });
  document.getElementById('c10').addEventListener('click', function(){ revealCard(10); });
  document.getElementById('c11').addEventListener('click', function(){ revealCard(11); });
   

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
        document.querySelector('.score').textContent = "Attempts: "+turnCounter;

        oneVisible = false;
        compare = null;
      }
    } 
  }
  

    
    
}

function hide2Cards(nr1, nr2){
  try{
    document.querySelector('#c'+nr1).style.opacity = 0;
    document.querySelector('#c'+nr2).style.opacity = 0;
  } catch(err){}

  pairsLeft--;

  if(pairsLeft === 0){
    
    let finalScore;
    //  GAME IS OVER, SENDING UPDATE FUNCTION
    document.querySelector('.play-again').style.display ="block";
    // make score calculations
    if(turnCounter <= 10){
      finalScore = 100 - turnCounter*7;
    } else if(turnCounter>10 && turnCounter <=14){
        finalScore = Math.floor(100 - turnCounter*6.8);
    } else if(turnCounter > 14){
          finalScore = 0;
    }
      
   
    document.querySelector('.score').innerHTML = `<h1>You win with a score of ${finalScore} points!</h1> <br> <h2>Done in ${turnCounter} turns.</h2>`;
    document.querySelector('.score').style.opacity = "1";
    document.querySelector('.board').style.display ="none";
    
    setTheRoundScore(finalScore);
 

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
      
      </Fragment>
    
  )
}

export default CardsEngine
