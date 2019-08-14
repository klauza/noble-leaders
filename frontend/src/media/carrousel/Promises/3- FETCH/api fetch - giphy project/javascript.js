
const GIF_URL = "https://api.giphy.com/v1/gifs/random?api_key=su09XsQJcwmDPIqwDqtSEauB8JG7mtBs&tag=funny&rating=pg-13&limit=30";

const pobierzgifa = async (giveImage, giveTitle) => {
  const response = await fetch(GIF_URL);
  console.log(response);

  const json = await response.json();
  console.log(json);

  const storeUrlImageFromFetch = json.data.image_original_url;
  console.log(storeUrlImageFromFetch); 

  //replacing the image with fetched one
  giveImage.src = storeUrlImageFromFetch;
  //replacing the title as well
  giveTitle.innerText = json.data.slug;
  
}


const image = document.getElementsByClassName('image')[0];
const title = document.getElementsByClassName('image-title')[0];
//console.log(title);

pobierzgifa(image, title);