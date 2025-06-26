const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userModel = require("./userModel");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    name: "Naveen",
    email: "naveen21kumawat@gmail.com",
  });
  res.send("User Created Successfully ", user);
});
app.get("/read", async (req, res) => {
  res.render("read");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
