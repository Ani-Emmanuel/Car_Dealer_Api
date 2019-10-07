const express = require("express");
const user = require("./routes/users");
const car = require("./routes/cars");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

//middleware
app.use(bodyparser.json());
mongoose.connect("mongodb://localhost:27017/carproject");

//routes
app.use("/users", user);
app.use("/cars", car);
//catch 404 error and forward the to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.statusCode = 400;
  next(err);
});

// Error handler fouction
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });
});
//server

const port = app.get("port") || 3000;
app.listen(port, () => console.log("connected successfully"));
