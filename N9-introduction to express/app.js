const http = require('http');
const express= require('express');
// const calculateFile = require('./requestHandler') ;
const app = express();
app.use((req ,res , next)=>{
  console.log("came in the first middleware", req.url ,req.method);
  // res.json({A:3,B:3})
  next();
});
app.use((req ,res , next)=>{
  console.log("came in the second middleware", req.url ,req.method);
});

const server = http.createServer(app)
const PORT = 3001
server.listen(PORT, ()=>{
  console.log('Server is running on port http://localhost:/3001')
})

// const http = require("http");
// const calRe = require("./requestHandler");
// const server = http.createServer(calRe);
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });