const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  user = req.user;
  if (post.likes.indexOf(user.userId) === -1) {
    post.likes.push(user.userId);
  }else{
    post.likes.splice(post.likes.indexOf(user.userId), 1);
  }
  await post.save();
  res.redirect("/profile");
  // res.render('profile', {user})
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
app.get("/edit/:id", async(req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("edit", {post});
});


app.post("/upload", (req, res) => {
  console.log(req.file);
 
  res.send("File uploaded successfully");
});

app.post("/update/:id", async (req, res) => {
  let post = await postModel.findOneAndUpdate({ _id: req.params.id }, 
    { content: req.body.content },
    )
  // let id = req.params.id;
  // let { content } = req.body;
  // let post = await postModel.findOne({ _id: id });
  // post.content = content; 
  await post.save();
  res.redirect("/profile");
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
      res.status(200).redirect("/profile");
    } else res.status(500).send("Something went wrong");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token === "") {
    return res.redirect("/login");
  } else {
    let data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
