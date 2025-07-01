import cookieParser from "cookie-parser";
import express from "express";
const bcrpty = require('bcrypt')

const app = express();
app.use(cookieParser());



app.get("/", (req, res) => {
  res.cookie("name", "naveen");
  res.send("Cookie has been set!");
});

app.get("/read", (req, res) => {
  const cookie = req.cookies.name;
  if (cookie) {
    return res.send(`Cookie value: ${cookie}`);
  }
  res.send("No cookie found!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
