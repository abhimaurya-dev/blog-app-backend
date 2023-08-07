const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to blog backend");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
