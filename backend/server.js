const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to database
connectDB();

// middleware
app.use(express.json({ extended: false })); // body data can be accepted

// router endpoint
// app.get('/', (request, response) => response.send('<p>a</p>'));

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
