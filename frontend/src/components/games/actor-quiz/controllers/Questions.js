import PersonCtrl from './PersonCtrl.js';
import LevelCtrl from './Level.js';
import UICtrl from './UICtrl.js';



const QuestionsCtrl = (function(){
  
  const question = {
    cookie_1_name: '',
    cookie_2_movie: '',
    cookie_3_actor: '',
    cookie_4_friends: '',
    correctAnsw: ''
  }


  return{
    
    getMovieCookie: function(){
       return question.cookie_2_movie
    },
    getActorCookie: function(){
       return question.cookie_3_actor
    },

    showQuestion: function(level){
      
      // display block with questions
      QuestionsCtrl.animateBlocksIn();

      // let allAnswers = document.querySelector('.answers');
      // let answers = Array.from(allAnswers.children);
      let answers = document.querySelectorAll('.test-text');
      // console.log(answers);
      // get chosen actor's data
      let actor = PersonCtrl.getPerson();
      
      // initialize the array to fill with answers
      let answerArray = [];


      switch(level){
        case 1:
          let actorName = actor.title;
          question.correctAnsw = actorName;   // set correct answer

          // random male & female
          let randomName_1;
          let randomName_2;

          if(actor.gender !== 'male'){    // female
            randomName_1 = ['Rebecca Da Costa', 'Bridget Moynahan', 'Jessica Sula'];
            randomName_2 = ['Felicity Jones', 'Kristin Scott Thomas', 'Anya Taylor-Joy'];
          } else {                      //male
            randomName_1 = ['Bruce Lee', 'Edward Norton', 'Brad Pitt', 'Robert De Niro', 'Martin Klebba', 'Crispin Glover', 'Sidney Poitier', 'Tom Hanks', 'Forest Whitaker', 'James McAvoy'];
            randomName_2 = ['Morgan Freeman', 'Zach Grenier', 'David Shumbris', 'Nicolas Cage', 'Will Smith', 'Cary Grant', 'Alan Tudyk', 'Diego Luna', 'Guy Henry'];
          }
          
          // random index
          let randomId_1 = Math.floor( Math.random() * randomName_1.length );  
          let randomId_2 = Math.floor( Math.random() * randomName_2.length );  

          // populate array
          answerArray = []; // emptying the array with answers
          answerArray.push(actorName, randomName_1[randomId_1], randomName_2[randomId_2]); // correct & wrong answers

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;
        case 2:
          // sum of actor movies
          let actorMoviesAmount = actor.movies.length;  
          let randomActorMovieId = Math.floor(Math.random() * actorMoviesAmount); 
          let actorMovie = actor.movies[randomActorMovieId];
          let actorFriends = actor.companions[randomActorMovieId];


          var getRegexMovie = actorMovie;
          var currentMovie = getRegexMovie.replace(/\|.*$/i,'');
          var currentActorFromMovie = getRegexMovie.replace(/^.*\|/i,'');


          // set cookies
          question.cookie_2_movie = currentMovie;
          question.cookie_3_actor = currentActorFromMovie;
          question.cookie_4_friends = actorFriends;
          question.correctAnsw = currentMovie;

          // hardcoded wrong answers
          let randomMovie1 = ['Lord of War', 'Sabrina', 'Star Wars', 'Fight Club', 'The Green Mile', 'The Matrix', 'Intouchables', 'Cast Away', 'The Butterfly Effect'];
          let randomMovie2 = ['Firewall', 'I, Robot', 'Léon', 'Gladiator', 'The Hangover', 'Se7en', 'Seven Pounds', 'A Beautiful Mind', 'The Da Vinci Code', 'Gran Torino'];
          let randomNumber1 = Math.random() * randomMovie1.length;  
          let random1 = Math.floor(randomNumber1); 
          let randomNumber2 = Math.random() * randomMovie2.length;  
          let random2 = Math.floor(randomNumber2); 

          answerArray = []; // emptying the array with answers
          // put all, wrong and a correct answers in new array
          answerArray.push(currentMovie, randomMovie1[random1], randomMovie2[random2]);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;


        case 3:
          // get the true answer
          let theTrueAnswer = QuestionsCtrl.getActorCookie();
          // set the true answer
          question.correctAnsw = theTrueAnswer;

          // get wrong answers
          let wrongAnswerArr_1 = ['Bob', 'Jack', 'Merlin'];
          let wrongAnswerArr_2 = ['Leon', 'Susan', 'Merry'];
          let randomNr1 = Math.floor( Math.random() * wrongAnswerArr_1.length );  
          let randomNr2 = Math.floor( Math.random() * wrongAnswerArr_2.length );  

          answerArray = []; // emptying the array with answers
          answerArray.push(theTrueAnswer, wrongAnswerArr_1[randomNr1], wrongAnswerArr_2[randomNr2]);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;


        case 4:
          // get a correct answer
          let trueFriend = question.cookie_4_friends;

          //get the true random answer
          let randomFriendIndex = Math.floor( Math.random() * trueFriend.length );  
          // set randomized friend
          trueFriend = trueFriend[randomFriendIndex];
          // set a correct answer
          question.correctAnsw = trueFriend;

          // get wrong answers
          let randomFalseArr_1 = ['Sauron', 'R2D2', 'Shrek'];                             
          let randomFalseArr_2 = ['Julian from Madagaskar', 'Michael Jordan', 'Saruman'];  
          let randomIndex_1 = Math.floor( Math.random() * randomFalseArr_1.length ); 
          let randomIndex_2 = Math.floor( Math.random() * randomFalseArr_2.length ); 

          answerArray = []; // emptying the array with answers
          answerArray.push(trueFriend, randomFalseArr_1[randomIndex_1], randomFalseArr_2[randomIndex_2]);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);
          break;

        default:
          break;
        
      }

      function getRandomAnswer(){
        let randomNum = Math.random() * answerArray.length;  
        let random = Math.floor(randomNum);
        return random;
      }

      function fillAnswers(getRandomAnswer, answerArray){
        if(answers[0].textContent === ''){
       
          const randomAnswerId = getRandomAnswer();   // variable for id of randomized answer
          
          // put random answer into first block
          answers[0].textContent=answerArray[randomAnswerId];

          // delete answer with this id from answerArray
          answerArray.splice(randomAnswerId, 1);   
          
          fillAnswers(getRandomAnswer, answerArray);   // run the whole function again!

        } else if(answers[1].textContent === ''){
          const randomAnswerId = getRandomAnswer();
          answers[1].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          
          fillAnswers(getRandomAnswer, answerArray);  // run the whole function again!

        } else if(answers[2].textContent === ''){
          const randomAnswerId = getRandomAnswer();
          answers[2].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          
          fillAnswers(getRandomAnswer, answerArray);  // run the whole function again!

        } else {
          return
        }
      }
      
      // GUESSING THE ANSWER
      answers.forEach((button)=>{
        button.addEventListener('click', QuestionsCtrl.tryGuess);
      })
      
    },  

    tryGuess: function(){
      let guess = this.textContent;   // string of clicked answer
      let correctAnswer = question.correctAnsw;   // string of correct answer

      if (correctAnswer === guess){ 
        console.log('correct!');
        QuestionsCtrl.animateBlocksAway();  // animate blocks away
        LevelCtrl.IncreaseScoreByOne(); // incement score 

        let level = LevelCtrl.getLevel();   // get level
        UICtrl.setIndicator(level, 'green'); // set indicator color to green

        if(level === 4){        // On actor complete
          UICtrl.continueGame();     // go to next actor

        } else {
          let rndCorrectText =["Correct! Proceed to next question.", "Amazing! Great answer!", "That's right answer."];
          let rnd_i = Math.floor(Math.random()*3);
          document.querySelector('.welcome-text').textContent = rndCorrectText[rnd_i]; // change text before level 2 start
          LevelCtrl.initText();     // go to next level
        }
      

      } else {
        console.log('bad answer! Game over!');
        UICtrl.gameOver();
      }
    },
    
    animateBlocksIn: function(){
      document.querySelector('.answers').style.display = "flex";  // container show
      
      const blockAnswers = document.querySelectorAll('.answer');
      let delay;
      setTimeout(()=>{
        blockAnswers.forEach((answer, index)=>{
          delay = 75 * index;
          answer.style.opacity = "1";
          answer.style.transform = "translateX(0px)";
          answer.style.transitionDelay = delay+'ms';
        });
      }, 1);
    },

    animateBlocksAway: function(){
        const blockAnswers = document.querySelectorAll('.answer');
        let delay;
        blockAnswers.forEach((answer, index)=>{
          delay = 75 * index;
          answer.style.transition = 'all 125ms ease';
          answer.style.transitionDelay = delay+'ms';
          answer.style.transform = "translateX(-200px)";
          answer.style.opacity = 0
        });
       
        delay = 75 * blockAnswers.length;
        setTimeout(()=>{
          QuestionsCtrl.clearAnswers();  // empty string of answers
          QuestionsCtrl.hideAnswers();   // hide block 'answers'
        }, delay);
    },

    clearAnswers: function(){ 
      let answers = document.querySelectorAll('.test-text');
      answers.forEach((answer)=> {answer.textContent=''}); // loop
      
    },
    hideAnswers: function(){
      document.querySelector('.answers').style.display = "none";    // hide buttons
    }

  }

})();

export default QuestionsCtrl;