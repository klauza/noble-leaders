import QuestionsCtrl from './Questions.js';
import UICtrl from './UICtrl.js';
import PersonCtrl from './PersonCtrl.js';


const LevelCtrl = (function(){
  
  const storage = {
    score: 0,
    level: 0
  }


  return{
    setLevelZero: function(){
      storage.level=0;
    },
    updateLevel: function(){
      // increment level by 1
      storage.level++;
    },
    getLevel: function(){
      return storage.level
    },
    startButton: function(){
      document.querySelector('.next-question-container').style.display = "block";
      document.querySelector('.merge-buttons').style.transform = "rotateX(90deg) rotateY(0deg) rotateZ(0deg) translateZ(10px)";
    },
    nextButton: function(){
      document.querySelector('.merge-buttons').style.transform = "translateY(20px) rotateX(-90deg) rotateY(0deg) rotateZ(-20deg)";
    },
    waitButton: function(){
      document.querySelector('.merge-buttons').style.transform = "rotateX(0deg) rotateY(20deg) rotateZ(0)"; 
    },
    continueButton: function(){
      document.querySelector('.merge-buttons').style.transform = "rotateX(180deg) rotateY(0deg) rotateZ(0deg)"; 
    },

    initText: function(){
      document.querySelector('.next-question-container').addEventListener('click', LevelCtrl.showLevel); // puts first question
      let level = LevelCtrl.getLevel();
      // console.log(level);
      if(level === 0){
        LevelCtrl.startButton();
      } else {
        LevelCtrl.nextButton(); // animate block to next-level position
      } 

    },

    // show level
    showLevel: function(){
      document.querySelector('.next-question-container').removeEventListener("click", LevelCtrl.showLevel, false);      // remove element from being clickable
      LevelCtrl.waitButton(); //animate back to await position

      LevelCtrl.updateLevel();      //update level

      let level = storage.level;
      switch(level){
        case 1: 
          document.querySelector('.welcome-text').textContent = "What's the actor's name?";
          QuestionsCtrl.showQuestion(1);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          //console.log('level 1');
          break;

        case 2:
          document.querySelector('.welcome-text').textContent = "In which movie has this actor been playing?";
          QuestionsCtrl.showQuestion(2);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          //console.log('level 2');
          break;

        case 3:
          const actorName = PersonCtrl.getPerson().title;
          const actorMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `As whom did ${actorName} play in ${actorMovie}?`;
          QuestionsCtrl.showQuestion(3);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          //console.log('level 3');
          break;

        case 4:
          const actorNameFromMovie = QuestionsCtrl.getActorCookie();
          const chosenMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `Who was ${actorNameFromMovie}'s companion in ${chosenMovie} movie?`;
          QuestionsCtrl.showQuestion(4);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          //console.log('level 4');
          break;
          
        default:
         
          console.log('default from LevelCtrl - actor completed and something went wrong!');
          break;
      }
    },
    
    updateScoreFromLS: function(data){
      storage.score = data;
    },

    IncreaseScoreByOne: function(){
      storage.score++;
      document.querySelector('.scoreValue').textContent = storage.score; 
      document.querySelector('.add-score').style.animation = "add-score-animation 500ms forwards";
      setTimeout(()=>{
        document.querySelector('.add-score').style.animation = '';
      }, 550)
    },

    getScore: function(){
      return storage.score;
    }

  }

})();

export default LevelCtrl;