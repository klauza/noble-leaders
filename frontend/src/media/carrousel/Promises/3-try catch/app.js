const user = {email: 'jdoe@gmail.com'};

try {
  // Produce a ReferenceError
  // myFunction();

  // Produce a TypeError;
  // null.myFunction();

  // Produce a SyntaxError
  // eval('Hello world');

  // Will produce a URIError
  // decodeURIComponent('%');

  if(!user.name){
    // throw 'User has no name'; // outputs a string in console
    throw new SyntaxError('User has no name'); // can format as a certain type of error
  }

} catch(err){
  console.log('ERROR!! :-O');
  console.log(err); // ReferenceError: My function is not defined
  // console.log(err.message); // My function is not defined
  // console.log(err.name); // type of error (ReferenceError)

  // console.log(err instanceof ReferenceError); // true
  // console.log(err instanceof TypeError); // false


} finally{      // no matter what happends it will still run
  console.log('I run anyway');
}

// error was catched, so program continues
console.log('Program continues...')