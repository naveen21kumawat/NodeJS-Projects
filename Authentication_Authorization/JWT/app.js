const express = require("express");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "naveen21@gmaail.com" }, "secret");
  console.log("token:", token);
  res.cookie("mytoken" , token);
  res.send("Token has been set!",);
});


  app.get("/read",(req,res)=>{
  //  jwt.verify(req.cookies.mytoken,"secret", (err, decoded) => {
  //   console.log("Decoded:", decoded);
  // })
 let data = jwt.verify(req.cookies.mytoken, "secret");
 res.send(`Decoded Data: ${JSON.stringify(data)}.`);
 console.log(data)
  })

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
