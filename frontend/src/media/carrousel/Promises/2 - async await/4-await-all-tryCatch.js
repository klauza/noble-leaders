async function blueprint(){
  const promise = await new Promise.all([]); 
  console.log(promise);
}

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
  try{
    const image = await loadImageAsync(url);
    document.querySelector('body').appendChild(image);
  } catch(err){ // jesli bedzie blad w 'try', zostanie on obsluzony tutaj w catch
    console.log(Error(err));
  }                                      
}

loadImages();