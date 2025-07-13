const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile", isLoggedIn, (req, res) => {
  res.send("Login Successfull");
  console.log("User Data", req.user);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/create", async (req, res) => {
  let { name, username, email, age, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User Already Registred");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });
      const token = jwt.sign({ email: email, userId: user._id }, "shhhh");
      res.cookie("token", token);
    });
    res.redirect("/login");
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Password or email is incorrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email, userId: user._id }, "shhhh");
      res.cookie("token", token);
      // res.status(200).send("you can Login");
      res.redirect("/profile");
    } else res.status(500).send("Something went wrong");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  // res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token === "") {
    return res.status(401).send("You are not logged in");
  } else {
    let data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
