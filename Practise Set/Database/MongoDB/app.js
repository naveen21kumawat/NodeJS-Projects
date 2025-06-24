const express = require('express');
const app = express();
const userModel = require('./userModel');

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.get('/create',async (req,res)=>{
  let createduser = await userModel.create({
    name:'Naveen',
    username:'naveen121kumawat',
    email:'naveen21kumawat@gmail.com'
  })
  res.send(createduser);
})

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})