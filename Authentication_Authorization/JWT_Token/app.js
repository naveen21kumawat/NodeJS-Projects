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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const createdUser = await userModel.create({
        username,
        password: hash,
        email,
        age,
      });
      const token = jwt.sign({ email }, "secretyutuytuKey");
      res.cookie("token", token);

      res.send(createdUser);
    });
  });
});

app.get("/login", async (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result){
      console.log("Yes You Can Login");
      const token = jwt.sign({ email: user.email},"secretyutuytuKey");
      res.cookie("token", token);
      return res.status(200).send("Login successful");
    }
    else {
      return res.status(400).send("Invalid password");
    }

    console.log("Yes You Can Login");
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
