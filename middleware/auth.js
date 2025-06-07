const jwt = require("jsonwebtoken");
//imports jsonwebtoken package it used for verify jwt

module.exports = function (req, res, next) {
//exports middleware function

  const token = req.header("Authorization")?.replace("Bearer ", "");
  //it read token from authorization header

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //if token not provide then return unauthorized error

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //verifies token using secret key
    //its valid then decoded

    req.user = decoded;
    //adds decoded user data to request object
    //this allows routes or middleware to access the logged users info from req.user

    next();
    //call next middleware or rout handler
    
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
  //token is invalide or expire then 401 responce is sent
};
