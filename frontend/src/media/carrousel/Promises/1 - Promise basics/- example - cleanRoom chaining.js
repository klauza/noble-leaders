// dependency - zależność
// once the room is clean, you can remove the garbage, 
// and once the garbage is removed, you want to get the icecream.

let cleanRoom = function(){
    return new Promise(function(resolve, reject){
        resolve('cleaned the room');
    });
};

let removeGarbage = function(message){
    return new Promise(function(resolve, reject){
        resolve(message + ' removed garbage');
    });
};

let winIcecream = function(message){
    return new Promise(function(resolve, reject){
        resolve(message + ' won icecream');
    });
};

//checking one after another
cleanRoom().then(function(result){
    return removeGarbage(result);
}).then(function(result){
    return winIcecream(result);
}).then(function(result){
    console.log('finished ' + result);
})


//checking if all are finished
Promise.all([cleanRoom(), removeGarbage(), winIcecream()]).then(function(){
    console.log('all finished');
});

//you want just one, any of them to be finished
Promise.race([cleanRoom(), removeGarbage(), winIcecream()]).then(function(){
    console.log('one of them is finished');
});
