const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const db = require("./backend/Configuration/db");
const chalk = require("chalk");

app.use("/", express.static(path.join(__dirname, "/client/build")));
//Handle CORS
app.use(cors());

// To parse json data
app.use(express.json());

//Log Requests with Morgan Middleware
app.use(morgan("common"));

///Import Routes
const postRoutes = require("./backend/Routes/postRoutes.js");
const contactRoutes = require("./backend/Routes/contactRoutes.js");
const userRoutes = require("./backend/Routes/userRoutes.js");

//Use Imported Routes as Middlewares
app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

//Testing Endpoint
app.post("/api/test", (req, res) => {
  const body = req.body;
  res.json(body);
});

//API Home Endpoint
app.get("/api", (req, res) => {
  res.send("API Home");
});

//Handle bad endpoint requests
//For POST
app.post("*", (req, res) => {
  const url = req.params[0];
  console.log(
    `There was a POST request to  "${url}" which is an invalid endpoint.`
  );
  res.send(`404! "${url}" This is NOT the endpoint you were looking for!`);
});
//For GET
app.get("*", (req, res) => {
  const url = req.params[0];
  console.log(
    `There was a GET request to  "${url}" which is an invalid endpoint.`
  );
  res.send(`404! "${url}" This is NOT the endpoint you were looking for!`);
});

//Connect To Database
db();

//Begin Server Listening
app.listen(port, () => {
  console.log(
    chalk.underline.black.bgWhite(
      `Server Listening at http://localhost:${port}`
    )
  );
});
