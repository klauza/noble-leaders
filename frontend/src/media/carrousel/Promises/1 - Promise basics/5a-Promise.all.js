Promise.all(iterable); // argument = obiekt, zwykle jest to tablica obietnic

// example:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 5000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))

]).then(responses => {    // responses = tablica wyników tych obietnic
  console.log(responses); // wypisze po 5-ciu sekundach
});




// example-2:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 5000)),
  new Promise((resolve, reject) => setTimeout(() => reject(Error('ooOps!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))

]).then(responses => {    
  console.log(responses); 
}).catch(err => console.log(err));  // wystarczy jedna odrzucona obietnica, zebysmy nie mieli dostepu do pozostalych wynikow




// example-3: można obsługiwać każde z obietnic od razu
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 5000)).catch(err => console.log(err)),
  new Promise((resolve, reject) => setTimeout(() => reject(Error('ooOps!')), 2000)).catch(err => console.log(err)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)).catch(err => console.log(err))

]).then(responses => {    
  console.log(responses); // [1, undefined, 3]
})  