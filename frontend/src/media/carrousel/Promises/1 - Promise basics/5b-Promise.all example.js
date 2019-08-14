// chcemy pobrac informacje o uzytkownikach serwisu github


const names = ["apple", "microsoft"];
const requests = names.map(name => axios.get(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(data => data.map(user => user.data))
  .then(users => users.forEach(user => console.log(user.login)))
  .catch(alert);
