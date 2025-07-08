const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/DataAssociation').then(() => {
  console.log("Connected to MongoDB");
}
).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


const userSchema = new mongoose.Schema({

  username: String,
  email: String,
  password: String,
  posts :[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
})

module.exports = mongoose.model('user', userSchema);