// promise

const promise = new Promise((resolve, reject) => {
  //resolve("zrobione!");
  reject(new Error('OOps!'));
});

// console.log(promise);
// [[PromiseStatus]]: "pending" -> zmienia sie w zaleznosci czy executor wykona resolve czy reject
// [[PromiseValue]]: undefined -> po rozwiazaniu obietnicy zmienia sie na wartosc do wywolanego callbacku
// ^-- te wartosci sa prywatne, a wiec nie ma do nich bezposredniego dostepu

// THEN
/*
promise.then(
  result => console.log(result), 
  reason => console.log(reason)); 
*/

// CATCH
/*
promise
.then(result => console.log(result))
.catch(reason => console.log(reason));
*/
