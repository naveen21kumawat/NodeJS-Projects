const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testapp1')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image : String
})
module.exports = mongoose.model('User',userSchema);