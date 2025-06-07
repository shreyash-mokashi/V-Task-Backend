const mongoose = require("mongoose");
//import mongoose for define schema and model

const ProfileSchema = new mongoose.Schema({
//create new schema

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //reference the user this profile comes to
  //its foreign key to the user model
  
  name: { type: String },
  bio: { type: String },
  skills: [String],
  imageUrl: { type: String },
  social: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
