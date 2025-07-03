const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const userModel = require("./userModel");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let {name , email ,image} = req.body;
  const createdUser = await userModel.create({
    name,
    email,
    image
  })
  res.redirect("/read");
});
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", {users});
});

//okkk

app.get('/delete/:id',async(req,res)=>{
   let users = await userModel.findOneAndDelete({_id: req.params.id});
   console.log("USER DELETED", users);
   
   res.redirect("/read");
  }
)
app.get('/edit/:id',async(req,res)=>{
   let user = await userModel.findOne({_id: req.params.id});
   res.render("edit", {user});
  }
)
app.post('/update/:userid',async(req,res)=>{
  let { name, email, image } = req.body;
   let user = await userModel.findOneAndUpdate({_id: req.params.userid},{image , name, email},{new: true});
   console.log("USER UPDATED", name, email);
   res.redirect("/read");
  }
)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
