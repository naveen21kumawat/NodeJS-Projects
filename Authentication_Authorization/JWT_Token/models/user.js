const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth").then(() => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
 name : String,
  password: String,
  email : String,
  age: Number,
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user',
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});
module.exports = mongoose.model("user", userSchema);
