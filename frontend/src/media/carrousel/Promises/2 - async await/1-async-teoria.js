async function foo() {    // słowo kluczowe async umieszczamy przed deklaracją funkcji
  return 1;               // dzieki temu za kazdym razem funkcja ta zwróci obietnice
}

foo().then(alert);        // i dzięki temu, przy jej wywolaniu, mozemy wykorzystac funkcje .then


// czyli to jest to samo co:
function fuu(){
  return Promise.resolve(1);
}
fuu().then(alert);

// czyli słowo async upewnia sie, ze funkcja przy ktorej stoi za kazdym razem zwroci obietnice


-------------------------------------------
2)
// you add 'async' on the beginning and it returns a Promise

async function myFunc(){

   const promise = new Promise((resolve, reject) => {
     setTimeout(() => resolve('Hello'), 1000);
   });

   const error = false;

   if(!error){
     const res = await promise;  // Wait until the promise is resolved
     return res;
   } else {
     await Promise.reject(new Error('something went wrong'));
   }
}

myFunc()
   .then(res => console.log(res))
   .catch(err => console.log(err));

