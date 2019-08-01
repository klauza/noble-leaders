// imports
const LocalStorageCtrl = (function(){

  

  return{


    // SCORE
    getScore: function(){   // display on game start
      let score; 
      if(localStorage.getItem('scoreAmount') === null){
        score = [];

      } else {
        score = JSON.parse(localStorage.getItem('scoreAmount'));
      }
      return score;
    },

    addScore: function(increment){
      let sum = increment;
      let score;
      if(localStorage.getItem('scoreAmount') === null){  // if null set first score
        score = [];
        score=score+sum;  // add X to sum
        localStorage.setItem('scoreAmount', JSON.stringify(score));

      } else {    // if not null, add more
        score = JSON.parse(localStorage.getItem('scoreAmount')); // get existing score
        score=parseInt(score,10)+sum;
        localStorage.setItem('scoreAmount', JSON.stringify(score)); // update score in LS
      }
    },

    deleteScore: function(){
      localStorage.removeItem('scoreAmount');
    },


    // ID
    getIdFromStorage: function(){
      let ids;
      if(localStorage.getItem('actorIdToFilterOut') === null){
        ids = [];
      } else {
        ids = JSON.parse(localStorage.getItem('actorIdToFilterOut'));
      }
      return ids;
    },

    setPersonIdToLS: function(data){  // receive the id of already 'won' actor
      let id = data;
      let existingIds;
      if(localStorage.getItem('actorIdToFilterOut') === null){  // if null set first item
        existingIds = [];
        existingIds.push(id);
        localStorage.setItem('actorIdToFilterOut', JSON.stringify(existingIds));
        // first id stored

      } else {    // if not null, add more
        existingIds = JSON.parse(localStorage.getItem('actorIdToFilterOut'));
        existingIds.push(id);
        localStorage.setItem('actorIdToFilterOut', JSON.stringify(existingIds));
        // another id stored
      }
    },

    deleteIdFromLS: function(){
      localStorage.removeItem('actorIdToFilterOut');
    },


    // PERSON 
    setPersonToLocalStorage: function(data){  
      let person = data;
      let LSperson = [];  // init person in local storage

      LSperson.push(person)
      
      localStorage.setItem('LSperson', JSON.stringify(LSperson));

    },

    deletePersonFromLocalStorage: function(){
      localStorage.removeItem('LSperson');
    },

  }

})();
 
export default LocalStorageCtrl;