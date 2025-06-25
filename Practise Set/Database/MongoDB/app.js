const express = require("express");
const app = express();
const userModel = require("./userModel");

app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "Naveen",
    username: "naveen121kumawat",
    email: "naveen21kumawat@gmail.com",
  });
  res.send(createduser);
});
app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    { username: "naveen" },
    { username: "naveen21kumawat" }
  );
  res.send(updateduser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});
// app.get("/read", async (req, res) => {
//   let users = await userModel.find({ name: "Naveen" });
//   res.send(users);
// });
app.get("/delete", async (req, res) => {
  let deleteduser = await userModel.findOneAndDelete({
    name: "naveen21",
  });
  res.send(deleteduser);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
