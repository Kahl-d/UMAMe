const fs = require('fs');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const httpError = require("./models/http_error");

const signupRoute = require("./routes/route_signup");
const loginRoute = require("./routes/route_login");
const homeRoute = require("./routes/route_home");
const searchRoute = require("./routes/route_search");
const postRoute = require("./routes/route_post");
const collectionRoute = require("./routes/route_collection");
const heartRoute = require("./routes/route_heart");

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/home", homeRoute);

app.use("/login", loginRoute);

app.use("/signup", signupRoute);

app.use("/search", searchRoute);

app.use("/post", postRoute);

app.use("/collection", collectionRoute);

app.use("/heart", heartRoute);

app.use((req, res, next) => {
  const error = new httpError("Could not find route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message });
});

mongoose
  .connect(
    "mongodb+srv://datvo:9LUWLoW4JXZDvQjL@cluster0.fo8nxuj.mongodb.net/umame?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(5000, () => console.log("connected to db, app running on 5000"))
  )
  .catch((err) => {
    console.log(err);
  });

module.exports = app;