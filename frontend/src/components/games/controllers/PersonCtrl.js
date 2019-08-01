const PersonCtrl = (function(){

  const chosenPerson = {
    data: {}
  }

  return {

 

    savePerson: function(data){
      chosenPerson.data = data;
    },

    getPerson: function(){
      return chosenPerson.data;
    },



    changeSkill: function(newSkill){
      chosenPerson.data.skill1 = newSkill;
    }


  }
})();

export default PersonCtrl;