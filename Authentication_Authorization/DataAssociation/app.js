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
    username: "Naveen",
    email: "nk@gmail.com",
    password: "password123",
    posts: [],
  });
  res.send({user});
});
app.get("/post/create",async (req, res) => {
  let post = await postModel.create({
  postdata : "Hey Kaise Ho",
  user: "686d57ebea3024e1905da927"

  })
  let user = await userModel.findOne({_id : "686d57ebea3024e1905da927"});
  user.posts.push(post._id)
  await user.save();

  res.send({post ,user});
});

app.get("user/fetch",(req,res)=>{
  userModel.find().then((users)=>{
    res.send(users);
    })
    
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
