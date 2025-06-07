const mongoose = require("mongoose");
// import mongoose it is labrary for mongodb its helps interact with mongodb
require("dotenv").config();
//heare we load environment variables from .env file
const connectDB = async () => {
  //defines connectDB function to handle the connection
  try {
    await mongoose.connect(process.env.MONGO_URI);
    //it tries to connect the mongodb database using URI stored in MONGO_URI
    console.log("MongoDB connected");

  } catch (err) {
    console.error(err.message);
    process.exit(1);
    //connection is faild then show error msg and exit 
  }
};

module.exports = connectDB;
//exports the connectDB function then it use in other files