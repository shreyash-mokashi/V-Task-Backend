const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
//loads environment variables with dotenv
//enable cross-origin requests using cors
//connect to mongodb using connectDB function
dotenv.config();

const app = express();
connectDB();

app.use(cors());
//enable requests from other origins
app.use(express.json());
//parses incoming JSON requests
app.use("/api/auth", require("./routes/auth"));
//register and login
app.use("/api/profile", require("./routes/profile"));
//profile CRUD
app.use("/api/posts", require("./routes/post"));
//post CRUD
app.use("/api/admin", require("./routes/admin"));
//Admin endpoints
app.use("/uploads", express.static("uploads"));
//upload images
app.use("/api/upload", require("./routes/upload"));
//provide uploaded files statically
//each route file handle a specific part of the app and is mounted with a base url 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//runs server on the port defined in .env or default to 5000