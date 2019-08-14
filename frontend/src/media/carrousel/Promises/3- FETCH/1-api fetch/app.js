document.querySelector('button').addEventListener('click', getExternal);

// Get from external API
function getExternal(){
  fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => {
      console.log('tutaj tez jest data: ', data);
      functionJson(data); // passing data to another function
    })
    
    .catch(err => console.log(err));
}

const functionJson = (data) => {
  console.log(data);  // we can use data here

  data.forEach(data => {
      if(data.id === 7){ console.log(data)}
    });
    
}