const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniproject").then(() => {
  console.log("Database Connected");
});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  profileImage: {
    type: String,
    default: "defaultimage.jpg",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
