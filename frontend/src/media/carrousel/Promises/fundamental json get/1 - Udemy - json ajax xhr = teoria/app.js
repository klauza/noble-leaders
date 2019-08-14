document.getElementById('button').addEventListener('click', loadData);

function loadData(){

  const xhr = new XMLHttpRequest();       // Create an XHR Object

  // OPEN
  xhr.open('GET', 'https://api.github.com/users/1', true);      // true, because asynchronous

  console.log('READYSTATE', xhr.readyState); // readystate 1

  // Optional - Used for spinners/loaders
  xhr.onprogress = function(){
    console.log('READYSTATE spinner', xhr.readyState);
  }
  // newer way
  // xhr.onload = function(){
  //   if(this.status === 200){ // this-refers to xhr object
  //     console.log(this.responseText);
  //   }
  // }

  // old way, not being used now
  xhr.onreadystatechange = function(){
    // console.log('READYSTATE', xhr.readyState); // readystate 2 potem 3 potem 4
    if(this.status === 200 && this.readyState === 4){
      console.log(JSON.parse((this.responseText)) );
      response = JSON.parse((this.responseText)); // have to parse from plain text into object
      document.getElementById('output').innerHTML = `<h1>${response.avatar_url}</h1>`;
    }
  }

  xhr.onerror = function(){
    console.log('request error...');
  }

  xhr.send();

}
  //ready State Values
  // 0 : request not initialized
  // 1 : server connection established
  // 2 : request received
  // 3 : processing request
  // 4 : request finished and response is ready

  // http status
  // 200 OK
  // 403 Forbidden
  // 404 Not found

