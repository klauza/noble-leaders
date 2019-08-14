async function foo(){
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('finished'), 1000);
  });

  promise.then(result => console.log('result 1: ',result));
}

foo();

/* --------- */
// okej a teraz dodamy await, aby móc od razu odczytać wartosc tej obietnicy
// bez wykorzystania funkcji .then

async function fuu(){
  const promise = await new Promise((resolve, reject) => {
    setTimeout(() => resolve('finished'), 1000);
  });

  console.log('result 2: ',promise)
}

fuu();