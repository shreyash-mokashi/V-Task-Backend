const User = require("../models/User");
//import the user model from models directory

module.exports = async function (req, res, next) {
//exports async middleware function
//this function used in routes for check requesting user is admin  

  try {
    const user = await User.findById(req.user.id);
    //find the user from database using id store in req.user

    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: "Admin access denied" });
    }
    //check user is present as user or admin

    next();
    //if user is admin then request is proceeds
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  //catch any error in proccess then send internal server error
};
