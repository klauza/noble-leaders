import LocalStorageCtrl from './LocalStorage.js';
import LevelCtrl from './Level.js';
import PersonCtrl from './PersonCtrl.js';


const UICtrl = (function(){

  const person = {
    items: []   // stores all characters from renderPeople
  }
  const database = {
    game: null
  }

  return {

    showScore: function(){
      let score = LocalStorageCtrl.getScore(); // get score
      LevelCtrl.updateScoreFromLS(score);
      if( score.length === 0 ){ score=Number(score); }  // sets score to 0 if the LS does not exist yet
      document.querySelector('.scoreValue').textContent = score; 
    },

    getPersonById: function(id){
      let found = null;
      person.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });

      return found;
    },

    entryAnimations: function(){

      document.querySelector('.actor-game').style.opacity = "1";
      document.querySelector('.actor-game').style.transition = "650ms opacity ease";
      
      document.querySelector('.welcome-text').style.opacity = "1";
      document.querySelector('.welcome-text').style.transition = "500ms all ease-in-out";



      // document.querySelector('.fill-background-top').style.transform = "translateY(0px)";
      // document.querySelector('.fill-background-top').style.opacity = "1";
      // document.querySelector('.fill-background-top').animation = "swing-bottom-bck 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    },

    renderPeople: function(data){





    
      // get actor ids data from ls to be filtered
      let idsFromLS = LocalStorageCtrl.getIdFromStorage();
      
      // filter out completed actors and create new array 'filtered'
      var filtered = data.filter(function(e){
          return this.indexOf(e.id) < 0;
        }, idsFromLS
      );
      
      let output = '';

      // check if game is completed     ------------------------------ GAME COMPLETED ---------------------------------
      //eslint-disable-next-line
      if(filtered == ''){
      
          UICtrl.winGame();
      
        console.log('You won! The game over!');
       

      } else {

        filtered.forEach(function(post, index){

          person.items.push(post);  // put each json unit into person.items
          let delay = index*150;
          output += 
          `
          <div id="${post.id}" class="person-block" style="animation-delay: ${delay}ms">
            <div class="person-block_img">
              <img class="front" src="${post.image}">
              <img class="back ${post.adjust}" src="${post.gif}">
            </div>
          </div>
          `;
          
        });

        /* "?" Random Block "?" */
        let actorLength = filtered.length;  // get number of actors
        let delay = actorLength*150;
        output += 
        `
        <div class="random-block" style="animation-delay: ${delay}ms">
            <div class="random-block_img">
              <img src="./api/imgs/random.png">
            </div>
          </div>
        `;
        
        document.querySelector('.content').innerHTML = output;
        return data
      }
    },

   
    // Add Animation on clicked person [ starting phase ]
    getItemClickEvents: function(){
      const persons = document.querySelectorAll(".person-block");
      persons.forEach((person)=>{
        person.addEventListener('click', function(){

          setTimeout(()=>{
            document.querySelector('.fill-background-top > .welcome-text').style.opacity ="0";
          }, 150);

          setTimeout(()=>{
            let textNode = document.querySelector('.welcome-text');
            // let parent = document.querySelector('.fill-background-top');
            
            textNode.style.animation = "animationText forwards 2.5s";
            textNode.textContent = "Okay, let's start!";
            document.querySelector('.next-question-container').style.opacity = "1";
            
          }, 625)


          
          // Setting the coords of person
          let clickedPerson = this;
          let clickedPersonCoords = this.getBoundingClientRect();
          //console.log(clickedPersonCoords);
          let positionLeft = (clickedPersonCoords.x);    // distance from left edge
          let positionTop = (clickedPersonCoords.y);          // distance from top edge

          let contentWidth = document.querySelector('.content').getBoundingClientRect().width;
          let personBlockWidth = this.getBoundingClientRect().width;
          personBlockWidth = personBlockWidth/2;
          positionLeft = positionLeft-contentWidth/2;
          positionLeft = positionLeft+personBlockWidth;
          
          positionTop = positionTop-200-15-50; // 200 is height of top grey filler, and 15 is a margin bottom of it, 50 is height of navbar

          // hide siblings of chosen actor
          let content = Array.from(document.querySelector('.content').children);
          content.map((item) => item.style.display ='none' ); // hide all blocks

           
          // set CSS of clicked element
          let personCssSetBeforeAnimation = `display: block; transform: translate(${positionLeft}px, ${positionTop}px);`;
          //clickedPerson.style.cssText = personCssSetBeforeAnimation;
          clickedPerson.style.cssText = personCssSetBeforeAnimation;
          
          // animate chosen block to the top left corner
          personAnimationToTop(clickedPerson);

          // move the item to the top center
          function personAnimationToTop(person){
            setTimeout(function(){
              person.children[0].querySelector('.back').style.opacity = "1";
              person.style.transition = 'transform 2s';
              person.style.transform = `translate(0, -215px)`;
              person.childNodes[1].style.animation = "image-to-top-animate 2s forwards"; // select img to animate
       
            }, 550);
            
          }
          person.style.pointerEvents = "none";    // prevent from clicking multiple times

        
          
        });
       });
       
    },

    setIndicator: function(level, color){
      let indicator = document.querySelector(`.progress_bar--${level}`);
      indicator.style.backgroundColor = color;
    },

    continueGame: function(){
      console.log('Actor questions complete!');

      LevelCtrl.continueButton();
      // add event
      document.querySelector('.next-question-container').addEventListener('click', function(){window.location.reload(true)}); 
      
      document.querySelector('.welcome-text').textContent = "Actor riddles completed!"; // change text before level 2 start
      LocalStorageCtrl.addScore(4);
      let actor = PersonCtrl.getPerson();
      let actorId = actor.id;
      LocalStorageCtrl.setPersonIdToLS(actorId);  // put id to local storage to filter it out at new game
  
    },

    winGame: function(){
      console.log('Game completed');
      UICtrl.fallingDollars();
      let totalScore = LevelCtrl.getScore();
      document.querySelector('#game-over-points').textContent = totalScore + 'points';
      // document.querySelector('.local-storage-reset').style.transform = 'translateY(-600px) translateX(-50%)';
      document.querySelector('.next-question-container').style.display = "none";
      document.querySelector('.content').style.display = "none";
      document.querySelector('.answers').style.display = "none";
      document.querySelector('.welcome-text').style.display = "none";
      document.querySelector('.scoreDiv').style.display = "none";
      document.querySelector('.local-storage-reset').style.display = "none";
      document.querySelector('.game-over').style.display = "grid";
      document.querySelector('.but-updt').click();
     
      LocalStorageCtrl.deletePersonFromLocalStorage();
      LocalStorageCtrl.deleteIdFromLS();
      LocalStorageCtrl.deleteScore();
      
    },

    resetGame: function(){
      // empty local storage
      LocalStorageCtrl.deletePersonFromLocalStorage();
      LocalStorageCtrl.deleteIdFromLS();
      LocalStorageCtrl.deleteScore();
      window.location.reload(true);
    },

    showExitButton: function(){
      document.querySelector('.but-quit').classList.remove('hidden');
      document.querySelector('.but-updt').classList.add('hidden');
    },
    
    gameOver: function(){
      UICtrl.fallingDollars();
      

      let totalScore = LevelCtrl.getScore();
      //eslint-disable-next-line
      if(totalScore == ''){
        totalScore = 0;
      }
      if(totalScore===1){
        totalScore = totalScore+' point';
      } else { 
        totalScore = totalScore+' points';
      }

      let level = LevelCtrl.getLevel();    // get level
      UICtrl.setIndicator(level, 'red'); // set red indicator

      document.querySelector('#game-over-points').textContent = totalScore;
      
      document.querySelector('.next-question-container').style.display = "none";
      
      document.querySelector('.content').style.display = "none";
      document.querySelector('.answers').style.display = "none";
      document.querySelector('.welcome-text').style.display = "none";
      document.querySelector('.scoreDiv').style.display = "none";
      document.querySelector('.local-storage-reset').style.display = "none";
      document.querySelector('.game-over').style.display = "grid";

      // auto click on updt button
      document.querySelector('.but-updt').click();
      LocalStorageCtrl.deletePersonFromLocalStorage();
      LocalStorageCtrl.deleteIdFromLS();
      LocalStorageCtrl.deleteScore();
    },

    getDbScore: function(){
      return database.game.score;
    },

    fallingDollars: function(){

      for(let i =0; i<40; i++){
        let randomTime = Math.random()*6+1;
        let delay = Math.floor(Math.random()*5);
        let leftDistance = Math.random()*1600;    // 200px
        let rotate = Math.random()*100;
        
        
        const dollar = document.createElement('i');
        dollar.className = "dollar fa fa-money";
        dollar.style.left = `${leftDistance}px`;
        dollar.style.transform = `translateX(50%) translateY(0) rotateZ(${rotate}deg)`;
        dollar.style.animation = `falling-dollar-animation ${randomTime}s infinite`;
        dollar.style.animationDelay = `${delay}s`;
        document.querySelector('.actor-game').style.overflow = "hidden";
        document.querySelector('.actor-game').appendChild(dollar);
      }
    },
    
    setCurrentLocally: function(current){
      // it gets game prop here YOU CAN STORE IT IN PRIVATE OBJECT
              database.game = current; // storeProp
    },
    getCurrent: function(){
      return database.game
    }
   
  }
})();

export default UICtrl;