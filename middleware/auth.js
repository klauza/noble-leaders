const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){

  // get token from the header
  const token = req.header('x-auth-token');

  // check if token doesn't exist
  if(!token){
    return res.status(401).json({ msg: "No token, authorization denied "});
  }

  try{
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();   // move on to next middleware
    
  } catch(err){
    return res.status(401).json({ msg: "Token is not valid"})
  }
}