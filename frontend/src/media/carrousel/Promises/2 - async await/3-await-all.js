// blueprint
async function blueprint(){
  const promise = await new Promise.all([]); 
  console.log(promise);
}

// praktyczny przyklad

function loadImageAsync(url){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', event => resolve(img));
    img.addEventListener('erorr', reason => reject(new Error('error')));

    img.src = url;
  });
}
const url = 'http://thecatapi.com/api/images/get?format=src&type=jpg&size=small';

async function loadImages() {
  const image = await loadImageAsync(url).catch(err => console.log(err));  // czyli tutaj do 'image' zostanie przypisany od razu obrazek
                                            // dodajemy funkcje catch w ramach obslugi bledu
  // tutaj sprawdzamy czy obrazek istnieje
  if(image){
    document.querySelector('body').appendChild(image);
  }
                                          
}

loadImages();