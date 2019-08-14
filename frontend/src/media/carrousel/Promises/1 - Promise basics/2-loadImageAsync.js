// jak obrazek bedzie dostepny, dodajemy go na strone 
function loadImageAsync(url){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', event => resolve(img));
    img.addEventListener('erorr', reason => reject(new Error('error')));

    img.src = url;
  })
}

loadImageAsync("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg")
  .then(img => document.querySelector('body').appendChild(img))
  .catch(reason => console.log(reason));