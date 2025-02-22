const http = require("http")
const express = require('express');
const app = express();
const server =  http.createServer(app)

app.use((req,res,next)=>{
  console.log("First Dummy middleware",req.url)
  next();
})
app.use((req,res,next)=>{
  console.log("Second Dummy middleware",req.url)
  next();
})
// app.use((req,res,next)=>{
//   console.log("Third Dummy middleware",req.url)
//   res.send("<h1>Welcome to Node JS</h1>")
//   next();
// })
app.get("/",(req,res,next)=>{
  console.log("Handling / for GET",req.url,res.method)
  res.send("<h1>Welcome to Node JS</h1>")
  next();
})
app.get("/contact-us",(req,res,next)=>{
  console.log("Please Give Your Details",req.url,res.method)
  res.send(
      `<h1>Please  Give Your Details</h1>
      <form action="/contact-us" method="post">
      <input type="text" name="name" placeholder"Enter Name" /><br><br>
      <input type="text" name="Email" placeholder"Enter Email" /><br><br>
      <input type="submit"></input>
      
      </form>
      
      `
  )
})
app.post("/contact-us",(req ,res ,next)=>{
  console.log("Data Send Seccess");
  const body = [];
  res.send('<h1>I will Handle this</h1>')
  req.on('data',(chunk)=>{
    console.log(chunk)
    body.push(chunk)
  })
  req.on('end',()=>{
    const parseBody = Buffer.concat(body).toString();
    const param = new URLSearchParams(parseBody) 
    const ob = Object.fromEntries(param)
    console.log(ob)
    // res.send(param)
  })
  res.end();
})

const PORT = 3009;
server.listen(PORT ,()=>{
  console.log("Server is running on the 3009")
})