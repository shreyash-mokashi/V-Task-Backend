const multer = require("multer");
//its middleware for handling form-data
//basicaly its use for file uploads 

const path = require("path");
//its node.js module for safely work eith file path

const storage = multer.diskStorage({
//define storage engine using disk storage

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  //set the folder for files will be saved

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  //sets the name of uploaded file

});

const upload = multer({ storage });
//initializes multer with the custom storage configuration

module.exports = upload;
//exports the upload object for used in route files