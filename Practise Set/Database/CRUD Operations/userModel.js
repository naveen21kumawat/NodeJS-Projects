const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/userData')
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema(
  {
    name:String,
    email:String
  }
);

module.exports = mongoose.model('Data',userSchema);