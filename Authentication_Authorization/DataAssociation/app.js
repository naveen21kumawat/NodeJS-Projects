const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hey");
});
app.get("/create",async (req, res) => {
  const user =await userModel.create({
    username: "JohnDoe",
    email: "nk@gmail.com",
    password: "password123",
    posts: [],
  });
  res.send("User created",user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
