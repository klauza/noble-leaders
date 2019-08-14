function fetchUser(id){
  // dane albo z localstorage albo z servera
  const user = localStorage.getItem(`user-${id}`);

  return user ? 
  Promise.resolve(user) // samo user by starczylo gdyby nie bylo servera, bo dane z serwera sa zwracane w Promise
  :
  User.find(user => {
    localStorage.setItem(`user-${id}`, user);
    return user;
  });

}

// dzieki Promise.resolve(user) mozemy uzyc .then()
fetchUser(id).then();


// ---------------------- //

/* jest rowniez reject */
Promise.reject('Error'); // ale bardzo zadko to sie wykorzystuje