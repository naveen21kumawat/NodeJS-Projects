const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

// View engine setup
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "public", "images", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },


  
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, buffer) => {
      if (err) return cb(err);
      const fn = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  let user = req.user;

  if (post.likes.indexOf(user.userId) === -1) {
    post.likes.push(user.userId);
  } else {
    post.likes.splice(post.likes.indexOf(user.userId), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/edit/:id", async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully");
});

app.post("/update/:id", async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  await post.save();
  res.redirect("/profile");
});

app.post("/create", async (req, res) => {
  let { name, username, email, age, password } = req.body;
  let existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(500).send("User Already Registered");

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send("Error generating salt");

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Error hashing password");

      const user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });

      const token = jwt.sign({ email: email, userId: user._id }, "shhhh");
      res.cookie("token", token);
      res.redirect("/login");
    });
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
      res.redirect("/profile");
    } else {
      res.status(500).send("Incorrect credentials");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// Middleware to check login
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  } catch (err) {
    res.redirect("/login");
  }
}

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
