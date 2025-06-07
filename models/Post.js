const mongoose = require("mongoose");
//imports mongoose for use to create and work with mongodb models

const PostSchema = new mongoose.Schema({
//define new postschema 
//it is structer for documents in posts collections

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //reference of who created post

  text: { type: String, required: true },
  //main content of field

  name: String,
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  //its array of object each object represent one like

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      name: String,
      date: { type: Date, default: Date.now },
    },
  ],
  //array of object of comment
  
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
