const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  //route for register new user

  const { name, email, password } = req.body;
  //take user input from request body

  const existingUser = await User.findOne({ email });
  //check user already exists in the database

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  //hashes the password for security using bcrypt

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  //create and save new user in database

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //generate a iwt token 

  res.json({ token });
  //return the token as response

});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //take login credentials from the request body

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  //check user with provided email exists

  const isMatch = await bcrypt.compare(password, user.password);
  //hear we use bcrypt.compare from bcrypt laibrary for comapre or check plain text passwoard and hased password

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  //verifie password

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //generate jwt token after login success

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});
//return token and basic user details 

module.exports = router;
