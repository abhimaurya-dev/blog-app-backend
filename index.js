const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to blog backend");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) {
        return console.log({
          error: "Can't connect to backend server",
          message: err,
        });
      }
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log({
      error: "Can't Connect to mongodb",
      message: err.message,
    });
  });
