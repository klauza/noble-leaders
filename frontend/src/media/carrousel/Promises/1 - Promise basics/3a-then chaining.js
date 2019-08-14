// chaining - łączy kilka obietnic

const p = new Promise((resolve, reject) => {
  resolve(5);
})

/*
p.then(result => result*2)
 .then(result => console.log(result));   // wartość w tym result będzie taka jaką zwróciła poprzednia obietnica
*/

/*
p.then(result => result*2)
 .then(result => new Promise((resolve, reject) => resolve(15)))
 .then(result => console.log(result));   // 15
*/

/*
p.then(result => result*2)
 .then(result => result*2)
 .then(result => console.log(result));   // 20
*/

p.then(result => result*2)
 .then(result => Promise.reject(Error('oops!')))
 .then(result => console.log(result))
 .catch(reason => console.log(reason))
 .finally(()=> console.log('Finished'));    // funkcja finally zostanie wykonana za każdym razem, niezależnie od tego co stanie się wcześniej
 // przydaje sie np do wylaczenia ikonki wczytywania
 // ponieważ niezaleznie od tego co sie wydarzylo  resolve czy reject, chcemy poinformowac uzytkownika ze akcja zostala zakonczona
 