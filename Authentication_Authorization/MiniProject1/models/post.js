const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniproject").then(() => {
  console.log("Database Connected");
});

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
