// struktura:
//let promiseToCleanTheRoom = new Promise('callback Function which has 2 arguments')

let promiseToCleanTheRoom = new Promise(function(resolve, reject){ // 1st argument - resolve, 2nd argument - reject
  // cleaning the room
  // room is clean
  let isClean = false;

  if(isClean){ 
    resolve('Clean'); 
  } else {
    reject('not clean');
  }

})

// EXECUTING the Promise
promiseToCleanTheRoom.then(function(fromResolve){   // fromResolve = 'Clean'
  console.log('the room is ' + fromResolve)
}).catch(function(fromReject){
  console.log('the room is ' + fromReject)
})

