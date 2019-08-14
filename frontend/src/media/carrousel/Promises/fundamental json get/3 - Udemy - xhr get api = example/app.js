document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
  const number = document.querySelector('input[type=number]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function(){
    if(this.status === 200){    // 200 means that, the resource has been fetched and is transmitted in the message body
      const response = JSON.parse(this.responseText); // returns just JSON string, so we need to wrap it in JSON.parse function
      
      // Put response on the page
      let output = '';

      if(response.type === 'success'){
        response.value.forEach(function(joke){
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
      console.log(response);
    }
  }

  xhr.send();
  e.preventDefault();
}