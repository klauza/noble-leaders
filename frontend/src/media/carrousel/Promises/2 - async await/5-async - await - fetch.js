// ASYNC WITH FETCH

async function getUsers(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users');;

  // only proceed once that promise its resolved
  const data = await response.json();

  // only proceed once the second promise is resolved
  return data;
}

getUsers().then(users => console.log(users));