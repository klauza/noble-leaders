const express = require('express');
const connectDB = require('./config/db');
var data = require('./api/db.json'); // your json file path
// import './api/gifs';
const app = express();
const path = require('path');

// connect to database
connectDB();

// middleware
app.use(express.json({ extended: false })); // body data can be accepted

// router endpoint
// app.get('/', (request, response) => response.send('<p>a</p>'));

app.use('/api/imgs', express.static('api/imgs'));
app.use('/api/gifs', express.static('api/gifs'));

app.get("/actor-game", function(req, res, next) {
  res.send(data);
});

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/allusers', require('./routes/allusers'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../frontend/build'));

  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
