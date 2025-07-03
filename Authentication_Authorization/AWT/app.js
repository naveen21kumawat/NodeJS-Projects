const express = require("express");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "naveen21@gmaail.com" }, "secret");
  console.log("Token:", token);
  res.cookie("Token" + token);
  res.send("Token has been set!");
});


  app.get("/read",(req,res)=>{
    console.log(req.cookies.Token);

  })

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
