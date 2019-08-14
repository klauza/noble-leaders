const movies = [ {id: 1, category_id: 1, title: "Alita: Battle Angel"} ];
const categories = [ { id: 1, name: "Sci-fi"} ];

// zadanie: zwrócic informacje o filmie

// szuka movie_id
function fetchMovie(id){
  return new Promise((resolve, reject) => {
    const movie = movies.find(movie => movie.id === id);
    movie ? resolve(movie) : reject(Error('No movie was found'));
  });
}

// uzupelnia info o kategorii
function populateCategory(movie){
  return new Promise((resolve, reject) => {
    const category = categories.find(category => category.id === movie.category_id);
    if(category){ // jesli kategoria zostanie odnaleziona, dodajemy nową właściwość do obiektu 'movie' i rozwiązujemy obietnice
      movie.category = category;
      resolve(movie);
    }
    reject(Error('no category was cound'));
  });
}

// mozemy teraz te funkcje połączyć, 
fetchMovie(1) // czyli pobieramy film o ID 1
  .then(movie => populateCategory(movie))
  .then(result => console.log(result)) // wyświetla wynik
  .catch(reason => console.log(reason));