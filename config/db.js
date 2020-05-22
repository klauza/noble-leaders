const mongoose = require('mongoose');
const config = require('config'); // for global access
const db = config.get('mongoURI');  



const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, 
    // reconnectTries : Number.MAX_VALUE,
    // autoReconnect : true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
}

module.exports = connectDB;