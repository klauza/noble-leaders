// async await is a way to handle responses
// it's not a different way to write them

const posts = [
  { title: 'Post One', body: 'This is post one'},
  { title: 'Post Two', body: 'This is post two'}
];

function getPosts(){

  setTimeout(() => {
    let output = '';

    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);

}

function createPost(post) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      posts.push(post);
  
      const error = false;
      
      if(!error){
        resolve();
      } else {
        reject('Error');
      }
    }, 2000);

  });

};


// handle the promise with async / await

async function init(){
  await createPost({ title: 'Post Three', body: 'This is post'});

  // we are waiting until createPost will be done, and then we move on to getPosts()
  getPosts();  

}

init();