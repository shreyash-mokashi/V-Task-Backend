const mongoose = require("mongoose");
//import mongoose

const userSchema = new mongoose.Schema({
//define new schema for structure of user data

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
