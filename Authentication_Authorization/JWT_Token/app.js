const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
// const userModel = require("./models/user"); // Assuming you have a user model defined in models/user.js

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extenstion: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
