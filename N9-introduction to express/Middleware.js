const http = require("http")
const express = require('express');
const app = express();
const server =  http.createServer(app)
app.use("/",(req,res,next)=>{
  console.log("First")
  next();
})

app.use("/",(req,res,next)=>{
  console.log("Second")
  next();

})
app.use("/contact-us",(req,res,next)=>{
  res.write("<html>")
  res.write("<form action='submit-details' onsubmit='/submit-details'>")
  res.write("<input type='text' name='name' placeholder='Name'><br><br>")
  res.write("<input type='text' name='Email' placeholder='Email'><br><br>")
  res.write("<button type='button' value='submit'>Submit")
  res.write("</form>")

  res.write("</html>")
  res.end();
})
app.post('/submit-details',()=>{ 
  console.log("I am active")
  const body=[]
  req.on('data',(chunk)=>{
    body.push[chunk]
    console.log(chunk)
  })
})

const PORT = 3009;
server.listen(PORT ,()=>{
  console.log("Server is running on the 3009")
})