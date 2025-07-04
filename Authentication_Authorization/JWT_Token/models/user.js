import { name } from "ejs";
import mongoose from "mongoose";
import Schema from "mongoose";

mongoose.connect("mongodb//127.0.0.1:27017/jwt_auth");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
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