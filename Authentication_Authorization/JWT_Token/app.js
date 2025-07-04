const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./models/user"); // Assuming you have a user model defined in models/user.js
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extenstion: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, password, email, age } = req.body;
  
  bcrypt.genSalt(10, function(err ,salt){
    bcrypt.hash(password, salt, async function(err, hash) {
   const user = await userModel.create({
    username,
    password: hash,
    email,
    age
  });
  })
  console.log(req.body);
  
  });

  res.send("User created successfully", );
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
